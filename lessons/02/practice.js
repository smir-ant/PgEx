export default {
	slug: 'lesson02',
	title: 'Урок 2. Фильтрация с WHERE',
	schema: [{
		name: 'documents',
		fields: [
			{ name: 'id', type: 'SERIAL PRIMARY KEY', desc: 'ID' },
			{ name: 'title', type: 'VARCHAR(200)', desc: 'Название документа' },
			{ name: '"doc class"', type: 'VARCHAR(100)', desc: 'Класс (с пробелом!)' },
			{ name: 'department', type: 'VARCHAR(100)', desc: 'Отдел' },
			{ name: 'amount', type: 'DECIMAL(10,2)', desc: 'Сумма' }
		],
		ddl: `CREATE TABLE documents (id SERIAL PRIMARY KEY, title VARCHAR(200), "doc class" VARCHAR(100), department VARCHAR(100), amount DECIMAL(10,2));`,
		dml: `INSERT INTO documents (title, "doc class", department, amount) VALUES
			('Q1 Report','Report','Finance',150.00),('Invoice #1001','Invoice','Sales',85.50),
			('Budget 2024','Report','Finance',1200.00),('Contract ABC','Contract','Legal',450.00),
			('Invoice #1002','Invoice','Sales',32.00),('Salary March','Payroll','HR',850.00),
			('Q2 Report','Report','Finance',180.00),('Invoice #1003','Invoice','Sales',120.00);`
	}],
	tasks: [
		{ desc: 'Найти все документы `отдела` Finance.', solution: "SELECT * FROM documents WHERE department = 'Finance';" },
		{ desc: "Найти все документы, где `отдел` НЕ равен 'Sales'.", solution: "SELECT * FROM documents WHERE department != 'Sales';" },
		{ desc: 'Найти документы с `суммой` больше 500.', solution: 'SELECT * FROM documents WHERE amount > 500;' },
		{ desc: 'Найти документы с `суммой` не более 100.', solution: 'SELECT * FROM documents WHERE amount <= 100;' },
		{ desc: 'Найти документы `отдела` Finance с `суммой` > 500.', solution: "SELECT * FROM documents WHERE department = 'Finance' AND amount > 500;" },
		{ desc: 'Найти документы `отдела` Sales ИЛИ HR.', solution: "SELECT * FROM documents WHERE department = 'Sales' OR department = 'HR';" },
		{ desc: 'Найти документы, где `"doc class"` один из: \'Invoice\', \'Contract\'.', solution: `SELECT * FROM documents WHERE "doc class" IN ('Invoice', 'Contract');` },
		{ desc: "Найти документы, где `отдел` НЕ один из: 'Sales', 'HR'.", solution: "SELECT * FROM documents WHERE department NOT IN ('Sales', 'HR');" },
		{ desc: 'Найти документы с `суммой` от 100 до 500.', solution: 'SELECT * FROM documents WHERE amount BETWEEN 100 AND 500;' },
		{ desc: 'Найти документы с `суммой` НЕ в диапазоне 50–1000.', solution: 'SELECT * FROM documents WHERE amount NOT BETWEEN 50 AND 1000;' }
	],
	next: 'lesson03'
};
