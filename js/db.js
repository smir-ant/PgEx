let PGlite = null;
let db = null;

async function load() {
	if (!PGlite) {
		const mod = await import('@electric-sql/pglite');
		PGlite = mod.PGlite;
	}
}

export async function init(tables) {
	await load();
	if (db) { try { await db.close(); } catch {} }
	db = new PGlite();
	for (const t of tables) {
		await db.query(t.ddl);
		if (t.dml) await db.query(t.dml);
	}
}

export async function query(sql) {
	if (!db) throw new Error('DB not initialized');
	return await db.query(sql);
}

export async function checkAnswer(userResult, expectedSql) {
	if (!db) return false;
	const expected = await db.query(expectedSql);

	if (userResult.rows.length !== expected.rows.length) return false;
	if (userResult.fields.length !== expected.fields.length) return false;

	const userCols = userResult.fields.map(f => f.name).sort();
	const expCols = expected.fields.map(f => f.name).sort();
	if (JSON.stringify(userCols) !== JSON.stringify(expCols)) return false;

	for (let i = 0; i < userResult.rows.length; i++) {
		for (const col of expCols) {
			if (userResult.rows[i][col] !== expected.rows[i][col]) return false;
		}
	}
	return true;
}
