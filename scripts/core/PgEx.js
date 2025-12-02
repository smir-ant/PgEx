import { Database } from './Database.js';
import { SchemaRenderer } from './SchemaRenderer.js';
import { Localization } from './Localization.js';

export class PgEx {
    constructor(config) {
        this.config = config;
        this.db = new Database();
        this.i18n = new Localization();
        this.schemaRenderer = new SchemaRenderer('schema', this.i18n);
        this.currentTaskIndex = 0;
        this.lastError = null; // Track last error for re-translation

        this.ui = {
            sqlInput: document.getElementById('sqlInput'),
            status: document.getElementById('status'),
            dataTable: document.getElementById('dataTable'),
            tasksList: document.querySelector('#group_task ol'),
            nextBtn: document.getElementById('finishBtn'),
            langSwitcher: document.getElementById('langSwitcher')
        };

        this.init();
    }

    async init() {
        this.setStatus("status.initializing");
        await this.db.init(this.config.schema);

        this.schemaRenderer.render(this.config.schema);
        this.renderTasks();
        this.i18n.updatePage();

        // Subscribe to language changes
        this.i18n.subscribe(() => {
            this.i18n.updatePage();
            this.renderTasks();

            // Re-translate error if one is currently shown
            if (this.lastError) {
                this.setStatus("status.error", { msg: this.translateError(this.lastError) });
            } else {
                this.updateStatusOnLangChange();
            }

            this.updateButtonOnLangChange();
        });

        // Setup Event Listeners
        this.ui.sqlInput.addEventListener('input', () => this.handleInput());
        if (this.ui.langSwitcher) {
            this.ui.langSwitcher.addEventListener('click', () => this.i18n.toggleLanguage());
        }

        // Initial Query
        const initialSql = `SELECT * FROM ${this.config.schema[0].name};`;
        this.ui.sqlInput.value = initialSql;

        // Sync highlighting immediately
        if (window.syncHighlight) window.syncHighlight();

        await this.executeQuery(initialSql);

        // Initial Button State
        if (this.ui.nextBtn) {
            this.ui.nextBtn.textContent = this.i18n.t('lesson01.btn_run');
            this.ui.nextBtn.classList.add('disabled');
        }

        this.setStatus("status.ready");
    }

    setStatus(key, params = {}) {
        if (this.ui.status) {
            this.ui.status.textContent = this.i18n.t(key, params);
            this.ui.status.dataset.lastStatusKey = key;
            this.ui.status.dataset.lastStatusParams = JSON.stringify(params);
        }
    }

    updateStatusOnLangChange() {
        if (this.ui.status && this.ui.status.dataset.lastStatusKey) {
            const key = this.ui.status.dataset.lastStatusKey;
            const params = JSON.parse(this.ui.status.dataset.lastStatusParams || '{}');
            this.ui.status.textContent = this.i18n.t(key, params);
        }
    }

    updateButtonOnLangChange() {
        if (this.ui.nextBtn) {
            // Determine if we are in "Run" or "Next" state based on class or completion
            // A simple check is if it has 'disabled' class, it's "Run", else "Next"
            // But wait, "Run" is disabled initially.
            // Actually, the logic in init() sets it to 'btn_run'.
            // Logic in checkTask() sets it to 'btn_next' when all completed.

            const allCompleted = this.currentTaskIndex >= this.config.tasks.length;
            const key = allCompleted ? 'lesson01.btn_next' : 'lesson01.btn_run';
            this.ui.nextBtn.textContent = this.i18n.t(key);
        }
    }

    renderTasks() {
        if (!this.ui.tasksList) return;
        this.ui.tasksList.innerHTML = '';

        this.config.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            // Support bilingual descriptions
            const desc = typeof task.description === 'object'
                ? task.description[this.i18n.currentLang]
                : task.description;
            li.innerHTML = desc;
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
            this.lastError = null; // Clear previous error

            // Simple validation: detect SELECT with no columns (SELECT FROM / SELECT  FROM etc)
            if (/^\s*SELECT\s+FROM\b/i.test(sql)) {
                throw new Error('syntax error at or near "FROM"');
            }

            const isSelect = sql.toLowerCase().startsWith('select');
            let result;

            if (isSelect) {
                result = await this.db.query(sql);
                this.renderTable(result);
                this.setStatus("status.returned_rows", { n: result.rows.length });

                await this.checkTask(result);
            } else {
                // Transactional execution for safety
                const results = await this.db.executeSafe(sql);
                // Find the SELECT result to display
                const selectRes = results.find(r => r.command === 'SELECT');
                if (selectRes) {
                    this.renderTable(selectRes);
                    this.setStatus("status.executed_rows", { n: selectRes.rows.length });
                } else {
                    this.setStatus("status.executed");
                }
            }
        } catch (e) {
            this.lastError = e.message; // Store for re-translation
            this.setStatus("status.error", { msg: this.translateError(e.message) });
        }
    }

    translateError(errorMsg) {
        const lang = this.i18n.currentLang;

        // Common PostgreSQL error patterns
        const patterns = {
            // Column does not exist
            columnNotExist: {
                regex: /column "([^"]+)" does not exist/i,
                en: match => `Column "${match[1]}" does not exist`,
                ru: match => `Колонка "${match[1]}" не существует`
            },
            // Table does not exist
            tableNotExist: {
                regex: /relation "([^"]+)" does not exist/i,
                en: match => `Table "${match[1]}" does not exist`,
                ru: match => `Таблица "${match[1]}" не существует`
            },
            // Syntax error
            syntaxError: {
                regex: /syntax error at or near "([^"]+)"/i,
                en: match => `Syntax error near "${match[1]}"`,
                ru: match => `Синтаксическая ошибка возле "${match[1]}"`
            },
            // Ambiguous column
            ambiguousColumn: {
                regex: /column reference "([^"]+)" is ambiguous/i,
                en: match => `Column "${match[1]}" is ambiguous`,
                ru: match => `Неоднозначная колонка "${match[1]}"`
            }
        };

        // Try to match and translate
        for (const [key, pattern] of Object.entries(patterns)) {
            const match = errorMsg.match(pattern.regex);
            if (match) {
                return pattern[lang](match);
            }
        }

        // Return original if no pattern matched
        return errorMsg;
    }

    async checkTask(userResult) {
        const currentTask = this.config.tasks[this.currentTaskIndex];
        if (!currentTask) return;

        const isCorrect = await this.db.checkAnswer(userResult, currentTask.solution);

        if (isCorrect) {
            this.setStatus("status.correct");
            this.currentTaskIndex++;
            this.renderTasks();

            if (this.currentTaskIndex >= this.config.tasks.length) {
                this.setStatus("status.all_completed");
                // Enable next button
                if (this.ui.nextBtn) {
                    this.ui.nextBtn.classList.remove('disabled');
                    this.ui.nextBtn.textContent = this.i18n.t('lesson01.btn_next');
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
