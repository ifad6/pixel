<?php

ini_set('display_errors', 1);
error_reporting('E_ALL');

define('LIB', '/var/www/iwon/data/www/.lib/');
define('ROOT', dirname(__FILE__).'/');

require_once(ROOT.'.core/db.php');

$m = array(
	'x1'  => (int)$_POST['x1'],
	'x2' => (int)$_POST['x2'],
	'y1'  => (int)$_POST['y1'],
	'y2' => (int)$_POST['y2']
);

/*db_query("TRUNCATE TABLE `items`");
for ($i = -10; $i <= 10; $i++)
{
	for ($j = -10; $j <= 10; $j++)
	{
		$x = rand(1, 2);
		if ($x == 1) db_query("INSERT INTO `items`(`item`,`x1`,`x2`,`y1`,`y2`) VALUES ('1','".$i."','".$i."','".$j."','".$j."')");
		elseif ($x == 2) db_query("INSERT INTO `items`(`item`,`x1`,`x2`,`y1`,`y2`) VALUES ('2','".$i."','".$i."','".$j."','".$j."')");
	}	
}*/


$items = db_array("
	SELECT * FROM `items`
	WHERE `x1` <= ".$m['x2']."
		AND `x2` >= ".$m['x1']."
		AND `y1` <= ".$m['y2']."
		AND `y2` >= ".$m['y1']."", 'id');

foreach ($items as $v)
{
	if (!in_array($v['item'], $k)) $k[] = $v['item'];
}

$items['collection'] = db_array("
	SELECT * FROM `items_collection`
	WHERE `id` IN (".implode(',', $k).")", 'id');

print_r(json_encode($items, true));


/*$map = db_array("
	SELECT `m`.`x`, `m`.`y`, `i`.`id`
	FROM `map` `m` LEFT JOIN `items` `i`
	ON	`i`.`x` = `m`.`x` AND `i`.`y` = `m`.`y`
	WHERE `m`.`x` >= ".$m['x1'].
		" AND `m`.`x` <= ".$m['x2'].
		" AND `m`.`y` >= ".$m['y1'].
		" AND `m`.`y` <= ".$m['y2'], 'y', 'x');

$arr = array();
for ($i = $m['x1']; $i <= $m['x2']; $i++)
{
	for ($j = $m['y1']; $j <= $m['y2']; $j++)
	{
		if ($map[$i][$j]) $arr[$i][$j] = $map[$i][$j];
		else $arr[$i][$j] = array('x' => $i, 'y' => $j, $id => '');
	}	
}
print_r(json_encode($arr, true));


/*

/*
foreach ($items as $x => $lineY)
{
	foreach ($lineY as $y => $item)
	{


		if ($item['sizeX'] > 1)
		{
			for ($i = $item['x']; $i <= $item['x2']; $i++)
			{
				if ($item['sizeY'] > 1)
				{
					for ($j = $item['y']; $j <= $item['y2']; $j++)
					{
						$items[$i][$j] = $item['id'];
					}
				}
				else $items[$i][$y] = $item['id'];
			}
		}
		elseif ($item['sizeY'] > 1)
		{
			for ($i = $item['y']; $i <= $item['y2']; $i++)
			{
				$items[$x][$i] = $item['id'];
			}
		}


	}

}

/*
echo '<table>';
foreach ($map as $y => $lineX)
{
	echo '<tr><td>'.$y.'</td>';
	$lineX = array_keys($lineX);
	foreach ($lineX as $x)
	{
		if ($items[$x][$y]) echo '<td class="item"></td>';
		else echo '<td class="cell"></td>';
	}
	echo '</tr>';
}
echo '</table>';


/*
for ($i = -10; $i <= 20; $i++)
{
	for ($j = -20; $j <= 10; $j++)
	{
		db_query("INSERT INTO `map` (`x`,`y`) VALUES ('".$i."','".$j."')");
	}
}
*/

?>