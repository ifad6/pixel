define('map', ['jquery', 'map__wa', 'map__sz'], function ($, wa, sz) {

var map = { width: {}, height: {}, x1: {}, x2: {}, y1: {}, y2: {} }

map.cellSize = 50;//Math.floor(Math.sqrt( wa.width * wa.height / 90 )); 

map.items = [];

map.recalc = function(){

	wa.recalc();
	sz.recalc(map, wa);
console.log(Math.floor(Math.sqrt( wa.width * wa.height / 90 )));
	map.width.cell  = Math.ceil( sz.width  / map.cellSize ) + 2;
	map.height.cell = Math.ceil( sz.height / map.cellSize ) + 2;

	if (map.width.cell  % 2 < 1) map.width.cell++;
	if (map.height.cell % 2 < 1) map.height.cell++;

	map.width.px  = map.width.cell  * map.cellSize;
	map.height.px = map.height.cell * map.cellSize;

}
map.recalc();

map.x1.px = 0;
map.x2.px = map.width.px  - map.cellSize;
map.y1.px = 0;
map.y2.px = map.height.px - map.cellSize;


map.base = $('#base');
var base = {
	left: Math.ceil( ( $(document).width() - map.width.px  ) / 2 ),
	top:  Math.ceil( ( $(document).height() - map.height.px ) / 2 )
}
map.base.offset({ left: base.left, top: base.top });


map.blockLoad = false;


map.createMap = function(x, y){

	map.x1.cell = x - Math.ceil(map.width.cell / 2) + 1;
	map.x2.cell = map.x1.cell + map.width.cell - 1;
	map.y1.cell = y - Math.ceil(map.height.cell / 2) + 1;
	map.y2.cell = map.y1.cell + map.height.cell - 1;
	map.loadMap({x1: map.x1, x2: map.x2, y1: map.y1, y2: map.y2});

	setInterval(function(){
		if ( map.base.offset().left + map.x1.px > sz.x1 ) map.createCell('x1');
		else if ( map.base.offset().left + map.x2.px + map.cellSize < sz.x2 ) map.createCell('x2');
		if ( map.base.offset().top + map.y1.px > sz.y1 ) map.createCell('y1');
		else if ( map.base.offset().top + map.y2.px + map.cellSize < sz.y2 ) map.createCell('y2');
	}, 100);
	
}


map.createCell = function(line) {

	if (map.blockLoad == true) return;
	map.blockLoad = true;

	if (line == 'x1')
	{

		while (map.x2.px + map.cellSize - map.x1.px >= map.width.px)
		{
			$('div.cell.left' + map.x2.px + ', div.item.x' + map.x2.cell).remove();
			map.x2.px -= map.cellSize;
			map.x2.cell--;
		}
		map.x1.px -= map.cellSize;
		map.x1.cell--; 

		map.loadMap({x1: map.x1, x2: map.x1, y1: map.y1, y2: map.y2});

	}
	else if (line == 'x2')
	{

		while (map.x2.px + map.cellSize - map.x1.px >= map.width.px)
		{
			$('div.cell.left' + map.x1.px + ', div.item.x' + map.x1.cell).remove();
			map.x1.px += map.cellSize;
			map.x1.cell++;
		}
		map.x2.px += map.cellSize;
		map.x2.cell++;

		map.loadMap({x1: map.x2, x2: map.x2, y1: map.y1, y2: map.y2});

	}
	else if (line == 'y1')
	{

		while (map.y2.px + map.cellSize - map.y1.px >= map.height.px)
		{
			$('div.cell.top' + map.y2.px + ', div.item.y' + map.y2.cell).remove();
			map.y2.px -= map.cellSize;
			map.y2.cell--;
		}
		map.y1.px -= map.cellSize;
		map.y1.cell--;

		map.loadMap({x1: map.x1, x2: map.x2, y1: map.y1, y2: map.y1});

	}
	else if (line == 'y2')
	{

		while (map.y2.px + map.cellSize - map.y1.px >= map.height.px)
		{
			$('div.cell.top' + map.y1.px + ', div.item.y' + map.y1.cell).remove();
			map.y1.px += map.cellSize;
			map.y1.cell++;
		}
		map.y2.px += map.cellSize;
		map.y2.cell++;

		map.loadMap({x1: map.x1, x2: map.x2, y1: map.y2, y2: map.y2});

	}
}

map.loadMap = function(a)
{

	// Отрисовка сетки
	for ( var i = {cell : a.x1.cell, px: a.x1.px}; i.cell <= a.x2.cell || i.px <= a.x2.px; i.cell++, i.px += map.cellSize )
	{

		for ( var j = {cell : a.y1.cell, px: a.y1.px}; j.cell <= a.y2.cell || j.px <= a.y2.px; j.cell++, j.px += map.cellSize )
		{

			map.base.append('<div' +
				' class="cell left' + i.px + ' top' + j.px + ' x' + i.cell + ' y' + j.cell  + '"' +
				' style="left: ' + i.px + 'px; top: ' + j.px + 'px;' +
				' width: ' + map.cellSize + 'px; height: ' + map.cellSize + 'px;"' +
				' data-x="' + i.cell + '" data-y ="' + j.cell + '"></div>');

		}

	}

	$('.cell').unbind('click').click(function(){
		user.moving( $(this).attr('data-x'), $(this).attr('data-y') );
	});

	map.blockLoad = false;

}

return map;

});