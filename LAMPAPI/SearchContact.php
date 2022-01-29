<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;


	// necessary info to connect to mysql.
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}

	else
	{
		// prepare sends the command verbatim to mysql. the "?"s correspond to the bind_param from $inData[] and userId from the user logged in.
		$stmt = $conn->prepare("select firstName,lastName,email,phone,id from Contacts where 
		(firstName like ? or lastName like ? or email like ? or phone like ?) and userId = ? order by lastName");

		// % means it will match any part of the firstName, lastName, etc. with the search input. stores the search in $user.
		$user = "%" . $inData["search"] . "%";

		// user is input into the mysql command. similar to printf in c. $inData[] inputs userId as logged in user's id.
		$stmt->bind_param("ssssi", $user, $user, $user, $user, $inData["userId"]);

		// executes the statement.
		$stmt->execute();
		
		// if there are results its returned into $result.
		$result = $stmt->get_result();

		$retArray = array();

		// if any rows are found to match the search criteria, perform while loop through the rows.
		while($row = $result->fetch_assoc())
		{
			// increments the amount of rows found.
			$searchCount++;

			// pushes an associated array of the current row onto $retArray to display later.
			array_push($retArray, array("firstName" => $row['firstName'], 
										"lastName" => $row['lastName'], 
										"email" => $row['email'], 
										"phone" => $row['phone'],
										"id" => $row['id']));

		}
		
		// if no rows found, return error message.
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}

		// else, show all results.
		else
		{
			$retJson = ["contacts" => $retArray];
			sendResultInfoAsJson($retJson);
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo json_encode($obj);
	}
	
	function returnWithError( $err )
	{
		header('Content-type: application/json');
		$retValue = '{"error":"' . $err . '"}';
		echo  $retValue;
	}