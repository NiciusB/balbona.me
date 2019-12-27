<?php

define('GITHUB_REPO_URL', 'https://raw.githubusercontent.com/NiciusB/balbona.me/master/public');

$ch = curl_init();

$requestUrl = $_SERVER['REQUEST_URI'];
if ($requestUrl === '/') $requestUrl = '/index.html';

curl_setopt($ch, CURLOPT_URL, GITHUB_REPO_URL . $requestUrl);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$urlContent = curl_exec($ch);
if (!curl_errno($ch)) {
    $info = curl_getinfo($ch);
    http_response_code($info['http_code']);
    header('Content-Type: '.$info['content_type']);
    echo $urlContent;
} else {
    http_response_code(500);
}
curl_close($ch);