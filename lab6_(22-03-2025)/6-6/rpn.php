<?php
header('Content-Type: text/plain; charset=utf-8');

function evaluateRPN($expression) {
    $stack = [];
    $tokens = explode(' ', trim($expression));
    
    foreach ($tokens as $token) {
        if (is_numeric($token)) {
            array_push($stack, (int)$token);
        } else {
            if (count($stack) < 2) {
                return "Ошибка: недостаточно операндов для операции '$token'";
            }
            
            $b = array_pop($stack);
            $a = array_pop($stack);
            
            switch ($token) {
                case '+':
                    array_push($stack, $a + $b);
                    break;
                case '-':
                    array_push($stack, $a - $b);
                    break;
                case '*':
                    array_push($stack, $a * $b);
                    break;
                default:
                    return "Ошибка: неизвестная операция '$token'";
            }
        }
    }
    
    if (count($stack) !== 1) {
        return "Ошибка: в выражении остались лишние числа";
    }
    
    return $stack[0];
}

$expression = $_POST['expression'] ?? '';
$result = evaluateRPN($expression);

if (is_numeric($result)) {
    echo "Результат: " . $result;
} else {
    echo $result;
}
?>