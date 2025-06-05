// Вешаем обработчик события на форму - когда пользователь нажмет кнопку "Подсчитать"
document.getElementById('countForm').addEventListener('submit', function(e) {
    // Отменяем стандартное поведение формы (чтобы страница не перезагружалась)
    e.preventDefault();
    
    // Получаем текст, который ввел пользователь в поле ввода
    const input = document.getElementById('elements').value;
    // Находим на странице блок, куда будем выводить результат
    const resultElement = document.getElementById('result');
    
    try {
        // Разбиваем введенную строку по запятым на отдельные элементы
        // и очищаем каждый элемент от лишних пробелов с помощью trim()
        const elements = input.split(',').map(item => item.trim());
        
        // Вызываем нашу основную функцию подсчета элементов
        const result = countElements(elements);
        
        // Показываем результат на странице
        displayResult(result, resultElement);
        
        // Дополнительно выводим результат в консоль для отладки
        console.log(result);
    } catch (error) {
        // Если произошла ошибка - показываем сообщение об ошибке
        resultElement.innerHTML = `<p>Ошибка: ${error.message}</p>`;
        console.error(error);
    }
});

/**
 * Функция подсчета количества каждого элемента в массиве
 * @param {Array} arr - массив элементов для подсчета
 * @returns {Object} - объект с количеством повторений каждого элемента
 */
function countElements(arr) {
    // Создаем пустой объект, где будем хранить результаты:
    // ключ - элемент массива, значение - сколько раз встретился
    const result = {};
    
    // Перебираем каждый элемент массива
    for (const item of arr) {
        // Преобразуем элемент в строку (чтобы числа и строки считались одинаково)
        const key = String(item);
        
        // Если элемент уже есть в объекте - увеличиваем счетчик на 1
        // Если элемента нет - инициализируем значением 1
        // Используем оператор || (ИЛИ) для задания значения по умолчанию 0
        result[key] = (result[key] || 0) + 1;
    }
    
    // Возвращаем объект с результатами подсчета
    return result;
}

/**
 * Функция отображения результатов на странице
 * @param {Object} result - объект с результатами подсчета
 * @param {HTMLElement} element - DOM-элемент, куда вставляем результат
 */
function displayResult(result, element) {
    // Начинаем формировать HTML для вывода
    let html = '<h3>Результат:</h3>';
    
    // Перебираем все ключи в объекте результатов
    for (const key in result) {
        // Для каждого ключа добавляем строку в формате "ключ: значение"
        html += `<div class="item">"${key}": ${result[key]}</div>`;
    }
    
    // Вставляем сформированный HTML в элемент на странице
    element.innerHTML = html;
}