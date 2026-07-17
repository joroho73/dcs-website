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
$service = trim($_POST['service'] ?? '');
$rating = trim($_POST['rating'] ?? '');
$review = trim($_POST['review'] ?? '');
$permission = isset($_POST['permission']) ? 'Yes' : 'No';
$display_name = trim($_POST['display_name'] ?? '');

if ($name === '' || $email === '' || $rating === '' || $review === '') {
    respond(
        false,
        'Please complete your name, email address, rating and review.'
    );
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

if (!in_array($rating, ['1', '2', '3', '4', '5'], true)) {
    respond(false, 'Please choose a valid star rating.');
}

if ($permission === 'Yes' && $display_name === '') {
    respond(
        false,
        'Please choose how your name should appear if the review is published.'
    );
}

$display_name_options = [
    'full' => 'Full name',
    'first-last-initial' => 'First name and surname initial',
    'first-name' => 'First name only',
    'anonymous' => 'Anonymous'
];

$display_name_label =
    $display_name_options[$display_name] ?? 'Not specified';

$to = 'dunmowcomputerservices@gmail.com';
$subject = 'New DCS website review';

$email_body =
"New review submitted through the DCS website\n\n" .
"Name: $name\n" .
"Email: $email\n" .
"Service: $service\n" .
"Rating: $rating out of 5\n" .
"Permission to publish: $permission\n" .
"Display name preference: $display_name_label\n\n" .
"Review:\n$review\n";

$headers = [
    'From: Dunmow Computer Services <no-reply@dunmowcomputerservices.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail(
    $to,
    $subject,
    $email_body,
    implode("\r\n", $headers)
);

if ($sent) {
    respond(
        true,
        'Thank you. Your review has been received.'
    );
}

respond(
    false,
    'Sorry, your review could not be submitted. Please try again later.'
);