<?php
header('Content-type: text/json; charset=utf-8');
session_unset();
session_start();

//response("KO", 'KO test');
/*if (isset($_COOKIE['cookiemail'])) {
		$canSend = false;	
		response("KO", 'You have already send a mail. Retry later please...');
}else{		
	setcookie("cookiemail", "truc", time()+120);  // expire dans x seconds
}*/

//phpinfo();

function response($status ="KO", $response =""){
	echo '{
		"status" : "'.$status.'",
		"response" : "'.$response.'"
	}';
	exit();
}

function testArg($arg){
	if(!isset($_POST[$arg])){
		response("KO","no ".$arg);
	}
}
$email_to = "bilelz+caldevadd@gmail.com";

//response("KO","no dsd".$_POST["title"]);

error_log("description:".$_POST["description"]);

testArg("title");
testArg("date");
testArg("dateend");
testArg("adress");
testArg("description");



testArg("mail");

$title = $_POST['title'];
$date = $_POST['date'];
$dateend = $_POST['dateend'];
//$description = stripslashes($_POST['description']);
$description = $_POST['description'];
$adress = $_POST['adress'];
$mail = $_POST['mail'];

$breakLine = array("\n", "\r");
$escapeBreakLine   = array("\\n", "");
$breakLineHTML   = array("<br/>", "");
$descriptionHTML = str_replace($breakLine, $breakLineHTML, $description);
$description = str_replace($breakLine, $escapeBreakLine, $description);			

$url = 'http://www.google.com/calendar/event?'.str_replace("=","&#61;",htmlentities('action=TEMPLATE&text='.urlencode($title).'&dates&#61;'.$date.'/'.$dateend.'&details='.urlencode($description).'&location='.urlencode($adress).'&trp=true&sprop=caldev&sprop=name:caldev.io', ENT_QUOTES, 'UTF-8'));

$email_message = $title.'<br/>'.$date.' > '.$dateend.'<br/>'
				.$adress.'<br/>'.$descriptionHTML.'<br/>'.$mail
				.'<br/>ip:'.$_SERVER["REMOTE_ADDR"]
				.'<br/><br/>'
				.$url;
				
//$email_message = urlencode(htmlentities($email_message, ENT_QUOTES, 'UTF-8'));

				//.'<a href="http://www.google.com/calendar/event?action=TEMPLATE&text='.$_GET['title'].'&dates='.$_GET['date'].'/'.$_GET['dateend'].'&details='.htmlentities($description, ENT_QUOTES, 'UTF-8').'&location='.$_GET['adress'].'&trp=true&sprop=caldev&sprop=name:caldev.io" target="_blank"><img src="//www.google.com/calendar/images/ext/gc_button3.gif" border=0></a>';

$bundary = md5(uniqid(mt_rand()));

$body = "--$bundary
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

$email_message

--$bundary
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

$email_message

--$bundary
Content-Type: text/calendar; charset=UTF-8; method=REQUEST
Content-Transfer-Encoding: quoted-printable

BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:$date
DTEND:$dateend
DTSTAMP:$date
UID:bilelz+caldev@gmail.com
ATTENDEE;CUTYPE=3DINDIVIDUAL;ROLE=3DREQ-PARTICIPANT;PARTSTAT=3DACCEPTED;RSV=
P=3DTRUE
 ;CN=3Dcaldev.io;X-NUM-GUESTS=3D0:mailto:bilelz+caldev@gmail.com
CREATED:$date
DESCRIPTION:$description
LAST-MODIFIED:$date
LOCATION:$adress
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:$title
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR

--$bundary--
";

$email_subject = "=?UTF-8?B?".base64_encode($_GET['title']).'?=';

$email_from = $_GET['mail'];
$email_subject = "[ADD EVENT] ".$_GET['title'];


$headers = 'MIME-Version: 1.0' . "\r\n" . "Content-Type: multipart/alternative; boundary=$bundary; charset=UTF-8" . "\r\n";
$headers .= "From: $email_from\r\n";
if(isset($_GET['mailcc'])==1){
	$headers .= "Bcc: $email_from\r\n";
}
$headers .= "Reply-To: $email_from\r\n";
$headers .= "\r\n";

//echo 'body'.$body;
//echo 'header'.$headers;

if (mail($email_to,$email_subject,$body,$headers)){
	response("OK","Demande d'ajout envoyée!");
}else{
	response("KO","Le message n'a pu être envoyée.<br/> Nos équipes sont avertis. Veuillez essayer ultérieurement.") ;
}

response("KO", "nothing?");





?>