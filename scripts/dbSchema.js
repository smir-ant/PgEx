// Получаем значение из data-атрибута текущего скрипта (например, 'music')
const dbName = document.querySelector('script[data-db]').getAttribute('data-db');

// Импортируем модуль с таблицами
const module = await import(`./db/${dbName}.js`);

// массив таблиц [['название','создание','наполнение'],['название','создание','наполнение'],]
export const createDB = module.createDB;



// отрисовка схем таблиц на странице
/*
// Функция для парсинга структуры таблицы из SQL-запроса
function parseTableSchema(schemaString) {
    const fields = schemaString
        .replace(/\n/g, '')  // Убираем переносы строк
        .replace(/[();]/g, '')  // Убираем скобки и точки с запятой
        .split(',');  // Разделяем по запятым

    const parsedFields = [];

    fields.forEach(field => {
        const parts = field.trim().split(/\s+/);  // Разделяем строку на части
        const fieldName = parts[0].toLowerCase();  // Имя поля в нижнем регистре
        let fieldType = parts.slice(1).join(' ');  // Тип данных

        // Очищаем тип от лишних ограничений
        fieldType = fieldType.replace('NOT NULL', '').trim();

        // Если PRIMARY KEY, меняем SERIAL на INT и добавляем ключ
        if (fieldType.includes('SERIAL PRIMARY KEY')) {
            fieldType = '🔑 INT';
        }

        // Исправляем строку для VARCHAR(255)
        fieldType = fieldType.replace('VARCHAR255', 'VARCHAR(255)');

        parsedFields.push({
            name: fieldName,
            type: fieldType
        });
    });

    return parsedFields;
}

// Секция для всех таблиц
const schemaSection = document.getElementById('schema');

// Для каждой таблицы из createDB создаем отдельный блок (figure)
createDB.forEach(tableData => {
    const tableName = tableData[0];  // Название таблицы
    const tableSchema = parseTableSchema(tableData[1]);  // Структура таблицы

    // Создаем figure для каждой таблицы
    const figure = document.createElement('figure');
    figure.classList.add('schema_block');

    // Схема будет в table внутри figure
    const table = document.createElement('table');
    table.classList.add('schema_table');

    // Создаем строки для полей таблицы
    tableSchema.forEach(field => {
        const row = document.createElement('tr');

        const fieldCell = document.createElement('td');
        fieldCell.innerText = field.name;

        const typeCell = document.createElement('td');
        typeCell.innerText = field.type;

        row.appendChild(fieldCell);
        row.appendChild(typeCell);
        table.appendChild(row);
    });

    // Добавляем таблицу в figure
    figure.appendChild(table);

    // Создаем подпись для таблицы (figcaption)
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `<label>Таблица <span class="mono">${tableName}</span></label>`;
    figure.appendChild(figcaption);

    // Добавляем figure в секцию schema
    schemaSection.appendChild(figure);
});

*/