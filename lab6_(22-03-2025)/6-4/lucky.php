<?php
header('Content-Type: text/html; charset=utf-8');

function isLucky($number) {
    $digits = str_split($number);
    return array_sum(array_slice($digits, 0, 3)) == array_sum(array_slice($digits, 3, 3));
}

function findLuckyTickets($start, $end) {
    $result = [];
    
    if (strlen($start) != 6 || strlen($end) != 6) {
        return "Ошибка: номера должны быть шестизначными";
    }
    
    $startNum = (int)$start;
    $endNum = (int)$end;
    
    if ($startNum > $endNum) {
        return "Ошибка: начальный номер должен быть меньше конечного";
    }
    
    // Ищем счастливые билеты
    for ($num = $startNum; $num <= $endNum; $num++) {
        $numStr = str_pad($num, 6, '0', STR_PAD_LEFT);
        if (isLucky($numStr)) {
            $result[] = $numStr;
        }
    }
    
    return $result;
}

$start = $_POST['start'] ?? '';
$end = $_POST['end'] ?? '';

// Находим счастливые билеты
$luckyTickets = findLuckyTickets($start, $end);

if (is_array($luckyTickets)) {
    if (empty($luckyTickets)) {
        echo "В указанном диапазоне счастливых билетов не найдено";
    } else {
        echo "Счастливые билеты:\n" . implode("\n", $luckyTickets);
    }
} else {
    echo $luckyTickets; // Выводим сообщение об ошибке
}
?>