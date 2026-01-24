# Important: PHPMailer Setup Required
Since Composer is not available in your environment, you must manually install PHPMailer for the contact form to work.

## Steps to Install PHPMailer Manually
1.  **Download PHPMailer**: Go to [https://github.com/PHPMailer/PHPMailer](https://github.com/PHPMailer/PHPMailer) and download the ZIP file (Code -> Download ZIP).
2.  **Extract**: Extract the ZIP file.
3.  **Create Directory**: In your project folder (`Technical-service`), create a folder named `vendor` if it doesn't exist. Inside `vendor`, create a folder named `phpmailer`.
4.  **Copy Files**: Copy the `src` folder from the extracted PHPMailer ZIP and paste it into `vendor/phpmailer`.
5.  **Create Autoloader**: You'll need to make sure `send_email.php` can find these files. If you don't have a `vendor/autoload.php` because you didn't use Composer, change the `require` line in `send_email.php` to:

    ```php
    // REPLACE: require 'vendor/autoload.php';
    // WITH:
    require 'vendor/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/src/SMTP.php';
    ```

## SMTP Configuration
Open `send_email.php` and update the following settings with your actual email provider details (e.g., Gmail, Outlook, cPanel):

```php
$mail->Host       = 'smtp.yourprovider.com';
$mail->Username   = 'your_email@example.com';
$mail->Password   = 'your_password';
$mail->Port       = 587; // or 465 for SSL
$mail->setFrom('from@example.com', 'Your Name');
$mail->addAddress('recipient@example.com'); // Where you want to receive emails
```
