/* 
подсветка sql кода самодельная поверх prism.js
+ регулярка конкретно под pgSQL
*/

Prism.languages.sql = {
    comment: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|#).*?(\r?\n|$))/,
    string: /("|')(\\?[\s\S])*?\1/,
    function: /\b(?:COUNT|SUM|AVG|MIN|MAX|NOW|COALESCE|GREATEST|LEAST|LENGTH|SUBSTRING|UPPER|LOWER|TO_CHAR|TO_DATE|AGE|EXTRACT|ROUND|TRIM|RANK|DENSE_RANK|ROW_NUMBER|ARRAY_AGG|STRING_AGG|DATE_PART|DATE_TRUNC|RANDOM|GENERATE_SERIES|SETVAL|NEXTVAL|CURRVAL|ARRAY_LENGTH)(?=\s*\()/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    keyword: /\b(?:ABORT|ABS|ACTION|ADD|AFTER|AGGREGATE|ALTER|ANALYZE|ARRAY|AS|ASC|ASSERT|ASSIGN|AT|BEGIN|BETWEEN|BIGINT|BOOLEAN|BY|CASE|CAST|CHECK|COLLATE|COLUMN|COMMENT|COMMIT|CONFLICT|CONSTRAINT|CREATE|CROSS|CURRENT|CURRENT_CATALOG|CURRENT_DATE|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|DECLARE|DEFAULT|DELETE|DESC|DISTINCT|DO|DROP|ELSE|END|EXCEPT|EXISTS|EXPLAIN|FETCH|FILTER|FOR|FOREIGN|FROM|FULL|GRANT|GROUP|HAVING|INNER|INSERT|INT|INTO|JOIN|LEFT|LIMIT|LOCK|LOOP|NATURAL|OFFSET|ON|ORDER|OUTER|OVER|PERFORM|PLPGSQL|PRIMARY|RAISE|REFERENCES|RETURN|RETURNING|REVOKE|RIGHT|ROLLBACK|ROW|ROWS|SELECT|SERIAL|SET|SHOW|SIMILAR|SOME|TABLE|THEN|TO|TRANSACTION|TRUNCATE|UNION|UNIQUE|UNNEST|UPDATE|USING|VALUES|VARIADIC|VIEW|WHEN|WHERE|WITH|WORK|WINDOW|LANGUAGE|VOLATILE|STABLE|IMMUTABLE|STRICT|SECURITY|DEFINER|INVOKER|EXECUTE|USAGE|SMALLINT|DECIMAL|NUMERIC|REAL|DOUBLE PRECISION|VARCHAR|TEXT|DATE|TIME|TIMESTAMP|INTERVAL|UUID|JSON|XML)\b/i, number: /\b-?(0x)?\d*\.?[\da-f]+\b/,
    operator: /:=|::|\|\||->>|->|@>|<@|&&|\?|:=|->>|->|\+|-|\*|\/|%|~|!=|<>|<=|>=|<|>|\^|&|\||!|\b(?:IS DISTINCT FROM|IS NOT DISTINCT FROM|LIKE|ILIKE|NOT|SIMILAR TO|IS|IN|ANY|ALL|AND|OR|BETWEEN|OVERLAPS|UNIQUE)\b/i,
    punctuation: /[;[\]()`,.]/
};

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('sqlInput');
    const container = document.getElementById('group_code');

    const mirror = document.createElement('pre');
    mirror.classList.add('mirror');
    container.appendChild(mirror);

    // Функция копирования стилей
    const copyStyles = () => {
        const styles = window.getComputedStyle(textarea);
        ['border', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'padding', 'borderRadius', 'wordWrap', 'whiteSpace']
            .forEach((prop) => mirror.style[prop] = styles[prop]);
        mirror.style.borderColor = 'transparent';
    };

    // Функция синхронизации текста с подсветкой
    const syncMirror = () => {
        // + \n чтобы рассинхрона не было с mirror
        mirror.innerHTML = Prism.highlight(textarea.value + "\n", Prism.languages.sql, 'sql');
        mirror.scrollTop = textarea.scrollTop;
    };

    // Функция вставки текста через execCommand
    const insertText = (text) => {
        document.execCommand('insertText', false, text);
    };

    // Функция комментирования строк через --
    const toggleLineComment = () => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // Определим строки с курсором и выделением
        const beforeCursor = value.substring(0, start);
        console.log("beforeCursor:", beforeCursor);
        // const afterCursor = value.substring(start, end);
        const afterSelection = value.substring(end);

        // Определяем начало и конец выделенных строк
        const lineStart = beforeCursor.lastIndexOf('\n') + 1;
        const lineEnd = afterSelection.indexOf('\n') !== -1 ? end + afterSelection.indexOf('\n') : value.length;

        // Получаем все строки в выделенной области
        const selectedLines = value.substring(lineStart, lineEnd).split('\n');

        // Проверяем, закомментированы ли все строки
        const allCommented = selectedLines.every(line => line.trim().startsWith('--'));

        let newText = '';
        let commentOffset = 0;

        if (allCommented) {
            // Если все строки закомментированы, убираем комментарии
            newText = selectedLines.map(line => line.replace(/^--\s?/, '')).join('\n');
            commentOffset = -3;  // Сдвиг назад на 3 символа (длина "-- ")
        } else {
            // Если не все строки закомментированы, добавляем комментарии
            newText = selectedLines.map(line => `-- ${line}`).join('\n');
            commentOffset = 3;  // Сдвиг вперёд на 3 символа (добавляем "-- ")
        }

        // Считаем количество строк
        const numLines = selectedLines.length;

        // Заменяем старый текст новым
        textarea.setSelectionRange(lineStart, lineEnd);
        insertText(newText);

        // Обновляем позицию курсора, чтобы сохранить исходное выделение
        const newStart = start + commentOffset;
        const newEnd = end + commentOffset * numLines;

        textarea.setSelectionRange(newStart, newEnd); // Сохраняем выделение
        syncMirror(); // Обновляем подсветку
    };

    // Событие для однострочного комментирования -- 
    textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault(); // Предотвращаем стандартное поведение
            toggleLineComment(); // Комментируем строки через --
        }

        // Обработка нажатия Tab для вставки 4 пробелов
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault(); // Предотвращаем стандартное поведение (переключение между элементами)

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Вставляем 4 пробела на место курсора или заменяем выделенный текст
            insertText('    ');

            // Обновляем позицию курсора после вставки
            textarea.setSelectionRange(start + 4, start + 4); // Ставим курсор после вставки 4 пробелов
        }

        // Обработка Shift + Tab для удаления 4 пробелов перед курсором
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault(); // Предотвращаем стандартное поведение

            const start = textarea.selectionStart;
            const value = textarea.value;

            // Определяем начало текущей строки (или предыдущей)
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineBeforeCursor = value.substring(lineStart, start);

            // Проверяем, есть ли перед курсором 4 пробела
            if (lineBeforeCursor.endsWith('    ')) {
                // Удаляем 4 пробела перед курсором
                textarea.setSelectionRange(lineStart + lineBeforeCursor.length - 4, start);
                insertText(''); // Заменяем 4 пробела на пустоту

                // Обновляем позицию курсора после удаления пробелов
                textarea.setSelectionRange(start - 4, start - 4);
            }
        }
    });

    // Подписка на события
    textarea.addEventListener('input', syncMirror);
    textarea.addEventListener('scroll', () => {
        mirror.scrollTop = textarea.scrollTop;   // Синхронизация вертикальной прокрутки
        mirror.scrollLeft = textarea.scrollLeft; // Синхронизация горизонтальной прокрутки
        syncMirror();                            // Обновление подсветки
    });


    // Инициализация
    copyStyles();
    syncMirror();
});
