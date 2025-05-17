<?php
header('Content-Type: text/plain'); // Указываем, что возвращаем простой текст

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $year = isset($_POST['year']) ? (int)$_POST['year'] : 0;
    
    if ($year >= 1 && $year <= 30000) {
        $isLeap = false;
        
        if ($year % 4 != 0) {
            $isLeap = false;
        } elseif ($year % 100 != 0) {
            $isLeap = true;
        } elseif ($year % 400 == 0) {
            $isLeap = true;
        } else {
            $isLeap = false;
        }
        
        echo $isLeap ? 'YES' : 'NO';
    } else {
        echo 'ERROR: Year must be between 1 and 30000';
    }
} else {
    echo 'ERROR: Invalid request method';
}
?>