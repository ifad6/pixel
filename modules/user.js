define('user', ['konva'], function (K) {

	var user = {
		createPosition: {
			x: 0,
			y: 0
		},
		startPosition: { x: { px: false, cell: false}, y: { px: false, cell: false} },
		goalPosition: { x: { px: false, cell: false}, y: { px: false, cell: false} },
		startCameraPosition: { px: { x: false, y: false} }
	}


	//  Установка на стартовую позицию
	user.createUser = function(map){

		var xy = map.takeXYpx(user.createPosition.x, user.createPosition.y);

		user.currentPosition = {
			x: {
				px:   xy.x + map.cellSize / 2,
				cell: user.createPosition.x
			},
			y: {
				px:   xy.y + map.cellSize / 2,
				cell: user.createPosition.y
			}
		}

		user.circle = new K.Circle({
			x: user.currentPosition.x.px,
			y: user.currentPosition.y.px,
			radius: map.cellSize / 4,
			fill: '#CCF',
			opacity: 0.7
		});
		user.layer.add(user.circle).batchDraw();	

	}

	user.refreshUser = function(map){

		var animation = false;
		if (user.anim.isRunning())
		{
			user.anim.stop();
			animation = true;
		}

		var xy = map.takeXYpx(user.currentPosition.x.cell, user.currentPosition.y.cell);

		user.currentPosition.x.px = xy.x + map.cellSize / 2;
		user.currentPosition.y.px = xy.y + map.cellSize / 2;

		user.circle.setX(user.currentPosition.x.px).setY(user.currentPosition.y.px).radius(map.cellSize / 4);	

		if (animation)
		{
			var xy = map.takeXYpx(user.goalPosition.x.cell, user.goalPosition.y.cell);
		 	user.moving(xy.x + map.cellSize / 2, xy.y + map.cellSize / 2, map);
		}

	}


	user.anim = new K.Animation();

	// Перемещение по клику
	user.moving =  function(x, y, map){

		if (user.anim.isRunning()) user.anim.stop();

		user.goalPosition.x.px = x;
		user.goalPosition.y.px = y;
		var xy = map.takeXYcell(user.goalPosition.x.px, user.goalPosition.y.px);
		user.goalPosition.x.cell = xy.x;
		user.goalPosition.y.cell = xy.y;

//console.log(x, y, user.goalPosition.x.cell, user.goalPosition.y.cell);

		user.startPosition.x.px = user.currentPosition.x.px;
		user.startPosition.y.px = user.currentPosition.y.px;

		var way = {
				x: user.goalPosition.x.px - user.startPosition.x.px,
				y: user.goalPosition.y.px - user.startPosition.y.px,
			},
			distance = Math.sqrt(way.x * way.x + way.y * way.y),
			speed = map.cellSize / 2,
			time = distance / speed * 1000;


		user.startCameraPosition = {
			x: map.group.x(),
			y: map.group.y()
		}

		map.group.children.each(function(shape){
			//shape.strokeHitEnabled(false);
			//shape.shadowForStrokeEnabled(false);
		});

		user.anim = new K.Animation(function(frame){

			map.group.x(user.startCameraPosition.x - frame.time * way.x / time);
			map.group.y(user.startCameraPosition.y - frame.time * way.y / time);

			var xy = map.takeXYcell(user.currentPosition.x.px, user.currentPosition.y.px);
			user.currentPosition.x.cell = xy.x;
			user.currentPosition.y.cell = xy.y;

			map.msg.setText(user.currentPosition.x.cell + ' ' + user.currentPosition.y.cell);

			if (frame.time >= time) user.anim.stop();

		}, map.layer);
		user.anim.start();

	}

	return user;

});