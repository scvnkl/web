<?php
header('Content-Type: text/plain; charset=utf-8');

function parseDate($dateStr) {
    $cleaned = trim($dateStr);
    $cleaned = str_replace(['-', '/'], '.', $cleaned);
    
    $parts = explode('.', $cleaned);
    if (count($parts) !== 3) {
        return null;
    }
    
    if (strlen($parts[0]) === 4) {
        // Формат ГГГГ.ММ.ДД
        $year = (int)$parts[0];
        $month = (int)$parts[1];
        $day = (int)$parts[2];
    } elseif (strlen($parts[2]) === 4 || (int)$parts[2] > 31) {
        // Формат ДД.ММ.ГГГГ
        $day = (int)$parts[0];
        $month = (int)$parts[1];
        $year = (int)$parts[2];
    } else {
        // Формат ДД.ММ.ГГ (двузначный год)
        $day = (int)$parts[0];
        $month = (int)$parts[1];
        $year = (int)$parts[2];
        $year += $year < 50 ? 2000 : 1900;
    }
    
    return [$day, $month, $year];
}

function isValidDate($day, $month, $year) {
    if ($month < 1 || $month > 12) return false;
    if ($day < 1 || $day > 31) return false;
    
    $daysInMonth = [
        31, // Январь
        ($year % 4 == 0 && ($year % 100 != 0 || $year % 400 == 0)) ? 29 : 28, // Февраль
        31, // Март
        30, // Апрель
        31, // Май
        30, // Июнь
        31, // Июль
        31, // Август
        30, // Сентябрь
        31, // Октябрь
        30, // Ноябрь
        31  // Декабрь
    ];
    
    return $day <= $daysInMonth[$month - 1];
}

function getZodiacSign($dateStr) {
    $parsed = parseDate($dateStr);
    if (!$parsed) {
        return "Ошибка: не удалось распознать дату. Используйте форматы: ДД.ММ.ГГГГ, ГГГГ-ММ-ДД или ДД/ММ/ГГ";
    }
    
    list($day, $month, $year) = $parsed;
    
    if (!isValidDate($day, $month, $year)) {
        return "Ошибка: некорректная дата";
    }

    $signs = [
        ['name' => 'Овен',      'start' => [3, 21], 'end' => [4, 20]],
        ['name' => 'Телец',     'start' => [4, 21], 'end' => [5, 20]],
        ['name' => 'Близнецы',  'start' => [5, 21], 'end' => [6, 21]],
        ['name' => 'Рак',       'start' => [6, 22], 'end' => [7, 22]],
        ['name' => 'Лев',       'start' => [7, 23], 'end' => [8, 22]],
        ['name' => 'Дева',      'start' => [8, 23], 'end' => [9, 22]],
        ['name' => 'Весы',      'start' => [9, 23], 'end' => [10, 22]],
        ['name' => 'Скорпион',  'start' => [10, 23], 'end' => [11, 22]],
        ['name' => 'Стрелец',   'start' => [11, 23], 'end' => [12, 21]],
        ['name' => 'Козерог',   'start' => [12, 22], 'end' => [1, 19]],
        ['name' => 'Водолей',   'start' => [1, 20], 'end' => [2, 18]],
        ['name' => 'Рыбы',      'start' => [2, 19], 'end' => [3, 20]]
    ];

    // Особый случай для Козерога
    if (($month == 12 && $day >= 22) || ($month == 1 && $day <= 19)) {
        return 'Козерог';
    }

    foreach ($signs as $sign) {
        if (
            ($month == $sign['start'][0] && $day >= $sign['start'][1]) ||
            ($month == $sign['end'][0] && $day <= $sign['end'][1])
        ) {
            return $sign['name'];
        }
    }

    return "Не удалось определить знак зодиака";
}

$date = $_POST['date'] ?? '';
echo getZodiacSign($date);
?>