/* 
данные для заполнения таблицы | при подключении создаётся переменная createDB
*/

/* createDB = [
    [
        'название таблицы',
        'создание таблицы',
        'наполнение таблицы'
    ],
    [
        'название таблицы',
        'создание таблицы',
        'наполнение таблицы'
    ],
]
*/

// INSERT INTO ${tablename} и CREATE TABLE ${tablename} пропущено, чтобы не оборачивать это в функцию с аргументом и всё такое..
export const createDB = [
    [
        `gay`,

        ` (
        id SERIAL PRIMARY KEY, 
        Title VARCHAR(255) NOT NULL);`
        
        ,` (Title) VALUES
        ('гейство'),
        ('суета');`
    ],
    [
        `eboy`,

        ` (
        id SERIAL PRIMARY KEY, 
        price INT NOT NULL);`
        
        ,` (price) VALUES
        (123),
        (321),
        (666);`
    ],
]