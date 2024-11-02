<?php
if(isset($_POST['submit'])) {

    $username = $_POST['username'];
    $agency = $_POST['subject'];
    $emailAddress = $_POST['email'];

    $message = "Name: " . $_POST['username'] . "Email : " . $_POST['email'] . "<br><br> Subject: " . $_POST['subject'] . "<br><br>Message : <br>" . $_POST['body'];

    require '../phpmailer/PHPMailerAutoload.php';

    $mail = new PHPMailer();
    $mail->isSMTP();

    // Enter SMTP outbox:
    $mail->Host = "smtp.gmail.com"; // e.g. smtp.1und1.de

    $mail->IsHTML(true);
    $mail->SMTPAuth = true;

    // Login and password of the recipient email
    $mail->Username = "genxroleplay25@gmail.com"; // e.g. info@techkings.de
    $mail->Password = "#Chandappan@123!"; // Password Email / Username

    // Encryption protocol
    $mail->SMTPSecure = "tls";
    $mail->Port = 587; // Port for SMTP

    $mail->Subject = "Request via Website";
    $mail->Body = $message;
    $mail->setFrom("genxroleplay25@gmail.com", $username); // Deliverer email
    $mail->addAddress('CommanderDonkey@gmail.com'); // email recipient


    try{
        if($mail->send()){
            header("Location: ../succeed.html");
            exit();
        } else {
            header("Location: ..&error.html");
        }
    } catch(Exception $e){
        echo $e->getMessage();
    }
}