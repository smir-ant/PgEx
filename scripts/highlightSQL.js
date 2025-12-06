// Simple syntax highlighting sync
const sqlInput = document.getElementById('sqlInput');
const colored = document.getElementById('colored');

// Core highlighting logic - returns HTML string
function highlightSQL(text) {
    if (!text) return '';

    // Step 1: Find all SELECT column list zones (before escaping HTML)
    const selectZones = [];
    let i = 0;

    while (i < text.length) {
        // Skip strings
        if (text[i] === "'") {
            i++;
            while (i < text.length) {
                if (text[i] === "'") {
                    if (i + 1 < text.length && text[i + 1] === "'") {
                        i += 2; // skip escaped quote
                        continue;
                    }
                    i++; // end of string
                    break;
                }
                i++;
            }
            continue;
        }
        // Skip double-quoted identifiers
        if (text[i] === '"') {
            i++;
            while (i < text.length) {
                if (text[i] === '"') {
                    if (i + 1 < text.length && text[i + 1] === '"') {
                        i += 2; // skip escaped quote
                        continue;
                    }
                    i++; // end of identifier
                    break;
                }
                i++;
            }
            continue;
        }
        // Skip single-line comments
        if (text.startsWith('--', i)) {
            i += 2;
            while (i < text.length && text[i] !== '\n') i++;
            continue;
        }
        // Skip multi-line comments
        if (text.startsWith('/*', i)) {
            i += 2;
            while (i < text.length && !text.startsWith('*/', i)) i++;
            i += 2;
            continue;
        }

        const selectMatch = text.substring(i).match(/^SELECT\b/i);
        if (selectMatch) {
            const selectStart = i + selectMatch[0].length;

            // Find end of column list
            let depth = 0;
            let j = selectStart;

            while (j < text.length) {
                const char = text[j];

                // Skip strings/comments inside the zone search too!
                // ... actually, simpler to just scan char by char but respect quotes/comments
                // But for now, let's keep it simple. If we are inside a string/comment, we shouldn't count parens or match keywords.

                if (text[j] === "'") {
                    j++;
                    while (j < text.length) {
                        if (text[j] === "'" && text[j + 1] === "'") j += 2;
                        else if (text[j] === "'") { j++; break; }
                        else j++;
                    }
                    continue;
                }
                if (text[j] === '"') {
                    j++;
                    while (j < text.length) {
                        if (text[j] === '"' && text[j + 1] === '"') j += 2;
                        else if (text[j] === '"') { j++; break; }
                        else j++;
                    }
                    continue;
                }
                if (text.startsWith('--', j)) {
                    j += 2;
                    while (j < text.length && text[j] !== '\n') j++;
                    continue;
                }
                if (text.startsWith('/*', j)) {
                    j += 2;
                    while (j < text.length && !text.startsWith('*/', j)) j++;
                    j += 2;
                    continue;
                }

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
    // We need to escape carefully to not break the tokenization logic if we were to tokenize first.
    // But here we tokenize the raw text and then escape the tokens content.
    // Actually, the original logic escaped the whole text first? 
    // Wait, the original logic did: text = text.replace... AND THEN tokenized.
    // But tokenizing escaped text is tricky if entities look like other things.
    // Let's stick to the original flow: Escape -> Tokenize (but careful with entities).
    // Original: text = text.replace(/&/g, "&amp;")...
    // But wait, if I have "a < b", it becomes "a &lt; b". Tokenizer sees "&lt;" as maybe operator or identifier?
    // The original regex was: /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:[^']|'')*'|\b\w+\b|\d+\.?\d*|[^\w\s]|\s+)/g
    // [^\w\s] matches & and ; so &lt; would be tokens "&", "lt", ";"
    // This breaks keywords if they were escaped? No, keywords are words.
    // But < is an operator. &lt; is not.
    // Let's refine: Tokenize RAW text, then escape content when wrapping.

    // All PostgreSQL keywords
    const keywordList = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'ILIKE', 'BETWEEN', 'IS', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'DISTINCT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'INDEX', 'UNIQUE', 'CHECK', 'DEFAULT', 'CASCADE', 'CONSTRAINT', 'VIEW', 'WITH', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'CAST', 'EXISTS', 'ANY', 'SOME', 'SERIAL', 'BIGSERIAL', 'INTEGER', 'BIGINT', 'SMALLINT', 'DECIMAL', 'NUMERIC', 'REAL', 'DOUBLE', 'PRECISION', 'VARCHAR', 'CHAR', 'TEXT', 'BOOLEAN', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'ARRAY', 'JSON', 'JSONB', 'UUID', 'BYTEA', 'RETURNING', 'CONFLICT', 'DO', 'NOTHING', 'EXCLUDED', 'WINDOW', 'OVER', 'PARTITION', 'ROWS', 'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'GRANT', 'REVOKE', 'ROLE', 'USER', 'POLICY', 'SECURITY', 'DEFINER', 'INVOKER', 'VOLATILE', 'STABLE', 'IMMUTABLE', 'STRICT', 'LEAKPROOF', 'PARALLEL', 'SAFE', 'RESTRICTED', 'UNSAFE'];

    // Keywords that should be highlighted even in SELECT clause
    const selectClauseKeywords = ['AS', 'DISTINCT', 'ALL'];

    // Common PostgreSQL functions
    const functions = ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'COALESCE', 'NULLIF', 'GREATEST', 'LEAST', 'UPPER', 'LOWER', 'SUBSTRING', 'CONCAT', 'LENGTH', 'TRIM', 'LTRIM', 'RTRIM', 'NOW', 'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME', 'DATE_TRUNC', 'EXTRACT', 'AGE', 'TO_CHAR', 'TO_DATE', 'TO_TIMESTAMP', 'ARRAY_AGG', 'STRING_AGG', 'JSONB_AGG', 'JSONB_OBJECT_AGG', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'ABS', 'CEIL', 'FLOOR', 'ROUND', 'RANDOM', 'GENERATE_SERIES'];

    let result = '';
    let pos = 0;

    // Tokenize raw text
    const tokens = text.match(/(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:[^']|'')*'|\b\w+\b|\d+\.?\d*|[^\w\s]|\s+)/g) || [];

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    tokens.forEach(token => {
        const isComment = /^(--|\/\*)/.test(token);
        const isString = /^'/.test(token);
        const isNumber = /^\d+\.?\d*$/.test(token);
        const isKeyword = keywordList.some(kw => kw.toUpperCase() === token.toUpperCase());
        const isSelectKeyword = selectClauseKeywords.some(kw => kw.toUpperCase() === token.toUpperCase());
        const isFunction = functions.some(fn => fn.toUpperCase() === token.toUpperCase());
        const inSelectZone = isInSelectZone(pos);

        const escapedToken = escapeHtml(token);

        if (isComment) {
            result += `<span class="token comment">${escapedToken}</span>`;
        } else if (isString) {
            result += `<span class="token string">${escapedToken}</span>`;
        } else if (isNumber) {
            result += `<span class="token number">${escapedToken}</span>`;
        } else if (isFunction) {
            result += `<span class="token function">${escapedToken}</span>`;
        } else if (isKeyword && (!inSelectZone || isSelectKeyword)) {
            result += `<span class="token keyword">${escapedToken}</span>`;
        } else {
            result += escapedToken;
        }

        pos += token.length;
    });

    return result;
}

function syncHighlight() {
    if (!sqlInput || !colored) return;

    let text = sqlInput.value;

    // Ensure final newline is handled for scrolling
    if (text[text.length - 1] === "\n") {
        text += " ";
    }

    colored.innerHTML = highlightSQL(text);

    // Sync scroll
    colored.scrollTop = sqlInput.scrollTop;
    colored.scrollLeft = sqlInput.scrollLeft;
}

// Apply highlighting to static code blocks (Theory sections)
function highlightStaticBlocks() {
    const codeBlocks = document.querySelectorAll('.code-example code');
    codeBlocks.forEach(block => {
        // Get raw text, trim only if needed, but usually we want to preserve format
        // But innerText might miss newlines in some browsers if styling is weird, but usually ok for <pre><code>
        const text = block.textContent;
        block.innerHTML = highlightSQL(text);
        // Ensure class matches for styling
        block.className = 'language-sql';
    });
}

if (sqlInput) {
    sqlInput.addEventListener('input', syncHighlight);
    sqlInput.addEventListener('scroll', () => {
        if (colored) {
            colored.scrollTop = sqlInput.scrollTop;
            colored.scrollLeft = sqlInput.scrollLeft;
        }
    });

    // Editor features: Tab and Ctrl+/
    sqlInput.addEventListener('keydown', (e) => {
        // Helper to insert text using execCommand for Undo/Redo support
        const insertText = (text) => {
            document.execCommand('insertText', false, text);
        };

        // Tab handling
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            const start = sqlInput.selectionStart;
            insertText('    ');
            sqlInput.setSelectionRange(start + 4, start + 4);
        }

        // Ctrl+/ (Comment toggle)
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();

            const start = sqlInput.selectionStart;
            const end = sqlInput.selectionEnd;
            const value = sqlInput.value;

            // Find start of line for selection start
            const startLineIndex = value.lastIndexOf('\n', start - 1) + 1;
            // Find end of line for selection end
            const endLineIndex = value.indexOf('\n', end) !== -1 ? end + value.substring(end).indexOf('\n') : value.length;

            const selectedText = value.substring(startLineIndex, endLineIndex);
            const lines = selectedText.split('\n');

            const allCommented = lines.every(line => line.trim().startsWith('--'));

            let newText = '';
            let offset = 0;

            if (allCommented) {
                // Uncomment
                newText = lines.map(line => line.replace(/^--\s?/, '')).join('\n');
                offset = -3;
            } else {
                // Comment
                newText = lines.map(line => `-- ${line}`).join('\n');
                offset = 3;
            }

            const linesCount = lines.length;

            // Select the full lines to replace them
            sqlInput.setSelectionRange(startLineIndex, endLineIndex);
            insertText(newText);

            // Restore selection
            // We adjust the start and end positions based on the added/removed characters
            // If we added comments, start shifts by +3, end shifts by +3 * number of lines
            // However, if the cursor was at the very start of the line (before --), it should stay there?
            // The reference implementation logic:
            // const f=e+d; // new selection start
            // const p=t+d*g; // new selection end
            // This assumes the cursor moves WITH the text.

            // Special case: if selection was just a caret (start == end), we want to keep it that way relative to text
            // But if we are at column 0, and we add '-- ', we want to be at column 3? Or stay at 0?
            // Reference implementation moves it. Let's stick to reference.

            // Correction: if we uncomment, we might be removing less than 3 chars if it was just "--" without space.
            // But for simplicity, let's assume standard toggle.

            const newStart = start + offset;
            const newEnd = end + (offset * linesCount);

            sqlInput.setSelectionRange(newStart, newEnd);

            // Trigger highlight update immediately
            syncHighlight();
        }
    });

    // Initial sync
    syncHighlight();
}

// Run static highlighting on load
document.addEventListener('DOMContentLoaded', highlightStaticBlocks);

// Export for external use if needed
window.syncHighlight = syncHighlight;
window.highlightSQL = highlightSQL;

