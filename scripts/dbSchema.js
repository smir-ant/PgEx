// Получаем значение из data-атрибута текущего скрипта, music например
const dbName = document.querySelector('script[data-db]').getAttribute('data-db');

console.log("dbName:", dbName);

// Исходные данные
const module = await import(`./db/${dbName}.js`);
// console.log("createDB:", );

export const createDB = module.createDB;
console.log('CreateDB:', createDB);

// Функция для парсинга структуры таблицы из SQL-запроса
function parseTableSchema(schemaString) {
    // Убираем лишние символы и разбиваем строку по запятым
    const fields = schemaString
        .replace(/\n/g, '') // Убираем переносы строк
        .replace(/[();]/g, '') // Убираем скобки и точки с запятой
        .split(','); // Разделяем по запятым

    // Массив для хранения полей таблицы
    const parsedFields = [];

    fields.forEach(field => {
        // Разделяем строку на части: имя поля и его тип
        const parts = field.trim().split(/\s+/); // Разделяем по пробелам
        const fieldName = parts[0].toLowerCase(); // Приводим название колонки к нижнему регистру

        // Объединяем тип данных (всё что после названия колонки)
        let fieldType = parts.slice(1).join(' ');

        // Убираем "NOT NULL" и другие ограничения, оставляем только тип
        fieldType = fieldType.replace('NOT NULL', '').trim();

        // Если поле является PRIMARY KEY, заменяем тип SERIAL на INT и добавляем ключ
        if (fieldType.includes('SERIAL PRIMARY KEY')) {
            fieldType = '🔑 INT';
        }

        // Исправляем строку для поля с типом VARCHAR(255), чтобы сохранить скобки
        fieldType = fieldType.replace('VARCHAR255', 'VARCHAR(255)');

        parsedFields.push({
            name: fieldName,
            type: fieldType
        });
    });

    return parsedFields;
}

// Парсим структуру таблицы
const tableName = createDB[0]; // Имя таблицы
const tableSchema = parseTableSchema(createDB[1]); // Структура таблицы

// Вставляем название таблицы (.schema #tableName)
document.getElementById("tableName").innerText = tableName;

// Создаем div элемент с классом 'schema'
const schemaDiv = document.createElement('div');
schemaDiv.classList.add('schema');

// Создаем таблицу
const table = document.createElement('table');
table.classList.add('schema');

// Создаем заголовок таблицы
// const headerRow = document.createElement('tr');
// const th = document.createElement('th');
// th.colSpan = 2; // Объединяем две колонки
// th.innerText = tableName;
// headerRow.appendChild(th);
// table.appendChild(headerRow);

// Создаем строки таблицы из schemaData
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

// Добавляем таблицу в div
schemaDiv.appendChild(table);

// Добавляем созданный div в контейнер на странице
// document.getElementById('schema').appendChild(schemaDiv);
// Добавляем элемент schemaDiv перед первым дочерним элементом
const schema = document.getElementById('schema');
schema.insertBefore(schemaDiv, schema.firstChild);