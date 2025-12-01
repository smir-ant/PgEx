export class SchemaRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(tables) {
        this.container.innerHTML = ''; // Clear existing

        tables.forEach(table => {
            const figure = document.createElement('figure');
            figure.className = 'schema_block';

            const caption = document.createElement('figcaption');
            caption.innerHTML = `<span class="table-icon"></span> <span class="mono">${table.name}</span>`;
            figure.appendChild(caption);

            const tableEl = document.createElement('table');
            tableEl.className = 'schema_table';

            // Parse columns from DDL if not explicitly provided in config
            // Simple regex parser for demo purposes
            const columns = this.parseDDL(table.ddl);

            columns.forEach(col => {
                const tr = document.createElement('tr');

                const nameTd = document.createElement('td');
                nameTd.textContent = col.name;
                if (col.isPk) nameTd.innerHTML += ' 🔑';

                const typeTd = document.createElement('td');
                typeTd.textContent = col.type;

                tr.appendChild(nameTd);
                tr.appendChild(typeTd);
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
            const isPk = type.toUpperCase().includes('PRIMARY KEY');

            return { name, type, isPk };
        });
    }
}
