<?php
if (isset($_GET['password'])) {
    $password = $_GET['password'];
    
    if (!preg_match('/^[a-zA-Z0-9]+$/', $password)) {
        echo "Пароль должен содержать только английские буквы и цифры.";
        exit;
    }
    
    $len = strlen($password);
    $strength = 0;
    $digitCount = preg_match_all('/\d/', $password);
    $upperCount = preg_match_all('/[A-Z]/', $password);
    $lowerCount = preg_match_all('/[a-z]/', $password);
    
    $strength += 4 * $len;
    $strength += $digitCount * 4;
    
    if ($upperCount > 0) {
        $strength += ($len - $upperCount) * 2;
    }
    
    if ($lowerCount > 0) {
        $strength += ($len - $lowerCount) * 2;
    }
    
    if ($digitCount === 0) {
        $strength -= $len;
    }
    
    if ($upperCount + $lowerCount === 0) {
        $strength -= $len;
    }
    
    $charCounts = count_chars($password, 1);
    foreach ($charCounts as $count) {
        if ($count > 1) {
            $strength -= $count;
        }
    }
    
    echo "Надежность пароля: " . max(0, $strength);
} else {
    echo "Передайте параметр password через GET";
}
