<?php
header('Content-Type: application/json');

function respond($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request.');
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please complete your name, email address and message.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

$to = 'dunmowcomputerservices@gmail.com';
$subject = 'New DCS website enquiry';

$email_body =
"New enquiry from the DCS website\n\n" .
"Name: $name\n" .
"Email: $email\n" .
"Phone: $phone\n" .
"Service: $service\n\n" .
"Message:\n$message\n";

$headers = [
    'From: Dunmow Computer Services <no-reply@dunmowcomputerservices.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($sent) {
    respond(true, 'Thank you. Your message has been sent.');
}

respond(false, 'Sorry, your message could not be sent. Please call or email instead.');