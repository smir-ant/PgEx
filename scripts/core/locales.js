export const locales = {
    en: {
        nav: {
            proj_name: "PgEx"
        },
        lesson01: {
            title: "Lesson 1. Selection: Columns.",
            theory_p1: "The <code>SELECT</code> statement is used to retrieve data from a database. It is the most common command in SQL.",
            theory_p2: "To select specific columns, list their names separated by commas after the <code>SELECT</code> keyword. For example: <code>SELECT title, artist FROM playlist;</code>",
            theory_p3: "If you want to retrieve all columns from a table, use the asterisk symbol (<code>*</code>). For example: <code>SELECT * FROM playlist;</code>",
            tasks_title: "Lesson 1. Tasks:",
            btn_next: "Next",
            btn_run: "Run Tasks"
        },
        lesson02: {
            title: "Lesson 2. Relations and JOIN.",
            theory_p1: "In this lesson we will learn how to join tables.",
            theory_p2: "We have table <code>authors</code> and <code>books</code>. Each book has <code>author_id</code> field which refers to author's <code>id</code>.",
            tasks_title: "Tasks:",
            btn_finish: "Finish"
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
            theory_p1: "Команда <code>SELECT</code> используется для выборки данных из базы данных. Это самая частая команда в SQL.",
            theory_p2: "Чтобы выбрать конкретные колонки, перечислите их названия через запятую после ключевого слова <code>SELECT</code>. Например: <code>SELECT title, artist FROM playlist;</code>",
            theory_p3: "Если вы хотите получить все колонки из таблицы, используйте символ звёздочки (<code>*</code>). Например: <code>SELECT * FROM playlist;</code>",
            tasks_title: "Урок 1. Задания:",
            btn_next: "Далее",
            btn_run: "Выполни задания"
        },
        lesson02: {
            title: "Урок 2. Связи и JOIN.",
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
