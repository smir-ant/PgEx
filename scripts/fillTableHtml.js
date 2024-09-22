/*
заполнение таблички html данными из запроса | при подключении вызвать, fillTableHtml()
*/

function fillTableHtml(rows, fields) {
    dataTable.innerHTML = "<thead></thead><tbody></tbody>";  // очистка таблицы
    // th
    dataTable.querySelector("thead").innerHTML = `<tr>${fields.map(field => `<th>${field.name}</th>`).join('')}</tr>`;
    // td
    rows.forEach(row => {
        const rowHtml = `<tr>${fields.map(field => `<td>${row[field.name]}</td>`).join('')}</tr>`;
        dataTable.querySelector("tbody").innerHTML += rowHtml;
    });
}