// Находим элементы DOM
const objInput = document.getElementById('objInput');
const funcInput = document.getElementById('funcInput');
const processBtn = document.getElementById('processBtn');
const sourceObjElement = document.getElementById('sourceObj');
const resultElement = document.getElementById('result');

// Функция для применения callback к каждому значению объекта
function mapObject(obj, callback) {
    // Создаем новый объект для результатов
    const result = {};
    
    // Перебираем все ключи исходного объекта
    for (const key in obj) {
        // Проверяем, что ключ принадлежит самому объекту (а не его прототипу)
        if (obj.hasOwnProperty(key)) {
            // Применяем callback к текущему значению и сохраняем результат
            result[key] = callback(obj[key]);
        }
    }
    
    return result;
}

// Обработчик клика по кнопке
processBtn.addEventListener('click', function() {
    try {
        // Парсим введенный объект из JSON
        const obj = JSON.parse(objInput.value);
        
        // Проверяем, что введен именно объект
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw new Error('Введите валидный объект');
        }
        
        // Пробуем создать функцию из введенной строки
        // ВНИМАНИЕ: В реальном приложении это может быть небезопасно!
        // Здесь только для учебных целей
        const callback = new Function('x', `return (${funcInput.value})(x)`);
        
        // Применяем нашу функцию mapObject
        const result = mapObject(obj, callback);
        
        // Выводим исходный объект и результат
        sourceObjElement.textContent = JSON.stringify(obj, null, 2);
        resultElement.textContent = JSON.stringify(result, null, 2);
        
        // Выводим в консоль для отладки
        console.log('Исходный объект:', obj);
        console.log('Результат:', result);
    } catch (error) {
        // В случае ошибки выводим сообщение
        resultElement.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        console.error('Ошибка:', error);
    }
});