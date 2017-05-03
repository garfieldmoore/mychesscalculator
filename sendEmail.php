<?php
$to      = 'garfieldmoore@gmail.com';
$subject = 'feedback for mychessgrade.com';
$message = 'test feedback';

//$subject=$_GET['subject'];
$message='Subject:' . $_GET['subject'] . "\r\n" . 'message:' . $_GET['message'];

$headers = 'From: feedback@mychessgrade.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?> 