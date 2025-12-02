// Simple syntax highlighting sync
const sqlInput = document.getElementById('sqlInput');
const colored = document.getElementById('colored');

function syncHighlight() {
    if (!sqlInput || !colored) return;

    let text = sqlInput.value;

    // Ensure final newline is handled for scrolling
    if (text[text.length - 1] === "\n") {
        text += " ";
    }

    // Custom PostgreSQL syntax highlighter
    // Step 1: Find all SELECT column list zones (before escaping HTML)
    const selectZones = [];
    let i = 0;

    while (i < text.length) {
        const selectMatch = text.substring(i).match(/^SELECT\b/i);
        if (selectMatch) {
            const selectStart = i + selectMatch[0].length;

            // Find end of column list
            let depth = 0;
            let j = selectStart;

            while (j < text.length) {
                const char = text[j];
                if (char === '(') depth++;
                else if (char === ')') depth--;
                else if (depth === 0) {
                    // Check for clause terminators
                    const rest = text.substring(j);
                    if (/^\s*(FROM|WHERE|JOIN|ORDER|GROUP|HAVING|LIMIT|UNION|INTERSECT|EXCEPT|;|\))/i.test(rest)) {
                        break;
                    }
                }
                j++;
            }

            selectZones.push([selectStart, j]);
            i = j;
        } else {
            i++;
        }
    }

    // Helper: check if position is in SELECT zone
    function isInSelectZone(pos) {
        return selectZones.some(([start, end]) => pos >= start && pos < end);
    }

    // Step 2: Escape HTML
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Step 3: Apply highlighting in order

    // All PostgreSQL keywords
    const keywordList = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'ILIKE', 'BETWEEN', 'IS', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'DISTINCT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'INDEX', 'UNIQUE', 'CHECK', 'DEFAULT', 'CASCADE', 'CONSTRAINT', 'VIEW', 'WITH', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'CAST', 'EXISTS', 'ANY', 'SOME', 'SERIAL', 'BIGSERIAL', 'INTEGER', 'BIGINT', 'SMALLINT', 'DECIMAL', 'NUMERIC', 'REAL', 'DOUBLE', 'PRECISION', 'VARCHAR', 'CHAR', 'TEXT', 'BOOLEAN', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'ARRAY', 'JSON', 'JSONB', 'UUID', 'BYTEA', 'RETURNING', 'CONFLICT', 'DO', 'NOTHING', 'EXCLUDED', 'WINDOW', 'OVER', 'PARTITION', 'ROWS', 'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'GRANT', 'REVOKE', 'ROLE', 'USER', 'POLICY', 'SECURITY', 'DEFINER', 'INVOKER', 'VOLATILE', 'STABLE', 'IMMUTABLE', 'STRICT', 'LEAKPROOF', 'PARALLEL', 'SAFE', 'RESTRICTED', 'UNSAFE'];

    // Keywords that should be highlighted even in SELECT clause
    const selectClauseKeywords = ['AS', 'DISTINCT', 'ALL'];

    // Common PostgreSQL functions
    const functions = ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'COALESCE', 'NULLIF', 'GREATEST', 'LEAST', 'UPPER', 'LOWER', 'SUBSTRING', 'CONCAT', 'LENGTH', 'TRIM', 'LTRIM', 'RTRIM', 'NOW', 'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME', 'DATE_TRUNC', 'EXTRACT', 'AGE', 'TO_CHAR', 'TO_DATE', 'TO_TIMESTAMP', 'ARRAY_AGG', 'STRING_AGG', 'JSONB_AGG', 'JSONB_OBJECT_AGG', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'ABS', 'CEIL', 'FLOOR', 'ROUND', 'RANDOM', 'GENERATE_SERIES'];

    let result = '';
    let pos = 0;

    // Tokenize and highlight
    const tokens = text.match(/(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:[^']|'')*'|\b\w+\b|\d+\.?\d*|[^\w\s]|\s+)/g) || [];

    tokens.forEach(token => {
        const isComment = /^(--|\/\*)/.test(token);
        const isString = /^'/.test(token);
        const isNumber = /^\d+\.?\d*$/.test(token);
        const isKeyword = keywordList.some(kw => kw.toUpperCase() === token.toUpperCase());
        const isSelectKeyword = selectClauseKeywords.some(kw => kw.toUpperCase() === token.toUpperCase());
        const isFunction = functions.some(fn => fn.toUpperCase() === token.toUpperCase());
        const inSelectZone = isInSelectZone(pos);

        if (isComment) {
            result += `<span class="token comment">${token}</span>`;
        } else if (isString) {
            result += `<span class="token string">${token}</span>`;
        } else if (isNumber) {
            result += `<span class="token number">${token}</span>`;
        } else if (isFunction) {
            result += `<span class="token function">${token}</span>`;
        } else if (isKeyword && (!inSelectZone || isSelectKeyword)) {
            result += `<span class="token keyword">${token}</span>`;
        } else {
            result += token;
        }

        pos += token.length;
    });

    colored.innerHTML = result;

    // Sync scroll
    colored.scrollTop = sqlInput.scrollTop;
    colored.scrollLeft = sqlInput.scrollLeft;
}

if (sqlInput) {
    sqlInput.addEventListener('input', syncHighlight);
    sqlInput.addEventListener('scroll', () => {
        if (colored) {
            colored.scrollTop = sqlInput.scrollTop;
            colored.scrollLeft = sqlInput.scrollLeft;
        }
    });
    // Initial sync
    syncHighlight();
}

// Export for external use if needed
window.syncHighlight = syncHighlight;
