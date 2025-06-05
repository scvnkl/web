document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const arrayInput = document.getElementById('array').value.trim();
    const elementInput = document.getElementById('element').value.trim();
    const resultElement = document.getElementById('result');
    
    try {
        const array = arrayInput.split(',').map(item => {
            const trimmed = item.trim();
            // Определяем тип массива
            if (!isNaN(trimmed) && trimmed !== '') {
                return Number(trimmed);
            }
            return trimmed;
        });
        
        checkArrayTypeUniformity(array);
        
        if (!isArraySorted(array)) {
            throw new Error('Массив должен быть отсортирован');
        }
        
        let element;
        if (!isNaN(elementInput)) {
            element = Number(elementInput);
        } else {
            element = elementInput;
        }
        
        // Выполняем бинарный поиск
        const position = binarySearch(array, element);
        
        // Выводим результат
        if (position !== -1) {
            resultElement.innerHTML = `
                <p class="success">Элемент найден на позиции: ${position}</p>
                <div class="array-display">
                    Массив: [${array.join(', ')}]<br>
                    Искомый элемент: ${element}
                </div>
            `;
            console.log(`Элемент ${element} найден на позиции ${position}`);
        } else {
            resultElement.innerHTML = `
                <p class="error">Элемент отсутствует в массиве</p>
                <div class="array-display">
                    Массив: [${array.join(', ')}]<br>
                    Искомый элемент: ${element}
                </div>
            `;
            console.log(`Элемент ${element} отсутствует в массиве`);
        }
    } catch (error) {
        resultElement.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        console.error('Ошибка:', error.message);
    }
});

function binarySearch(array, element) {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] === element) {
            return mid;
        } else if (array[mid] < element) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Элемент не найден
}

function checkArrayTypeUniformity(array) {
    if (array.length === 0) return;
    
    const firstType = typeof array[0];
    
    for (let i = 1; i < array.length; i++) {
        if (typeof array[i] !== firstType) {
            throw new Error('Все элементы массива должны быть одного типа');
        }
    }
}

function isArraySorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}