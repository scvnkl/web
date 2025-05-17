<?php
if (isset($_GET['text'])) {
    $text = $_GET['text'];
    

    $text = trim($text);

    $text = preg_replace('/\s+/', ' ', $text);
    
    echo "RemoveExtraBlanks: " . htmlspecialchars($text, ENT_QUOTES, 'UTF-8') . "<br>";
    

    $cleanedText = preg_replace('/\*+/', '*', $text);
    
    echo "RemoveExtraSymbols: " . htmlspecialchars($cleanedText, ENT_QUOTES, 'UTF-8');
} else {
    echo "Передайте параметр text через GET";
}
