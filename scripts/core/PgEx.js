import { Database } from './Database.js';
import { SchemaRenderer } from './SchemaRenderer.js';

export class PgEx {
    constructor(config) {
        this.config = config;
        this.db = new Database();
        this.schemaRenderer = new SchemaRenderer('schema');
        this.currentTaskIndex = 0;

        this.ui = {
            sqlInput: document.getElementById('sqlInput'),
            status: document.getElementById('status'),
            dataTable: document.getElementById('dataTable'),
            tasksList: document.querySelector('#group_task ol'),
            nextBtn: document.getElementById('finishBtn')
        };

        this.init();
    }

    async init() {
        this.setStatus("Initializing database...");
        await this.db.init(this.config.schema);

        this.schemaRenderer.render(this.config.schema);
        this.renderTasks();

        // Setup Event Listeners
        this.ui.sqlInput.addEventListener('input', () => this.handleInput());

        // Initial Query
        const initialSql = `SELECT * FROM ${this.config.schema[0].name};`;
        this.ui.sqlInput.value = initialSql;

        // Sync highlighting immediately
        if (window.syncHighlight) window.syncHighlight();

        await this.executeQuery(initialSql);

        // Initial Button State
        if (this.ui.nextBtn) {
            this.ui.nextBtn.textContent = "Выполни задания";
            this.ui.nextBtn.classList.add('disabled');
        }

        this.setStatus("Ready. Enter the query to see results.");
    }

    setStatus(msg) {
        if (this.ui.status) this.ui.status.textContent = msg;
    }

    renderTasks() {
        if (!this.ui.tasksList) return;
        this.ui.tasksList.innerHTML = '';

        this.config.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = task.description;
            if (index === this.currentTaskIndex) li.className = 'active';
            else if (index < this.currentTaskIndex) li.className = 'completed';
            else li.className = 'disabled';
            this.ui.tasksList.appendChild(li);
        });
    }

    async handleInput() {
        const sql = this.ui.sqlInput.value; // Don't trim here for highlighting

        // Sync highlighting
        if (window.syncHighlight) window.syncHighlight();

        // Basic sanitization/cleanup logic here (same as before)
        if (!sql.trim()) return;

        await this.executeQuery(sql.trim());
    }

    async executeQuery(sql) {
        try {
            const isSelect = sql.toLowerCase().startsWith('select');
            let result;

            if (isSelect) {
                result = await this.db.query(sql);
                this.renderTable(result);
                this.setStatus(`Returned ${result.rows.length} rows.`);

                await this.checkTask(result);
            } else {
                // Transactional execution for safety
                const results = await this.db.executeSafe(sql);
                // Find the SELECT result to display
                const selectRes = results.find(r => r.command === 'SELECT');
                if (selectRes) {
                    this.renderTable(selectRes);
                    this.setStatus(`Executed. Returned ${selectRes.rows.length} rows.`);
                } else {
                    this.setStatus("Executed.");
                }
            }
        } catch (e) {
            this.setStatus(`Error: ${e.message}`);
        }
    }

    async checkTask(userResult) {
        const currentTask = this.config.tasks[this.currentTaskIndex];
        if (!currentTask) return;

        const isCorrect = await this.db.checkAnswer(userResult, currentTask.solution);

        if (isCorrect) {
            this.setStatus("Correct! 🎉");
            this.currentTaskIndex++;
            this.renderTasks();

            if (this.currentTaskIndex >= this.config.tasks.length) {
                this.setStatus("All tasks completed! 🏆");
                // Enable next button
                if (this.ui.nextBtn) {
                    this.ui.nextBtn.classList.remove('disabled');
                    this.ui.nextBtn.textContent = "Далее";
                }
            }
        }
    }

    renderTable(result) {
        // Reusing existing fillTableHtml logic or implementing simple one
        // For now, let's assume fillTableHtml is globally available or we implement a simple one
        if (window.fillTableHtml) {
            window.fillTableHtml(result.rows, result.fields);
        }
    }
}
