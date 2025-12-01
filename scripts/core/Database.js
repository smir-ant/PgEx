import { PGlite } from 'pglite';

export class Database {
    constructor() {
        this.db = null;
    }

    async init(tables) {
        this.db = new PGlite();

        for (const table of tables) {
            console.log(`[DB] Creating table: ${table.name}`);
            await this.db.query(table.ddl);
            if (table.dml) {
                console.log(`[DB] Seeding table: ${table.name}`);
                await this.db.query(table.dml);
            }
        }
    }

    async query(sql) {
        return await this.db.query(sql);
    }

    async executeSafe(sql) {
        // Wraps non-SELECT queries in a transaction that rolls back
        // to allow users to practice destructive commands without breaking the DB permanently
        // We return the result of the SELECT * if present, or the last result
        const result = await this.db.exec(`
            BEGIN;
            ${sql}
            ROLLBACK;
        `);
        return result;
    }

    async checkAnswer(userResult, expectedSql) {
        const expectedResult = await this.db.query(expectedSql);

        // 1. Check row count
        if (userResult.rows.length !== expectedResult.rows.length) return false;

        // 2. Check column count
        if (userResult.fields.length !== expectedResult.fields.length) return false;

        // 3. Check if column names match (ignoring order)
        const userCols = userResult.fields.map(f => f.name).sort();
        const expectedCols = expectedResult.fields.map(f => f.name).sort();

        if (JSON.stringify(userCols) !== JSON.stringify(expectedCols)) return false;

        // 4. Compare rows
        // We assume row order matters unless specified otherwise (usually simple selects return in insertion order or undefined)
        // But for strict equality in exercises, we usually expect the same rows in the same order if no ORDER BY.
        // However, to be safe and robust, we iterate and check values by key.
        for (let i = 0; i < userResult.rows.length; i++) {
            const userRow = userResult.rows[i];
            const expectedRow = expectedResult.rows[i];

            for (const col of expectedCols) {
                // Use loose equality or strict? Strict is better for DB.
                if (userRow[col] !== expectedRow[col]) return false;
            }
        }

        return true;
    }
}
