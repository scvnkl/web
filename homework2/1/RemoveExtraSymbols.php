<?php
if (isset($_GET['text'])) {
    $text = $_GET['text'];
    
    // Удаляем начальные и конечные пробелы
    $text = trim($text);
    // Удаляем лишние пробелы между словами
    $text = preg_replace('/\s+/', ' ', $text);
    
    echo "RemoveExtraBlanks: " . htmlspecialchars($text, ENT_QUOTES, 'UTF-8') . "<br>";
    
    // Удаляем повторяющиеся '*', оставляя только один '*'
    $cleanedText = preg_replace('/\*+/', '*', $text);
    
    echo "RemoveExtraSymbols: " . htmlspecialchars($cleanedText, ENT_QUOTES, 'UTF-8');
} else {
    echo "Передайте параметр text через GET";
}
