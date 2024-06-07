<?php
mb_language("ja");
mb_internal_encoding("UTF-8");

$source_file = "submit.csv";
define("LOGFILE", $source_file);
$data = json_decode(file_get_contents("php://input"), true);
$output = array(
  '"' . $data["timestamp"] . '"',
  '"' . $data["yourName"] . '"',
  '"' . $data["yourLanguage"] . '"',
  '"' . $data["yourValue"] . '"',
  '"' . $data["valuText"] . '"'
);

$to = "pehu@creative-community.space";
$title = $data["yourValue"];
$title .= " by ";
$title .= $data["yourName"];
$message .= $data["valuText"];
$message .= "\r\n";
$message .= $data["yourEmail"];
$headers = "From: we.are.pe.hu@gmail.com";

if (mb_send_mail($to, $title, $message, $headers)) {
  echo "メール送信成功です";
} else {
  echo "メール送信失敗です";
}

$result = implode(', ', $output);
file_put_contents(LOGFILE, $result . "\n", FILE_APPEND | LOCK_EX);
echo json_encode($data);
