define('map__wa', [], function(){

	var wa = {};

	wa.recalc = function(){

		wa.width =  Math.floor(document.body.clientWidth / 4 );
		wa.height = Math.floor(document.body.clientHeight / 4 );

		wa.x1 = Math.floor((document.body.clientWidth  - wa.width) / 2);
		wa.y1 = Math.floor((document.body.clientHeight - wa.height) / 2);
		wa.x2 = wa.x1 + wa.width;
		wa.y2 = wa.y1 + wa.height;

	}

	return wa;

});