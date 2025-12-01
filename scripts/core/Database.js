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

        if (userResult.rows.length !== expectedResult.rows.length) return false;
        if (userResult.fields.length !== expectedResult.fields.length) return false;

        // Simple comparison of JSON stringified rows
        // In a real app, you might want deeper comparison (ignoring order if not specified, etc.)
        return JSON.stringify(userResult.rows) === JSON.stringify(expectedResult.rows);
    }
}
