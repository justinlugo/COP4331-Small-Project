<?php
	$inData = getRequestInfo();

	$firstName  = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];
	$email = $inData["email"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$query = $conn->prepare("SELECT id FROM Users WHERE Login=?");
		$query->bind_param("s", $login);
		$query->execute();
		$query->close();
		$rowCheck = mysqli_num_rows($query);
		
		if ($rowCheck > 0)
		{
			returnWithError("login already in use");
		}
		else
		{
			$stmt = $conn->prepare("INSERT into Users (firstName,lastName,login,password,email) VALUES(?,?,?,?,?)");
			$stmt->bind_param("sssss", $firstName, $lastName, $login, $password, $email);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
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