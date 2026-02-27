export default {
	slug: 'lesson03',
	title: 'Урок 3. Продвинутая фильтрация',
	schema: [{
		name: 'employees',
		fields: [
			{ name: 'id', type: 'SERIAL PRIMARY KEY', desc: 'ID' },
			{ name: 'name', type: 'VARCHAR(100)', desc: 'Имя сотрудника' },
			{ name: 'department_id', type: 'INT', desc: 'ID отдела' },
			{ name: 'salary', type: 'INT', desc: 'Зарплата' },
			{ name: 'email', type: 'VARCHAR(100)', desc: 'Email' }
		],
		ddl: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), department_id INT, salary INT, email VARCHAR(100));`,
		dml: `INSERT INTO employees (name, department_id, salary, email) VALUES
			('John Doe',1,55000,'john@example.com'),('Jane Smith',2,85000,'jane@test.com'),
			('Alice Jones',1,45000,'alice@example.com'),('Bob Brown',2,65000,'bob@test.com'),
			('Charlie Black',3,70000,'charlie@example.com');`
	}],
	tasks: [
		{ desc: 'Найти сотрудников НЕ из отдела 1.', solution: 'SELECT * FROM employees WHERE department_id != 1;' },
		{ desc: "Найти сотрудников, чье имя начинается на 'J'.", solution: "SELECT * FROM employees WHERE name LIKE 'J%';" },
		{ desc: "Найти сотрудников, чей email заканчивается на 'example.com'.", solution: "SELECT * FROM employees WHERE email LIKE '%example.com';" },
		{ desc: 'Найти сотрудников с зарплатой НЕ между 50000 и 100000.', solution: 'SELECT * FROM employees WHERE salary NOT BETWEEN 50000 AND 100000;' }
	]
};
