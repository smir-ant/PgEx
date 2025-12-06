const lesson03 = {
    lessonId: 'lesson03',
    schema: [
        {
            name: "employees",
            fields: [
                { name: "id", type: "SERIAL PRIMARY KEY", description: { en: "ID", ru: "ID" } },
                { name: "name", type: "VARCHAR(100)", description: { en: "Employee Name", ru: "Имя сотрудника" } },
                { name: "department_id", type: "INT", description: { en: "Department ID", ru: "ID отдела" } },
                { name: "salary", type: "INT", description: { en: "Salary", ru: "Зарплата" } },
                { name: "email", type: "VARCHAR(100)", description: { en: "Email", ru: "Email" } }
            ],
            ddl: `CREATE TABLE employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                department_id INT,
                salary INT,
                email VARCHAR(100)
            );`,
            dml: `INSERT INTO employees (name, department_id, salary, email) VALUES
            ('John Doe', 1, 55000, 'john@example.com'),
            ('Jane Smith', 2, 85000, 'jane@test.com'),
            ('Alice Jones', 1, 45000, 'alice@example.com'),
            ('Bob Brown', 2, 65000, 'bob@test.com'),
            ('Charlie Black', 3, 70000, 'charlie@example.com');`
        }
    ],
    tasks: [
        {
            id: 'task1',
            descriptionI18n: 'lesson03.task1',
            check: (results) => {
                // NOT in department 1 (Jane, Bob, Charlie)
                if (!results || results.length === 0) return false;
                const names = results.map(r => r.name).sort();
                return names.length === 3 && !names.includes('John Doe') && !names.includes('Alice Jones');
            }
        },
        {
            id: 'task2',
            descriptionI18n: 'lesson03.task2',
            check: (results) => {
                // Name starts with 'J' (John, Jane)
                if (!results || results.length === 0) return false;
                const names = results.map(r => r.name).sort();
                return names.length === 2 && names.includes('John Doe') && names.includes('Jane Smith');
            }
        },
        {
            id: 'task3',
            descriptionI18n: 'lesson03.task3',
            check: (results) => {
                // Email ends with 'example.com' (John, Alice, Charlie)
                if (!results || results.length === 0) return false;
                const names = results.map(r => r.name).sort();
                return names.length === 3 && names.includes('John Doe') && names.includes('Alice Jones') && names.includes('Charlie Black');
            }
        },
        {
            id: 'task4',
            descriptionI18n: 'lesson03.task4',
            check: (results) => {
                // Salary NOT between 50000 and 100000 (Alice Jones 45000)
                if (!results || results.length === 0) return false;
                return results.length === 1 && results[0].name === 'Alice Jones';
            }
        }
    ],
    nextLesson: 'lesson07.html'
};

export default lesson03;
