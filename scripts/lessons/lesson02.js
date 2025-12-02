export default {
    title: "Lesson 2: Relationships & JOINs",
    schema: [
        {
            name: "authors",
            fields: [
                { name: "id", type: "SERIAL PRIMARY KEY", description: { en: "ID", ru: "ID" } },
                { name: "name", type: "VARCHAR(255) NOT NULL", description: { en: "Name of author", ru: "Имя автора" } }
            ],
            ddl: `CREATE TABLE authors (
                id SERIAL PRIMARY KEY, 
                name VARCHAR(255) NOT NULL
            );`,
            dml: `INSERT INTO authors (name) VALUES
                ('J.K. Rowling'),
                ('George R.R. Martin'),
                ('J.R.R. Tolkien'),
                ('Isaac Asimov');`
        },
        {
            name: "books",
            fields: [
                { name: "id", type: "SERIAL PRIMARY KEY", description: { en: "ID", ru: "ID" } },
                { name: "title", type: "VARCHAR(255) NOT NULL", description: { en: "Title of book", ru: "Название книги" } },
                { name: "author_id", type: "INT", description: { en: "ID of author", ru: "ID автора" } },
                { name: "year", type: "INT", description: { en: "Year of publishing", ru: "Год издания" } }
            ],
            ddl: `CREATE TABLE books (
                id SERIAL PRIMARY KEY, 
                title VARCHAR(255) NOT NULL,
                author_id INT,
                year INT
            );`,
            dml: `INSERT INTO books (title, author_id, year) VALUES
                ('Harry Potter and the Philosopher''s Stone', 1, 1997),
                ('A Game of Thrones', 2, 1996),
                ('The Hobbit', 3, 1937),
                ('Foundation', 4, 1951),
                ('Harry Potter and the Chamber of Secrets', 1, 1998),
                ('The Fellowship of the Ring', 3, 1954);`
        }
    ],
    tasks: [
        {
            description: {
                en: "Select all book titles",
                ru: "Выберите <code>названия</code> всех книг"
            },
            solution: "SELECT title FROM books;"
        },
        {
            description: {
                en: "Select all books published before 1960",
                ru: "Выберите все книги, изданные до 1960 года"
            },
            solution: "SELECT * FROM books WHERE year < 1960;"
        },
        {
            description: {
                en: "Use a <code>JOIN</code> to show book title and author name",
                ru: "Используйте <code>JOIN</code>, чтобы показать <code>название</code> книги и <code>имя</code> автора"
            },
            solution: "SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id;"
        }
    ]
};
