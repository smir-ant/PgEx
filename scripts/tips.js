/*
Обработка подсказок (? в кружочках) | при подключении само работает
*/

// Функция для показа подсказки
function showTooltip(element, message) {
    let tipText = element.nextElementSibling;  // возвращает следующий DOM элемент

    // Если элемент tipText не существует (+чтобы это был не рандомный div)
    if (!tipText || !tipText.classList.contains('tipText')) {
        // создаем
        tipText = document.createElement('div');
        tipText.classList.add('tipText');
        element.insertAdjacentElement('afterend', tipText); // Вставляем после элемента
    }

    // Устанавливаем текст подсказки и показываем её
    tipText.innerHTML = message;  // строго innerHTML, а не textContent. ибо мне нужна поддержка тегов :)
    tipText.style.opacity = '0';  // сначала скрываем, чтобы подсказка плавно проявилась (opacity = 1 в конце функции)

    const bounding = element.getBoundingClientRect();
    /* объект с информацией о положении и размере элемента относительно текущего окна браузера
        top: расстояние от верхнего края окна до верхнего края элемента.
        right: расстояние от левого края окна до правого края элемента.
        bottom: расстояние от верхнего края окна до нижнего края элемента.
        left: расстояние от левого края окна до левого края элемента.
        width: ширина элемента.
        height: высота элемента. 
    */
    let left = window.scrollX + bounding.left + (bounding.width / 2) - (tipText.offsetWidth / 2);
    let top = window.scrollY + bounding.top - tipText.offsetHeight - 10;

    // Проверка на выход за пределы экрана (по горизонтали)
    if (left < 0) {
        left = 10; // Минимальный отступ слева
    } else if (left + tipText.offsetWidth > window.innerWidth) {
        left = window.innerWidth - tipText.offsetWidth - 10; // Максимальный отступ справа
    }

    // Проверка на выход за пределы экрана (по вертикали)
    if (top < 0) {
        top = bounding.bottom + window.scrollY + 10; // Если подсказка выходит сверху, показываем её снизу
    }

    // Устанавливаем позицию подсказки
    tipText.style.left = `${left}px`;
    tipText.style.top = `${top}px`;

    tipText.style.opacity = '1';  // анимированно-плавно проявляем

}

// Функция для скрытия подсказки
function hideTooltip(element) {
    let tipText = element.nextElementSibling;
    if (tipText && tipText.classList.contains('tipText')) {
        tipText.style.opacity = '0';
    }
}

// Навешиваем события на все элементы с классом .tip
document.querySelectorAll('.tip').forEach(tip => {
    tip.addEventListener('mouseenter', function() {
        const message = this.getAttribute('data-tip');
        showTooltip(this, message);
    });

    tip.addEventListener('mouseleave', function() {
        hideTooltip(this);
    });
});