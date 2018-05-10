requirejs.config({
	baseUrl: 'modules',
	paths: {
		jquery	: '//lib.olbe.ru/js/jquery',
		konva: '//lib.olbe.ru/js/konva'
	},
	urlArgs: "cache=" + (new Date()).getTime()
});

require(['jquery', 'konva', 'map', 'user', 'items'], function($, K, map, user, items){

	var stage = new K.Stage({
		width: document.body.clientWidth,
		height: document.body.clientHeight,		
		container: 'container'});

	map.layer = new K.Layer();
	stage.add(map.layer);

	user.layer = new K.Layer();
	stage.add(user.layer);

	map.msg = new K.Text({ x: 0, y: 0, text: '', fontSize: 30, fontFamily: 'Calibri', fill: '#000' });
	map.layer.add(map.msg);

	map.createMap(user.createPosition.x, user.createPosition.y);
	user.createUser(map);

	$(window).resize(function(){
		map.refreshMap(user.currentPosition.x.cell, user.currentPosition.y.cell);
		user.refreshUser(map);
		stage.width(document.body.clientWidth).height(document.body.clientHeight);
	});


	map.group.on('click tap', function(e){
		user.moving(stage.getPointerPosition().x, stage.getPointerPosition().y, map);
	});
	

	items.loadItems(map);
	//map.group.cache();
	setInterval(function(){
		items.loadItems(map);
		//map.group.cache();
	}, 2000);

});