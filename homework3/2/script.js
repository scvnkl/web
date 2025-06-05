document.getElementById('primeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const number = parseInt(document.getElementById('number').value);
    const resultElement = document.getElementById('result');
    
    if (isNaN(number) || number < 2) {
        resultElement.textContent = "Пожалуйста, введите число больше 1";
        resultElement.className = 'not-prime';
        console.log("Неверный ввод: число должно быть больше 1");
        return;
    }
    
    const isPrime = checkPrime(number);
    
    if (isPrime) {
        resultElement.textContent = `${number} - простое число`;
        resultElement.className = 'prime';
        console.log(`${number} - простое число`);
    } else {
        resultElement.textContent = `${number} - составное число`;
        resultElement.className = 'not-prime';
        console.log(`${number} - составное число`);
    }
});

function checkPrime(num) {
    // Проверка на 2 и 3
    if (num === 2 || num === 3) return true;
    
    // Исключаем четные числа и числа меньше 2
    if (num % 2 === 0 || num < 2) return false;
    
    // Проверяем делители до квадратного корня из числа
    const sqrtNum = Math.sqrt(num);
    for (let i = 3; i <= sqrtNum; i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}