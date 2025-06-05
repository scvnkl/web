// Исходный массив пользователей
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

// Находим элементы DOM
const processBtn = document.getElementById('processBtn');
const sourceArrayElement = document.getElementById('sourceArray');
const resultElement = document.getElementById('result');

// При загрузке страницы показываем исходный массив
document.addEventListener('DOMContentLoaded', function() {
    // Выводим исходный массив в красивом формате JSON
    sourceArrayElement.textContent = JSON.stringify(users, null, 2);
});

// Обработчик клика по кнопке
processBtn.addEventListener('click', function() {
    // Используем метод map для преобразования массива
    // map создает новый массив, преобразуя каждый элемент исходного массива
    const names = users.map(function(user) {
        // Для каждого объекта пользователя возвращаем только его имя
        return user.name;
    });
    
    // Альтернативный вариант с стрелочной функцией:
    // const names = users.map(user => user.name);
    
    // Выводим результат в формате JSON
    resultElement.textContent = JSON.stringify(names, null, 2);
    
    // Выводим результат в консоль
    console.log('Имена пользователей:', names);
});