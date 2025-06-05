document.getElementById('quadraticForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем коэффициенты из формы
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    // Вычисляем корни
    const result = solveQuadraticEquation(a, b, c);
    
    // Выводим результат
    document.getElementById('result').textContent = result;
    console.log(result); // Также выводим в консоль
});

function solveQuadraticEquation(a, b, c) {
    // Проверка на линейное уравнение (a = 0)
    if (a === 0) {
        if (b === 0) {
            return c === 0 
                ? "Уравнение имеет бесконечное множество решений"
                : "Уравнение не имеет решений";
        }
        const x = -c / b;
        return `Уравнение линейное. Корень: x = ${x.toFixed(2)}`;
    }
    
    // Вычисляем дискриминант
    const D = b * b - 4 * a * c;
    let result = `Дискриминант D = ${D.toFixed(2)}\n`;
    
    // Анализируем дискриминант
    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        result += `Два действительных корня:\n`;
        result += `x₁ = ${x1.toFixed(2)}\n`;
        result += `x₂ = ${x2.toFixed(2)}`;
    } 
    else if (D === 0) {
        const x = -b / (2 * a);
        result += `Один действительный корень (кратности 2):\n`;
        result += `x = ${x.toFixed(2)}`;
    } 
    else {
        const realPart = (-b / (2 * a)).toFixed(2);
        const imagPart = (Math.sqrt(-D) / (2 * a)).toFixed(2);
        result += `Два комплексных корня:\n`;
        result += `x₁ = ${realPart} + ${imagPart}i\n`;
        result += `x₂ = ${realPart} - ${imagPart}i`;
    }
    
    return result;
}