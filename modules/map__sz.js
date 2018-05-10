define('map__sz', [], function () {

	var sz = {};

	sz.size = 1.5;

	sz.recalc = function(cellSize, wa){

		sz.width =  wa.width  + sz.size * 2 * cellSize;
		sz.height = wa.height + sz.size * 2 * cellSize;

		sz.x1 = Math.floor((document.body.clientWidth - sz.width)  / 2);
		sz.y1 = Math.floor((document.body.clientHeight - sz.height) / 2);
		sz.x2 = sz.x1 + sz.width;
		sz.y2 = sz.y1 + sz.height;

	}

	return sz;

});