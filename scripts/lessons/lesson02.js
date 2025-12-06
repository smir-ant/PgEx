const lesson02 = {
    lessonId: 'lesson02',
    schema: [
        {
            name: "documents",
            fields: [
                { name: "id", type: "SERIAL PRIMARY KEY", description: { en: "ID", ru: "ID" } },
                { name: "title", type: "VARCHAR(200)", description: { en: "Document Title", ru: "Название документа" } },
                { name: "document type", type: "VARCHAR(100)", description: { en: "Type (with space!)", ru: "Тип (с пробелом!)" } },
                { name: "department", type: "VARCHAR(100)", description: { en: "Department", ru: "Отдел" } },
                { name: "amount", type: "DECIMAL(10,2)", description: { en: "Amount", ru: "Сумма" } }
            ],
            ddl: `CREATE TABLE documents (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200),
                "document type" VARCHAR(100),
                department VARCHAR(100),
                amount DECIMAL(10,2)
            );`,
            dml: `INSERT INTO documents (title, "document type", department, amount) VALUES
            ('Q1 Report', 'Report', 'Finance', 15000.00),
            ('Invoice #1001', 'Invoice', 'Sales', 8500.50),
            ('Budget 2024', 'Report', 'Finance', 120000.00),
            ('Contract ABC', 'Contract', 'Legal', 45000.00),
            ('Invoice #1002', 'Invoice', 'Sales', 3200.00),
            ('Salary March', 'Payroll', 'HR', 85000.00),
            ('Q2 Report', 'Report', 'Finance', 18000.00),
            ('Invoice #1003', 'Invoice', 'Sales', 12000.00);`
        }
    ],
    tasks: [
        {
            id: 'task1',
            descriptionI18n: 'lesson02.task1',
            check: (results) => {
                // Find all documents in Finance department (Q1 Report, Budget 2024, Q2 Report)
                if (!results || results.length === 0) return false;
                return results.length === 3 && results.every(r => r.department === 'Finance');
            }
        },
        {
            id: 'task2',
            descriptionI18n: 'lesson02.task2',
            check: (results) => {
                // Find documents with amount > 50000 (Budget 2024, Salary March)
                if (!results || results.length === 0) return false;
                return results.length === 2 && results.every(r => parseFloat(r.amount) > 50000);
            }
        },
        {
            id: 'task3',
            descriptionI18n: 'lesson02.task3',
            check: (results) => {
                // Find all Invoices (3 invoices)
                if (!results || results.length === 0) return false;
                return results.length === 3 && results.every(r => r['document type'] === 'Invoice');
            }
        },
        {
            id: 'task4',
            descriptionI18n: 'lesson02.task4',
            check: (results) => {
                // Find documents with amount BETWEEN 10000 AND 50000 (Q1 Report 15000, Contract ABC 45000, Q2 Report 18000, Invoice #1003 12000)
                if (!results || results.length === 0) return false;
                return results.length === 4 && results.every(r => {
                    const amt = parseFloat(r.amount);
                    return amt >= 10000 && amt <= 50000;
                });
            }
        }
    ],
    nextLesson: 'lesson03.html'
};

export default lesson02;
