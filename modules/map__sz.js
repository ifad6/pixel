define('map__sz', [], function () {

	var sz = {};

	sz.size = 0.5;

	sz.recalc = function(map, wa){

		sz.width =  wa.width  + sz.size * 2 * map.cellSize;
		sz.height = wa.height + sz.size * 2 * map.cellSize;

		sz.x1 = Math.ceil( ( document.body.clientWidth - sz.width ) / 2 );
		sz.x2 = sz.x1 + sz.width;
		sz.y1 = Math.ceil( ( document.body.clientHeight - sz.height ) / 2 );
		sz.y2 = sz.y1 + sz.height;

	}

	return sz;

});