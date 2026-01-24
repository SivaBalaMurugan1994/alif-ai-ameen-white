<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// NOTE: You need to install PHPMailer. 
// If you have Composer: "composer require phpmailer/phpmailer"
// If not, download the PHPMailer source and include Exception.php, PHPMailer.php, and SMTP.php manually.
require 'vendor/autoload.php'; // Adjust this path if you manually include files

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["user_name"]));
    $mobile = strip_tags(trim($_POST["user_mobile"]));
    $email = filter_var(trim($_POST["user_email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid input data."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                     // Enable SMTP authentication
        $mail->Username   = 'alifalameentechnicalservice@gmail.com'; // SMTP username
        $mail->Password   = 'AlifAlAmeenTech';     // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('alifalameentechnicalservice@gmail.com', 'Technical Service Website');
        $mail->addAddress('alifalameentechnicalservice@gmail.com');     // Add a recipient
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Inquiry: $subject";
        $mail->Body    = "
            <h3>New Message from Website</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Mobile:</strong> $mobile</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Message has been sent"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
}
?>
