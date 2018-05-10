define('map__wa', [], function(){

	var wa = {};

	wa.recalc = function(){

		wa.width = (document.body.clientWidth );
		wa.height = (document.body.clientHeight );

		wa.x1 = Math.ceil( (document.body.clientWidth  - wa.width) / 2 );
		wa.y1 = Math.ceil( (document.body.clientHeight - wa.height) / 2 );
		wa.x2 = wa.x1 + wa.width;
		wa.y2 = wa.y1 + wa.height;

	}

	return wa;

});