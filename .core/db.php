<?php

// db pole X0m3E5s51G1d3P3q

mysql_connect('localhost','pole','X0m3E5s51G1d3P3q');
mysql_select_db('pole');
mysql_query("SET NAMES utf8");

function db_query($query){
	$reply = mysql_query($query);	
	if ($reply === false) {
		$f = fopen(ROOT.'.core/db.log', 'a');
		fwrite($f, date("d.m.y G:i:s")."\r\n".$query."\r\n".mysql_errno().': '.mysql_error()."\r\n\r\n");
		fclose($f);
	}
	return $reply;
}

function db_result($query) {
	$reply = db_query($query);
	if (mysql_num_rows($reply)) return mysql_fetch_assoc($reply);
	else return false;
}

function db_array($query, $key = false, $group = false) {
	$reply = db_query($query);
	if (!mysql_num_rows($reply)) return false;
	
	while ($item = mysql_fetch_assoc($reply)) {
		if ($key && $group) $array [$item[$group]] [$item[$key]] = $item;
		elseif ($group) $array [$item[$group]] [] = $item;
		elseif ($key)  $array [$item[$key]] = $item;
		else $array[] = $item;
	}
	return $array;
}

function db_array_keys($query, $key) {
	$array = db_array($query, $key);
	return array_keys($array);
}

function db_array_values($query, $key) {
	$array = db_array($query, $key);
	return array_values($array);
}
?>