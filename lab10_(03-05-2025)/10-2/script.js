// Обработчик события отправки формы
document.getElementById('vowelForm').addEventListener('submit', function(e) {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    e.preventDefault();
    
    // Получаем текст из текстового поля
    const text = document.getElementById('text').value;
    // Находим элемент для вывода результата
    const resultElement = document.getElementById('result');
    
    try {
        // Проверяем, что текст не пустой
        if (!text.trim()) {
            throw new Error('Введите текст для анализа');
        }
        
        // Вызываем функцию подсчета гласных
        const { count, vowels } = countVowels(text);
        
        // Формируем сообщение с результатом
        resultElement.innerHTML = `
            <p>Найдено <span class="vowel-count">${count}</span> гласных букв:</p>
            <p class="vowel-letters">${vowels.join(', ')}</p>
        `;
        
        // Выводим результат в консоль
        console.log(`Найдено ${count} гласных: ${vowels.join(', ')}`);
    } catch (error) {
        // В случае ошибки выводим сообщение
        resultElement.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        console.error('Ошибка:', error.message);
    }
});

/**
 * Функция для подсчета гласных букв в строке
 * @param {string} str - строка для анализа
 * @returns {Object} - объект с количеством гласных и списком найденных гласных
 */
function countVowels(str) {
    // Создаем массив всех русских гласных букв (строчные и заглавные)
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я',
                    'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
    
    // Массив для хранения найденных гласных
    const foundVowels = [];
    
    // Перебираем каждый символ в строке
    for (const char of str) {
        // Проверяем, есть ли текущий символ в массиве гласных
        if (vowels.includes(char)) {
            // Если гласная найдена, добавляем ее в массив
            foundVowels.push(char);
        }
    }
    
    // Возвращаем объект с результатами:
    // count - общее количество гласных
    // vowels - массив найденных гласных
    return {
        count: foundVowels.length,
        vowels: foundVowels
    };
}