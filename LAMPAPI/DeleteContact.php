<?php
	$inData = getRequestInfo();

	$firstName  = $inData["firstName"];
	$lastName = $inData["lastName"];
	$email = $inData["email"];
    $phone = $inData["phone"];
    $userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        // mysql command format to delete a contact dependent on the id.
	    $stmt = $conn->prepare("delete from Contacts where id = ?");

        // takes the id
        $idDelete = $inData["id"];
		$stmt->bind_param("i", $idDelete);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>