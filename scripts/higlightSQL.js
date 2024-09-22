/* 
подсветка sql кода самодельная | при подключении сама срабатывает, но можно highlightEl()
*/

let colored = document.querySelector("#colored");
let sqlInput = document.querySelector("#sqlInput");

const sqlKeywords = ["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP", "ALTER", "TABLE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "ON", "AND", "OR", "NOT", "NULL", "AS", "DISTINCT", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL"];

function getHighlight(text) {
  const regex = new RegExp(`\\b(${sqlKeywords.join('|')})\\b`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>')
             .replace(/(--.*$)/gm, '<span class="comment">$1</span>')
             .replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>');
}
function highlightEl() {
  colored.innerHTML = getHighlight(sqlInput.innerHTML);
}
sqlInput.addEventListener("input", highlightEl);
highlightEl();


// resize окна с подсветкой по ширине | иначе подсветка размер div с кодом не узнает и не повторит его
document.addEventListener('DOMContentLoaded', () => {
  function updateTargetSize() {
      const source = document.getElementById('sqlInput');
      const target = document.getElementById('colored');

      // Получаем размеры элемента source, включая padding и border
      const sourceRect = source.getBoundingClientRect();

      // Получаем вычисленные стили для нахождения значений padding
      const sourceStyles = window.getComputedStyle(source);

      // Вычисляем ширину и высоту без учета padding
      const sourceWidth = sourceRect.width - parseFloat(sourceStyles.paddingLeft) - parseFloat(sourceStyles.paddingRight);

      // Применяем вычисленные размеры к элементу target
      target.style.width = `${sourceWidth}px`;
  }

  // Первоначальное обновление размеров
  updateTargetSize();

  // Обновление размеров при изменении размеров окна
  window.addEventListener('resize', updateTargetSize);
});