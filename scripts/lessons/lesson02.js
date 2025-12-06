const lesson02 = {
    lessonId: 'lesson02',
    schema: [
        {
            name: "documents",
            fields: [
                { name: "id", type: "SERIAL PRIMARY KEY", description: { en: "ID", ru: "ID" } },
                { name: "title", type: "VARCHAR(200)", description: { en: "Document Title", ru: "Название документа" } },
                { name: "doc class", type: "VARCHAR(100)", description: { en: "Class (with space!)", ru: "Класс (с пробелом!)" } },
                { name: "department", type: "VARCHAR(100)", description: { en: "Department", ru: "Отдел" } },
                { name: "amount", type: "DECIMAL(10,2)", description: { en: "Amount", ru: "Сумма" } }
            ],
            ddl: `CREATE TABLE documents (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200),
                "doc class" VARCHAR(100),
                department VARCHAR(100),
                amount DECIMAL(10,2)
            );`,
            dml: `INSERT INTO documents (title, "doc class", department, amount) VALUES
            ('Q1 Report', 'Report', 'Finance', 150.00),
            ('Invoice #1001', 'Invoice', 'Sales', 85.50),
            ('Budget 2024', 'Report', 'Finance', 1200.00),
            ('Contract ABC', 'Contract', 'Legal', 450.00),
            ('Invoice #1002', 'Invoice', 'Sales', 32.00),
            ('Salary March', 'Payroll', 'HR', 850.00),
            ('Q2 Report', 'Report', 'Finance', 180.00),
            ('Invoice #1003', 'Invoice', 'Sales', 120.00);`
        }
    ],
    tasks: [
        // 1. = (equality)
        {
            description: {
                en: "Find all documents in the <code>Finance</code> department.",
                ru: "Найти все документы <code>отдела</code> Finance."
            },
            solution: "SELECT * FROM documents WHERE department = 'Finance';",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 3 && results.every(r => r.department === 'Finance');
            }
        },
        // 2. != (not equal)
        {
            description: {
                en: "Find all documents where department is NOT <code>'Sales'</code>.",
                ru: "Найти все документы, где <code>отдел</code> НЕ равен 'Sales'."
            },
            solution: "SELECT * FROM documents WHERE department != 'Sales';",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 5 && results.every(r => r.department !== 'Sales');
            }
        },
        // 3. > (greater than)
        {
            description: {
                en: "Find documents with <code>amount</code> greater than 500.",
                ru: "Найти документы с <code>суммой</code> больше 500."
            },
            solution: "SELECT * FROM documents WHERE amount > 500;",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 2 && results.every(r => parseFloat(r.amount) > 500);
            }
        },
        // 4. <= (less than or equal)
        {
            description: {
                en: "Find documents with <code>amount</code> at most 100.",
                ru: "Найти документы с <code>суммой</code> не более 100."
            },
            solution: "SELECT * FROM documents WHERE amount <= 100;",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 2 && results.every(r => parseFloat(r.amount) <= 100);
            }
        },
        // 5. AND
        {
            description: {
                en: "Find documents in <code>Finance</code> department with <code>amount</code> > 500.",
                ru: "Найти документы <code>отдела</code> Finance с <code>суммой</code> > 500."
            },
            solution: "SELECT * FROM documents WHERE department = 'Finance' AND amount > 500;",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 1 && results[0].department === 'Finance' && parseFloat(results[0].amount) > 500;
            }
        },
        // 6. OR
        {
            description: {
                en: "Find documents in <code>Sales</code> OR <code>HR</code> department.",
                ru: "Найти документы <code>отдела</code> Sales ИЛИ HR."
            },
            solution: "SELECT * FROM documents WHERE department = 'Sales' OR department = 'HR';",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 4 && results.every(r => r.department === 'Sales' || r.department === 'HR');
            }
        },
        // 7. IN
        {
            description: {
                en: `Find documents where <code>"doc class"</code> is one of: 'Invoice', 'Contract'.`,
                ru: `Найти документы, где <code>"doc class"</code> один из: 'Invoice', 'Contract'.`
            },
            solution: `SELECT * FROM documents WHERE "doc class" IN ('Invoice', 'Contract');`,
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 4 && results.every(r => r['doc class'] === 'Invoice' || r['doc class'] === 'Contract');
            }
        },
        // 8. NOT IN
        {
            description: {
                en: "Find documents where <code>department</code> is NOT one of: 'Sales', 'HR'.",
                ru: "Найти документы, где <code>отдел</code> НЕ один из: 'Sales', 'HR'."
            },
            solution: "SELECT * FROM documents WHERE department NOT IN ('Sales', 'HR');",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 4 && results.every(r => r.department !== 'Sales' && r.department !== 'HR');
            }
        },
        // 9. BETWEEN
        {
            description: {
                en: "Find documents with <code>amount</code> BETWEEN 100 AND 500.",
                ru: "Найти документы с <code>суммой</code> от 100 до 500."
            },
            solution: "SELECT * FROM documents WHERE amount BETWEEN 100 AND 500;",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 4 && results.every(r => {
                    const amt = parseFloat(r.amount);
                    return amt >= 100 && amt <= 500;
                });
            }
        },
        // 11. NOT BETWEEN
        {
            description: {
                en: "Find documents with <code>amount</code> NOT BETWEEN 50 AND 1000.",
                ru: "Найти документы с <code>суммой</code> НЕ в диапазоне 50–1000."
            },
            solution: "SELECT * FROM documents WHERE amount NOT BETWEEN 50 AND 1000;",
            check: (results) => {
                if (!results || results.length === 0) return false;
                return results.length === 2 && results.every(r => {
                    const amt = parseFloat(r.amount);
                    return amt < 50 || amt > 1000;
                });
            }
        }
    ],
    nextLesson: 'lesson03.html'
};

export default lesson02;
