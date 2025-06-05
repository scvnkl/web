document.getElementById('primeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = document.getElementById('input').value.trim();
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    
    try {
        let numbers;
        if (input.includes(',')) {
            numbers = input.split(',').map(num => {
                const parsed = parseInt(num.trim());
                if (isNaN(parsed)) throw new Error(`"${num.trim()}" не является числом`);
                return parsed;
            });
        } else {
            const parsed = parseInt(input);
            if (isNaN(parsed)) throw new Error(`"${input}" не является числом`);
            numbers = parsed;
        }
        
        const result = isPrimeNumber(numbers);
        
        if (Array.isArray(numbers)) {
            resultElement.innerHTML = result.map(item => {
                const cls = item.isPrime ? 'prime' : 'not-prime';
                return `<p class="${cls}">${item.number} ${item.isPrime ? 'простое' : 'не простое'} число</p>`;
            }).join('');
        } else {
            const cls = result.isPrime ? 'prime' : 'not-prime';
            resultElement.innerHTML = `<p class="${cls}">${result.number} ${result.isPrime ? 'простое' : 'не простое'} число</p>`;
        }
        
        console.log(result);
    } catch (error) {
        resultElement.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        console.error('Ошибка:', error.message);
    }
});

function isPrimeNumber(input) {
    if (typeof input === 'number') {
        return checkSingleNumber(input);
    } else if (Array.isArray(input)) {
        return input.map(num => checkSingleNumber(num));
    } else {
        throw new Error('Функция принимает только число или массив чисел');
    }
}

function checkSingleNumber(num) {
    // Проверка что это целое число
    if (!Number.isInteger(num)) {
        throw new Error(`${num} не является целым числом`);
    }
    
    // Проверка на отрицательные числа и 0,1
    if (num < 2) {
        return { number: num, isPrime: false };
    }
    
    // Проверка на 2 и 3
    if (num === 2 || num === 3) {
        return { number: num, isPrime: true };
    }
    
    // Исключаем четные числа
    if (num % 2 === 0) {
        return { number: num, isPrime: false };
    }
    
    // Проверяем делители до квадратного корня из числа
    const sqrtNum = Math.sqrt(num);
    for (let i = 3; i <= sqrtNum; i += 2) {
        if (num % i === 0) {
            return { number: num, isPrime: false };
        }
    }
    
    return { number: num, isPrime: true };
}