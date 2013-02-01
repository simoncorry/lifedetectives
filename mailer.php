<?php
function spamcheck($field) {
	//filter_var() sanitizes the e-mail
	//address using FILTER_SANITIZE_EMAIL
	$field=filter_var($field, FILTER_SANITIZE_EMAIL);
	//filter_var() validates the e-mail
	//address using FILTER_VALIDATE_EMAIL
	if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
		return TRUE;
	}
	else {
		return FALSE;
	}
}

if (isset($_REQUEST['email'])) {
	$mailcheck = spamcheck($_REQUEST['email']);
	if ($mailcheck==TRUE) {
		$name = $_REQUEST['name'];
		$telephone = $_REQUEST['telephone'];
		$email = $_REQUEST['email'];
		$interest = $_REQUEST['interest'];
        switch($interest) {
            case "1":
                $interest = "One to one Coaching";
                break;
            case "2":
                $interest = "The Work You’re Born to Do";
                break;
            case "3":
                $interest = "Renewing your relationship";
                break;
            case "4":
                $interest = "Man Hunt - Man Ordered from Heaven!";
                break;
            case "5":
                $interest = "Does my bum look big in this?";
                break;
        }
		$message = $_REQUEST['message'];
		if (mail("anne@lifedetectives.com", "You have received a new inquiry from The Life Detectives website.", "$name has sent you a message through The Life Detectives website.\n\n$name is interested in:\n$interest\n\nTheir message to you is:\n$message\n\nYou can contact $name on $telephone or $email.", "From: $email" )) echo ("email sent");
		else echo("email failed");
	} else {
		echo("failed mailcheck");
	}
} else {
	echo ("email field not set");	
}
?>
