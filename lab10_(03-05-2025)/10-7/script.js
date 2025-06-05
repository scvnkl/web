// Находим элементы DOM
const passwordForm = document.getElementById('passwordForm');
const lengthInput = document.getElementById('length');
const passwordResult = document.getElementById('passwordResult');
const copyBtn = document.getElementById('copyBtn');

// Символы для генерации пароля
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Обработчик отправки формы
passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const length = parseInt(lengthInput.value);
    
    // Генерируем пароль
    const password = generatePassword(length);
    
    // Показываем пароль
    passwordResult.textContent = password;
    
    // Делаем кнопку копирования видимой
    copyBtn.style.display = 'block';
});

// Обработчик кнопки копирования
copyBtn.addEventListener('click', function() {
    // Копируем пароль в буфер обмена
    navigator.clipboard.writeText(passwordResult.textContent)
        .then(() => showNotification('Пароль скопирован!'))
        .catch(err => console.error('Ошибка копирования:', err));
});

// Функция генерации пароля
function generatePassword(length) {
    // Проверяем минимальную длину
    if (length < 4) {
        throw new Error('Длина пароля должна быть не менее 4 символов');
    }
    
    let password = '';
    const allChars = lowercaseLetters + uppercaseLetters + numbers + specialChars;
    
    // Гарантируем, что пароль содержит хотя бы по одному символу из каждой категории
    password += getRandomChar(lowercaseLetters); // маленькая буква
    password += getRandomChar(uppercaseLetters); // большая буква
    password += getRandomChar(numbers);         // цифра
    password += getRandomChar(specialChars);    // спецсимвол
    
    // Добавляем остальные символы случайным образом
    for (let i = 4; i < length; i++) {
        password += getRandomChar(allChars);
    }
    
    // Перемешиваем символы пароля для большей случайности
    return shuffleString(password);
}

// Функция для получения случайного символа из строки
function getRandomChar(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

// Функция для перемешивания символов в строке
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // меняем местами
    }
    return arr.join('');
}

// Функция для показа уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Убираем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}