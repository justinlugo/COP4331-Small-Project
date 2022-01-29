<?php
	$inData = getRequestInfo();

	$firstName  = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];
	$email = $inData["email"];

	# Connect to database.
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# Get all IDs of the users with the given login.  
		$getId = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
		$getId->bind_param("s", $inData["login"]);
		$getId->execute();
		$result = $getId->get_result();

		# If there is already a user with that login, return an error.
		if ($row = $result->fetch_assoc())
		{
			returnWithError("login already in use");
		}
		else
		{
			# Create a user with the given info
			$stmt = $conn->prepare("INSERT into Users (firstName,lastName,login,password,email) VALUES(?,?,?,?,?)");
			$stmt->bind_param("sssss", $firstName, $lastName, $login, $password, $email);
			$stmt->execute();
			$stmt->close();

			# Get the ID of the newly created user
			$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
			$stmt->bind_param("ss", $inData["login"], $inData["password"]);
			$stmt->execute();
			$result = $stmt->get_result();
			$row = $result->fetch_assoc();

			$stmt->close();
			$conn->close();
			
			# Return the first name, last name, and ID of the new user.
			returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
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

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>