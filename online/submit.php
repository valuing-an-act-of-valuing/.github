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

$result = implode(', ', $output);
file_put_contents(LOGFILE, $result . "\n", FILE_APPEND | LOCK_EX);
echo json_encode($data);