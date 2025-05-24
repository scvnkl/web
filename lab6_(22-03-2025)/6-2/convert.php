<?php
header('Content-Type: text/plain');

function digitToWord($number) {
    $words = [
        0 => 'Ноль',
        1 => 'Один',
        2 => 'Два',
        3 => 'Три',
        4 => 'Четыре',
        5 => 'Пять',
        6 => 'Шесть',
        7 => 'Семь',
        8 => 'Восемь',
        9 => 'Девять'
    ];
    
    if (strlen($number) === 1 && ctype_digit($number) && isset($words[$number])) {
        return $words[$number];
    }
    return 'Ошибка: введите одну цифру от 0 до 9';
}

$number = $_POST['number'] ?? '';
echo digitToWord($number);
?>