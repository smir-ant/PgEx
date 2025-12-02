export class SchemaRenderer {
    constructor(containerId, i18n) {
        this.container = document.getElementById(containerId);
        this.i18n = i18n;
        this.tables = null;

        // Subscribe to language changes to re-render schema
        if (this.i18n) {
            this.i18n.subscribe(() => {
                if (this.tables) {
                    this.render(this.tables);
                }
            });
        }
    }

    render(tables) {
        this.tables = tables; // Store for re-rendering on language change
        this.container.innerHTML = ''; // Clear existing

        tables.forEach(table => {
            const figure = document.createElement('figure');
            figure.className = 'schema_block';

            const caption = document.createElement('figcaption');
            caption.innerHTML = `<span class="table-icon"></span> <span class="mono">${table.name}</span>`;
            figure.appendChild(caption);

            const tableEl = document.createElement('table');
            tableEl.className = 'schema_table';

            // Use explicit fields if available, otherwise fallback to DDL parsing
            const columns = table.fields ? table.fields : this.parseDDL(table.ddl);

            columns.forEach(col => {
                const tr = document.createElement('tr');

                // Column Name (Technical) with Tooltip
                const nameTd = document.createElement('td');
                nameTd.className = 'mono';
                nameTd.style.fontWeight = 'bold';
                nameTd.textContent = col.name;
                if (col.type) {
                    nameTd.title = col.type; // Technical details in tooltip
                    if (col.type.includes('PRIMARY KEY')) nameTd.innerHTML += ' 🔑';
                }

                // Description (Localized)
                const descTd = document.createElement('td');
                if (col.description && typeof col.description === 'object') {
                    descTd.textContent = col.description[this.i18n.currentLang] || col.description.en;
                } else {
                    descTd.textContent = col.description || ''; // Fallback
                }

                tr.appendChild(nameTd);
                tr.appendChild(descTd);
                tableEl.appendChild(tr);
            });

            figure.appendChild(tableEl);
            this.container.appendChild(figure);
        });
    }

    parseDDL(ddl) {
        // Very basic parser. In production, use a real SQL parser or explicit config.
        // Assumes "CREATE TABLE name ( col type, ... )"
        const content = ddl.match(/\(([\s\S]+)\)/)[1];
        const lines = content.split(',').map(l => l.trim());

        return lines.map(line => {
            const parts = line.split(/\s+/);
            const name = parts[0];
            const type = parts.slice(1).join(' ').replace(/,$/, '');

            return { name, type, description: '' };
        });
    }
}
