<?php
// Step 1: Include Composer's autoloader to load the dotenv library
require_once 'vendor/autoload.php';

// Step 2: Load environment variables from the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Step 3: Get the reCAPTCHA secret key and email from environment variables
$secretKey = getenv('RECAPTCHA_SECRET_KEY');
$contactEmail = getenv('CONTACT_EMAIL');

// Step 4: Initialize error and success messages
$errorMessage = '';
$successMessage = '';

// Step 5: Form submission logic
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Step 5.1: Get form inputs
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Step 5.2: Validate reCAPTCHA
    $recaptchaVerificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaResponseData = file_get_contents($recaptchaVerificationUrl . "?secret=" . $secretKey . "&response=" . $recaptchaResponse);
    $recaptchaData = json_decode($recaptchaResponseData);

    // Step 5.3: Check if reCAPTCHA validation was successful
    if ($recaptchaData->success) {
        // Step 5.4: Check if all form fields are filled
        if (!empty($name) && !empty($email) && !empty($message)) {
            // Step 5.5: Send the email
            $subject = "New message from " . $name;
            $body = "You have received a new message from your website contact form.\n\n".
                    "Name: " . $name . "\n".
                    "Email: " . $email . "\n".
                    "Message:\n" . $message;
            $headers = "From: " . $email . "\r\n" .
                       "Reply-To: " . $email . "\r\n" .
                       "Content-Type: text/plain; charset=UTF-8";

            // Step 5.6: Use mail() function to send the email
            if (mail($contactEmail, $subject, $body, $headers)) {
                $successMessage = "Thank you for reaching out! Your message has been sent.";
            } else {
                $errorMessage = "Sorry, something went wrong. Please try again later.";
            }
        } else {
            $errorMessage = "Please fill in all fields.";
        }
    } else {
        $errorMessage = "reCAPTCHA verification failed. Please try again.";
    }
}
?>