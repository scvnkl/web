<?php
header('Content-Type: text/plain; charset=utf-8');

function factorial($n) {
    // Базовый случай рекурсии
    if ($n === 0 || $n === 1) {
        return 1;
    }
    // Рекурсивный случай
    return $n * factorial($n - 1);
}

$number = isset($_POST['number']) ? (int)$_POST['number'] : null;

if ($number === null) {
    echo "Ошибка: не указано число";
    exit;
}

if ($number < 0) {
    echo "Ошибка: факториал отрицательного числа не определен";
    exit;
}

if ($number > 20) {
    echo "Ошибка: для чисел больше 20 результат будет слишком большим";
    exit;
}

$result = factorial($number);
echo "Факториал числа {$number} = {$result}";
?>