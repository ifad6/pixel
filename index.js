requirejs.config({
	baseUrl: 'modules',
	paths: {
		jquery	: 'http://lib.olbe.ru/js/jquery',
		jqueryUI: 'http://lib.olbe.ru/js/jquery-ui'
	},
	urlArgs: "cache=" + (new Date()).getTime()
});

require(['map', 'user', 'items'], function(map, user, items){



	$(window).resize(function(){
		map.recalc();
	});


	// Заполняем пустыми ячейками
	map.createMap(user.startPosition.x, user.startPosition.y);

	user.toStartPosition();

	items.loadItems(map);
	setInterval(function(){
		items.loadItems(map);
	}, 2000);

});