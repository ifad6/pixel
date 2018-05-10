define('user', [], function () {

	var user = {
		startPosition: {
			x: 0,
			y: 0
		},
		goalPosition: { px: { x: false, y: false} },
		goalCameraPosition: { px: { x: false, y: false} }
	}


	//  Установка на стартовую позицию
	user.toStartPosition = function(){

		user.startCell = $('.x' + user.startPosition.x  + '.y' + user.startPosition.y);

		user.currentPosition = {
			cell: {
				x: user.startPosition.x,
				y: user.startPosition.y
			},
			px: {
				x: user.startCell.position().left + 11,
				y: user.startCell.position().top + 11
			}
		}

		$('#player').css('left', user.currentPosition.px.x).css('top', user.currentPosition.px.y);		

	}


	// Перемещение по клику
	user.moving =  function(x, y){

		var move = {},
			way = {
				x: x - user.currentPosition.cell.x,
				y: y - user.currentPosition.cell.y
			},
			diff;

		function startMove(move){

			user.currentPosition.cell = {
				x: user.currentPosition.cell.x + move.x / 50,
				y: user.currentPosition.cell.y + move.y / 50,
			}

			user.goalPosition.px = {
				x: (user.goalPosition.px.x || $('#player').position().left) + move.x,
				y: (user.goalPosition.px.y || $('#player').position().top) + move.y
			}

			user.goalCameraPosition = {
				x: (user.goalCameraPosition.x || $('#base').offset().left) - move.x,
				y: (user.goalCameraPosition.y || $('#base').offset().top)  - move.y
			}

			$('#player').animate({
					left: user.goalPosition.px.x + 'px',
					top:  user.goalPosition.px.y + 'px'
				},
				{
					duration: 2000 * Math.abs(move.x || move.y) / 50,
					easing: 'linear',
					queue: true
				});	

			$('#base').animate({
					left: user.goalCameraPosition.x + 'px',
					top:  user.goalCameraPosition.y + 'px'
				},
				{
					duration: 2000 * Math.abs(move.x || move.y) / 50,
					easing: 'linear',
					queue: true
				});

		}


		if (way.x != 0 && way.y != 0)
		{

			if (Math.abs(way.x) > Math.abs(way.y))
			{
				diff = Math.abs(way.x) - Math.abs(way.y);
				if (way.x > 0)
				{

					move.x = (way.x - diff) * 50; //map.cellSize;
					move.y = way.y * 50;
					startMove(move);

					move.x = diff * 50; //map.cellSize;
					move.y = 0;
					startMove(move)

				}
				else
				{

					move.x = (way.x + diff) * 50; //map.cellSize;
					move.y = way.y * 50;
					startMove(move);

					move.x = -diff * 50; //map.cellSize;
					move.y = 0;
					startMove(move)

				}
			}
			else
			{
				diff = Math.abs(way.y) - Math.abs(way.x);
				if (way.y > 0)
				{

					move.y = (way.y - diff) * 50; //map.cellSize;
					move.x = way.x * 50;
					startMove(move);

					move.y = diff * 50; //map.cellSize;
					move.x = 0;
					startMove(move)

				}
				else
				{

					move.y = (way.y + diff) * 50; //map.cellSize;
					move.x = way.x * 50;
					startMove(move);

					move.y = -diff * 50; //map.cellSize;
					move.x = 0;
					startMove(move)

				}
			}

		}
		else if (way.x != 0)
		{

			move.x = way.x * 50;
			move.y = 0;

			startMove(move);

		}
		else if (way.y != 0)
		{

			move.x = 0;
			move.y = way.y * 50;

			startMove(move);

		}
	}

	return user;

});