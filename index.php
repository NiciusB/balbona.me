<?php

define('GITHUB_REPO_URL', 'https://raw.githubusercontent.com/NiciusB/balbona.me/master/public');

$ch = curl_init();

$requestUrl = $_SERVER['REQUEST_URI'];
$requestUrl = strtok($requestUrl, '?'); // Remove query
if ($requestUrl === '/') $requestUrl = '/index.html';

curl_setopt($ch, CURLOPT_URL, GITHUB_REPO_URL . $requestUrl);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$urlContent = curl_exec($ch);
if (!curl_errno($ch)) {
    $info = curl_getinfo($ch);
    http_response_code($info['http_code']);
    $contentType = $info['content_type'];
    if (endsWith($requestUrl, '.html')) $contentType = 'text/html';
    if (endsWith($requestUrl, '.pdf')) $contentType = 'application/pdf';
    header('Content-Type: '. $contentType);
    echo $urlContent;
} else {
    http_response_code(500);
}
curl_close($ch);


function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }
    return (substr($haystack, -$length) === $needle);
}