// Находим элементы DOM
const arrayForm = document.getElementById('arrayForm');
const arrayInput = document.getElementById('arrayInput');
const sourceArrayElement = document.getElementById('sourceArray');
const afterMapElement = document.getElementById('afterMap');
const afterFilterElement = document.getElementById('afterFilter');

// Обработчик отправки формы
arrayForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // Получаем введенные данные и преобразуем в массив чисел
        const inputText = arrayInput.value;
        const numbers = inputText.split(',')
            .map(item => parseFloat(item.trim()))
            .filter(item => !isNaN(item)); // Удаляем NaN значения
        
        // Проверяем, что массив не пустой
        if (numbers.length === 0) {
            throw new Error('Введите корректные числа');
        }
        
        // Показываем исходный массив
        sourceArrayElement.textContent = `[${numbers.join(', ')}]`;
        
        // Применяем map - умножаем каждый элемент на 3
        const mappedArray = numbers.map(num => num * 3);
        afterMapElement.textContent = `[${mappedArray.join(', ')}]`;
        
        // Применяем filter - оставляем только элементы > 10
        const filteredArray = mappedArray.filter(num => num > 10);
        afterFilterElement.textContent = `[${filteredArray.join(', ')}]`;
        
        // Выводим в консоль для отладки
        console.log('Исходный массив:', numbers);
        console.log('После map:', mappedArray);
        console.log('После filter:', filteredArray);
    } catch (error) {
        // В случае ошибки выводим сообщение
        sourceArrayElement.innerHTML = `<span class="error">${error.message}</span>`;
        afterMapElement.textContent = '';
        afterFilterElement.textContent = '';
        console.error('Ошибка:', error);
    }
});