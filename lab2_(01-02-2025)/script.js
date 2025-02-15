let counter = 0;

let buttonElement = document.getElementById("pickme");

function onMouseDown() {
    counter++;
    console.log("Вы кликнули " + counter + " раз");
    
    if (counter % 10 === 0) {
        buttonElement.style.backgroundColor = "red";
    } else if (counter % 5 === 0) {
        buttonElement.style.backgroundColor = "blue";
    } else {
        buttonElement.style.backgroundColor = ""; // Сброс цвета
    }
}

buttonElement.addEventListener("mousedown", onMouseDown);
