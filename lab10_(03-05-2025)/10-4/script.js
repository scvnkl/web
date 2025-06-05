// Обработчик события отправки формы
document.getElementById('mergeForm').addEventListener('submit', function(e) {
    // Предотвращаем стандартное поведение формы
    e.preventDefault();
    
    // Получаем значения из полей ввода
    const obj1Str = document.getElementById('obj1').value;
    const obj2Str = document.getElementById('obj2').value;
    const resultElement = document.getElementById('result');
    
    try {
        // Парсим JSON строки в объекты JavaScript
        // JSON.parse преобразует строку в формате JSON в объект
        const obj1 = JSON.parse(obj1Str);
        const obj2 = JSON.parse(obj2Str);
        
        // Проверяем, что полученные значения действительно объекты
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            throw new Error('Введите валидные объекты');
        }
        
        // Объединяем объекты с помощью нашей функции
        const merged = mergeObjects(obj1, obj2);
        
        // Выводим результат в красивом JSON формате с отступами
        resultElement.innerHTML = `<pre>${JSON.stringify(merged, null, 2)}</pre>`;
        
        // Выводим результат в консоль для отладки
        console.log('Объединенный объект:', merged);
    } catch (error) {
        // В случае ошибки выводим сообщение
        resultElement.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        console.error('Ошибка:', error);
    }
});

/**
 * Функция для объединения двух объектов
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект
 * @returns {Object} - новый объект, объединяющий свойства обоих объектов
 */
function mergeObjects(obj1, obj2) {
    // Создаем новый объект, используя spread оператор (...)
    // Сначала копируем все свойства из первого объекта
    // Затем копируем все свойства из второго объекта (перезаписывая совпадающие ключи)
    return {
        ...obj1, // Копируем все свойства из obj1
        ...obj2  // Затем копируем все свойства из obj2 (приоритет у obj2)
    };
    
    // Альтернативный вариант с Object.assign():
    // return Object.assign({}, obj1, obj2);
}