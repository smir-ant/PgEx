export default {
    title: "Lesson 2: Relationships & JOINs",
    schema: [
        {
            name: "authors",
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
            description: "Select all book titles",
            solution: "SELECT title FROM books;"
        },
        {
            description: "Select all books published before 1960",
            solution: "SELECT * FROM books WHERE year < 1960;"
        },
        {
            description: "Use a <code>JOIN</code> to show book title and author name",
            solution: "SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id;"
        }
    ]
};
