<?php
mb_language("ja");
mb_internal_encoding("UTF-8");

$source_file = "submit.csv";


define("LOGFILE", $source_file);
$data = json_decode(file_get_contents("php://input"), true);

$output = array(
  '"' . $data["timestamp"] . '"',
  '"' . $data["yourName"] . '"',
  '"' . $data["yourEmail"] . '"',
  '"' . $data["yourLanguage"] . '"',
  '"' . $data["yourValue"] . '"',
  '"' . $data["valuText"] . '"'
);

$to = $data["yourEmail"];
$title = "あなたの大切なものはなんですか？";
$message = $data["yourValue"];
$message .= " by ";
$message .= $data["yourName"];
$message .= "\r\n";
$message .= $data["valuText"];
$headers = "From: pehu@creative-community.space";
$headers .= "\r\n";
$headers .= "Bcc: we.are.pe.hu@gmail.com";

if (mb_send_mail($to, $title, $message, $headers)) {
  echo "メール送信成功です";
} else {
  echo "メール送信失敗です";
}

$result = implode(', ', $output);
file_put_contents(LOGFILE, $result . "\n", FILE_APPEND | LOCK_EX);
echo json_encode($data);
