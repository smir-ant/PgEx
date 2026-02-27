const KW = new Set(['SELECT','FROM','WHERE','JOIN','INNER','LEFT','RIGHT','FULL','OUTER','CROSS','ON','AND','OR','NOT','IN','LIKE','ILIKE','BETWEEN','IS','NULL','AS','ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','UNION','INTERSECT','EXCEPT','ALL','DISTINCT','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','ALTER','DROP','PRIMARY','KEY','FOREIGN','REFERENCES','INDEX','UNIQUE','CHECK','DEFAULT','CASCADE','CONSTRAINT','VIEW','WITH','CASE','WHEN','THEN','ELSE','END','CAST','EXISTS','ANY','SOME','SERIAL','BIGSERIAL','INTEGER','BIGINT','SMALLINT','DECIMAL','NUMERIC','REAL','DOUBLE','PRECISION','VARCHAR','CHAR','TEXT','BOOLEAN','DATE','TIME','TIMESTAMP','INTERVAL','ARRAY','JSON','JSONB','UUID','BYTEA','RETURNING','CONFLICT','DO','NOTHING','WINDOW','OVER','PARTITION','ROWS','RANGE','UNBOUNDED','PRECEDING','FOLLOWING','CURRENT','ROW','ASC','DESC','TRUE','FALSE','BEGIN','COMMIT','ROLLBACK','TABLE','IF']);

const FN = new Set(['COUNT','SUM','AVG','MAX','MIN','COALESCE','NULLIF','GREATEST','LEAST','UPPER','LOWER','SUBSTRING','CONCAT','LENGTH','TRIM','LTRIM','RTRIM','NOW','CURRENT_TIMESTAMP','CURRENT_DATE','CURRENT_TIME','DATE_TRUNC','EXTRACT','AGE','TO_CHAR','TO_DATE','TO_TIMESTAMP','ARRAY_AGG','STRING_AGG','ROW_NUMBER','RANK','DENSE_RANK','LAG','LEAD','FIRST_VALUE','LAST_VALUE','ABS','CEIL','FLOOR','ROUND','RANDOM','GENERATE_SERIES']);

const RE = /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:[^']|'')*'|\b\w+\b|\d+\.?\d*|[^\w\s]|\s+)/g;

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

export function highlightSQL(text) {
	if (!text) return '';
	const tokens = text.match(RE);
	if (!tokens) return esc(text);
	let out = '';
	for (const t of tokens) {
		const e = esc(t);
		if (/^(--|\/\*)/.test(t))       out += `<span class="tk-cmt">${e}</span>`;
		else if (/^'/.test(t))          out += `<span class="tk-str">${e}</span>`;
		else if (/^\d/.test(t))         out += `<span class="tk-num">${e}</span>`;
		else if (FN.has(t.toUpperCase())) out += `<span class="tk-fn">${e}</span>`;
		else if (KW.has(t.toUpperCase())) out += `<span class="tk-kw">${e}</span>`;
		else                             out += e;
	}
	return out;
}
