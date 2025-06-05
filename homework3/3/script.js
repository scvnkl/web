document.getElementById('divisorsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const number = parseInt(document.getElementById('number').value);
    const resultElement = document.getElementById('result');
    
    if (isNaN(number) || number < 2) {
        resultElement.innerHTML = '<p class="error">Пожалуйста, введите натуральное число больше 1</p>';
        console.log("Неверный ввод: число должно быть больше 1");
        return;
    }
    
    const divisors = findDivisors(number);
    
    if (divisors.length === 0) {
        resultElement.innerHTML = `<h3>Число ${number} простое</h3><p>Нет делителей кроме 1 и самого себя</p>`;
        console.log(`Число ${number} простое. Нет делителей кроме 1 и самого себя`);
    } else {
        resultElement.innerHTML = `
            <h3>Делители числа ${number}:</h3>
            <div class="divisors-list">
                ${divisors.map(d => `<span class="divisor">${d}</span>`).join('')}
            </div>
            <p>Найдено ${divisors.length} делителей</p>
        `;
        console.log(`Делители числа ${number}:`, divisors);
    }
});

function findDivisors(num) {
    const divisors = [];
    const sqrtNum = Math.sqrt(num);
    
    for (let i = 2; i <= sqrtNum; i++) {
        if (num % i === 0) {
            divisors.push(i);
            // Добавляем парный делитель (если он не равен текущему)
            if (i !== num / i) {
                divisors.push(num / i);
            }
        }
    }
    
    // Сортируем делители по возрастанию
    return divisors.sort((a, b) => a - b);
}