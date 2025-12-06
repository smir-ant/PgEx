export const locales = {
    en: {
        nav: {
            proj_name: "PgEx"
        },
        lesson01: {
            title: "Lesson 1. Selection: Columns.",
            theory_p1: "The most common command for working with databases is <code>SELECT</code>. It's simply an instruction that specifies what data we're looking for, where to find it in the database, and, if needed, how to transform it before returning. However, let's start with the basics - simply displaying everything or showing specific columns.",
            theory_p2: "The result will be a fragment of the table with the columns we requested.",
            theory_p3: "If we want to get absolutely all columns, we can use the asterisk (<code>*</code>) to avoid listing all column names.",
            code_example1_caption: "Select query for specific columns",
            code_example2_caption: "Select query for all columns",
            tasks_title: "Lesson 1. Tasks:",
            btn_next: "Next",
            btn_run: "Run Tasks",
            faq: {
                q1: "Can column names contain spaces?",
                a1: "Yes, they can! To do this, you need to wrap the column name in double quotes.<div class='code-example'><pre><code>SELECT \"my column\" FROM table;</code></pre></div>",
                q2: "Can column names be in Russian or Chinese?",
                a2: "Yes! PostgreSQL fully supports Unicode. But again, it's better to wrap them in double quotes.<div class='code-example'><pre><code>SELECT \"название\", \"名字\" FROM table;</code></pre></div>",
                q3: "How to write comments?",
                a3: "Single-line with <code>--</code>, multi-line with <code>/* */</code>.<div class='code-example'><pre><code>SELECT * FROM table; -- This is a comment\n\n/* This is a\n   multi-line comment */</code></pre></div>",
                q4: "Is SQL case-sensitive?",
                a4: "Keywords (SELECT, FROM) are not case-sensitive. Identifiers are lowercased unless quoted.<div class='code-example'><pre><code>select * from table; -- same as: SELECT * FROM TABLE\nSELECT Name;         -- becomes: select name\nSELECT \"Name\";       -- remains: Name</code></pre></div>"
            }
        },
        lesson02: {
            title: "Lesson 2: Filtering with WHERE",
            theory_intro: "The <code>WHERE</code> clause allows you to filter rows based on specific conditions. It goes after <code>FROM</code> and before <code>ORDER BY</code>.",
            code_syntax_caption: "General syntax of SELECT with WHERE",
            operators_title: "Comparison Operators",
            table_operator: "Operator",
            table_description: "Description",
            table_example: "Example",
            op_eq: "Equal to",
            op_neq: "Not equal to",
            op_compare: "Comparison (greater, less, etc.)",
            op_and: "Both conditions must be true",
            op_or: "At least one condition must be true",
            op_in: "Value is in the list",
            op_not_in: "Value is NOT in the list",
            op_between: "Value is within range (inclusive)",
            op_not_between: "Value is NOT within range",
            theory_examples: "Here are some examples:",
            tasks_title: "Tasks",
            task1: "Find all documents in the Finance department.",
            task2: "Find documents with amount greater than 50000.",
            task3: "Find all documents where \"document type\" is 'Invoice'.",
            task4: "Find documents with amount BETWEEN 10000 AND 50000."
        },
        lesson03: {
            title: "Lesson 3: Advanced Filtering",
            theory_intro: "The <code>!=</code> (or <code>&lt;&gt;</code>) operator checks for inequality.",
            code_example1_caption: "Select everyone except HR",
            theory_like: "The <code>LIKE</code> operator is used for pattern matching. <code>%</code> matches any sequence, <code>_</code> matches a single character.",
            theory_not_in: "<code>NOT IN</code> excludes values in a list.",
            tasks_title: "Tasks",
            task1: "Find employees NOT in department 1.",
            task2: "Find employees whose name starts with 'J'.",
            task3: "Find employees whose email ends with 'example.com'.",
            task4: "Find employees with salary NOT between 50000 and 100000."
        },
        lesson07: {
            title: "Lesson 7: SELECT ... WHERE",
            theory_p1: "Now let's learn how to filter data using the <code>WHERE</code> clause.",
            code_example1_caption: "Select only rows where id is 1",
            theory_p2: "You can use various operators: <code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>&lt;&gt;</code> (not equal).",
            code_example2_caption: "Select rows where salary is greater than 50000",
            tasks_title: "Tasks",
            task1: "Select all columns from the <code>employees</code> table where <code>salary</code> is greater than 50000.",
            task2: "Select <code>name</code> and <code>salary</code> for employees with <code>id</code> equal to 3."
        },
        index: {
            glossary: "Glossary",
            glossary_desc: "Here will be all terms and where to look for them",
            trainer: "Trainer",
            trainer_desc: "???",
            lesson00: "Lesson 0. SQL, DBMS, Postgre.",
            lesson00_desc: "Starting point for immersion. Basic concepts in simple words.",
            lesson01: "Lesson 1. Selection: Columns.",
            lesson01_desc: "In this lesson you will meet <code>SELECT</code> and learn how to make the most primitive selections - selecting columns.",
            btn_start: "Start"
        },
        status: {
            initializing: "Initializing database...",
            ready: "Ready. Enter the query to see results.",
            returned_rows: "Returned {n} rows.",
            executed_rows: "Executed. Returned {n} rows.",
            executed: "Executed.",
            correct: "Correct! 🎉",
            all_completed: "All tasks completed! 🏆",
            error: "Error: {msg}"
        },
        // Tutorial
        tutorial: {
            step1: "Here is the theory. Start the lesson from this.",
            step2: "Train new knowledge here. The practice block will help you with this.",
            step3: "This is the data schema you will work with. There may be multiple tables.",
            step4: "Table names are presented here.",
            step5: "Write your database query here. It will be executed instantly.",
            step6: "The result of your query will be displayed here.",
            step7: "Here you can see the status of your query.",
            step8: "Tasks for this lesson are listed here.",
            next: "Next",
            finish: "Finish Tutorial",
            skip: "Skip"
        },
        // Solution
        solution: {
            btn_show: "Show Solution",
            confirm: "Show the solution for this task?\n\nBy clicking OK, I agree that I am unable to solve this task, which is 100% correct and manually verified, and I do not want to think about the solution anymore.\nI also acknowledge that the process of thinking about the solution and attempting to compose it forms quality knowledge. I demand the answer and swear that I tried at least a little bit to solve it myself."
        }
    },
    ru: {
        nav: {
            proj_name: "PgEx"
        },
        lesson01: {
            title: "Урок 1. Выборка: колонки.",
            theory_p1: "Самая частая команда для работы с базой данных это <code>SELECT</code>. Это просто инструкция, в которой указывается, какие данные мы ищем, где их найти в базе данных и, при необходимости, как преобразовать их перед возвращением. Однако начнем с самых основ, а именно просто выводить всё или показать определенные колонки.",
            theory_p2: "Результатом будет фрагмент таблицы с теми столбцами что мы запросили.",
            theory_p3: "Если мы хотим получить абсолютно все столбцы, то мы можем использовать звёздочку (<code>*</code>), чтобы не перечислять имена всех столбцов.",
            code_example1_caption: "Запрос для выборки конкретных колонок",
            code_example2_caption: "Запрос для выборки всех колонок",
            tasks_title: "Урок 1. Задания:",
            btn_next: "Далее",
            btn_run: "Выполни задания",
            faq: {
                q1: "Могут ли в названии столбцов быть пробелы?",
                a1: "Да, могут! Для этого нужно писать название колонок в двойных кавычках.<div class='code-example'><pre><code>SELECT \"my column\" FROM table;</code></pre></div>",
                q2: "Могут ли названия колонок быть на русском или китайском?",
                a2: "Да! PostgreSQL полностью поддерживает Unicode.<div class='code-example'><pre><code>SELECT \"название\", \"名字\" FROM table;</code></pre></div>",
                q3: "Как писать комментарии?",
                a3: "Однострочные через <code>--</code>, многострочные через <code>/* */</code>.<div class='code-example'><pre><code>SELECT * FROM table; -- Это комментарий\n\n/* Это многострочный\n   комментарий */</code></pre></div>",
                q4: "Чувствителен ли SQL к регистру?",
                a4: "Ключевые слова (SELECT) — нет. Идентификаторы без кавычек приводятся к нижнему регистру.<div class='code-example'><pre><code>select * from table; -- то же самое что: SELECT * FROM TABLE\nSELECT Name;         -- станет: select name\nSELECT \"Name\";       -- останется: Name</code></pre></div>"
            }
        },
        lesson02: {
            title: "Урок 2: Фильтрация с WHERE",
            theory_intro: "Оператор <code>WHERE</code> позволяет фильтровать строки по условию. Он указывается после <code>FROM</code> и перед <code>ORDER BY</code>.",
            code_syntax_caption: "Общий синтаксис SELECT с WHERE",
            operators_title: "Операторы сравнения",
            table_operator: "Оператор",
            table_description: "Описание",
            table_example: "Пример",
            op_eq: "Равно",
            op_neq: "Не равно",
            op_compare: "Сравнение (больше, меньше и т.д.)",
            op_and: "Оба условия должны быть истинны",
            op_or: "Хотя бы одно условие должно быть истинно",
            op_in: "Значение входит в список",
            op_not_in: "Значение НЕ входит в список",
            op_between: "Значение внутри диапазона (включительно)",
            op_not_between: "Значение НЕ внутри диапазона",
            theory_examples: "Вот несколько примеров:",
            tasks_title: "Задания",
            task1: "Найти все документы отдела Finance.",
            task2: "Найти документы с суммой больше 50000.",
            task3: "Найти все документы, где \"document type\" равен 'Invoice'.",
            task4: "Найти документы с суммой BETWEEN 10000 AND 50000."
        },
        lesson03: {
            title: "Урок 3: Продвинутая фильтрация",
            theory_intro: "Оператор <code>!=</code> (или <code>&lt;&gt;</code>) проверяет на неравенство.",
            code_example1_caption: "Выбрать всех, кроме HR",
            theory_like: "Оператор <code>LIKE</code> используется для поиска по шаблону. <code>%</code> — любая строка, <code>_</code> — один символ.",
            theory_not_in: "<code>NOT IN</code> исключает значения из списка.",
            tasks_title: "Задания",
            task1: "Найти сотрудников НЕ из отдела 1.",
            task2: "Найти сотрудников, чье имя начинается на 'J'.",
            task3: "Найти сотрудников, чей email заканчивается на 'example.com'.",
            task4: "Найти сотрудников с зарплатой НЕ между 50000 и 100000."
        },
        lesson07: {
            title: "Урок 7: Связи и JOIN.",
            theory_p1: "В этом уроке мы научимся связывать таблицы.",
            theory_p2: "У нас есть таблица <code>authors</code> (авторы) и <code>books</code> (книги). У каждой книги есть поле <code>author_id</code>, которое ссылается на <code>id</code> автора.",
            tasks_title: "Задания:",
            btn_finish: "Завершить",
            task01: "Выбери всех авторов.",
            task02: "Выбери названия всех книг.",
            task03: "Найди все книги, изданные в 1866 году.",
            task04: "Найди книги автора 'Fyodor Dostoevsky', изданные после 1860 года."
        },
        index: {
            glossary: "Глоссарий",
            glossary_desc: "Тут будут все термины и где про них смотреть",
            trainer: "Тренажер",
            trainer_desc: "???",
            lesson00: "Урок № 0. SQL, СУБД, Postgre.",
            lesson00_desc: "Отправная точка для погружения. Основные понятия понятными словами.",
            lesson01: "Урок № 1. Выборка: колонки.",
            lesson01_desc: "В этом уроке ты познакомишься с <code>SELECT</code> и научишься делать самые примитивные выборки - выбирать колонки.",
            btn_start: "Пройти"
        },
        status: {
            initializing: "Инициализация базы данных...",
            ready: "Готово. Введите запрос для получения результатов.",
            returned_rows: "Возвращено строк: {n}.",
            executed_rows: "Выполнено. Возвращено строк: {n}.",
            executed: "Выполнено.",
            correct: "Верно! 🎉",
            all_completed: "Все задания выполнены! 🏆",
            error: "Ошибка: {msg}"
        },
        // Tutorial
        tutorial: {
            step1: "Здесь находится теория. Начни прохождение урока с этого.",
            step2: "Полученные знания нужно закрепить. Блок с практикой тебе в этом поможет.",
            step3: "Это схема данных с которыми ты будешь работать. Здесь может быть несколько таблиц.",
            step4: "Названия таблиц представлены здесь.",
            step5: "Пиши свой запрос к базе данных сюда. Он будет моментально выполнен.",
            step6: "Результат твоего запроса будет отображен здесь.",
            step7: "Здесь можно увидеть статус твоего запроса.",
            step8: "Задания на этот урок перечислены здесь.",
            next: "Далее",
            finish: "Закончить обучение",
            skip: "Пропустить"
        },
        // Solution
        solution: {
            btn_show: "Показать решение",
            confirm: "Показать решение этой задачи?\n\nНажимая ДА я соглашаюсь с тем что задание, которое 100% корректное и проверенно вручную, я просто не способен решить и не хочу ещё подумать над решением.\n\nТакже я ознакомлен с тем, что процесс обдумывания решения и попыток его составления и формирует качественные знания. И я требую ответ на задачу, и я клянусь, что хоть немного постарался и пытался решить сам."
        }
    }
};
