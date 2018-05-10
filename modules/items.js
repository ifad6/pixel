define('items', ['jquery', 'konva', 'user'], function ($, K, user) {

var items = {};
items.arr = [];

items.loadItems = function(map){

	var cell = { x1: map.x1.cell, x2: map.x2.cell, y1: map.y1.cell, y2: map.y2.cell }

		$.ajax( { url: 'index.php', type: 'post', dataType: 'json', data: cell, success: function(data) {
	
			for (i = 0; i < items.arr.length; i++)
			{
				if (!data[items.arr[i]]) delete items.arr[i];
			}
	
			// Отрисовка предметов
			for (k in data)
			{
				if ($.inArray(k, items.arr) > -1 || k == 'collection') continue;
				else items.arr.push(k);
	
				var i = data[k];
				i.c = data['collection'][i.item];
	
				var xy = map.takeXYpx(i.x1, i.y1);
				var tree = new K.Path({
					x: xy.x, y: xy.y,
					data: 'M1008 1756 c-10 -7 -18 -20 -18 -27 0 -8 -9 -21 -20 -29 -11 -8 -20 -22 -20 -32 0 -10 -4 -18 -9 -18 -5 0 -11 -8 -15 -17 -3 -10 -22 -45 -41 -78 -20 -33 -38 -68 -42 -77 -3 -10 -9 -18 -14 -18 -5 0 -9 -25 -9 -55 l0 -55 35 0 c19 0 35 -3 35 -6 0 -10 -35 -69 -42 -72 -5 -2 -8 -10 -8 -18 0 -8 -4 -14 -10 -14 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -10 -20 -5 0 -10 -8 -10 -18 0 -10 -9 -24 -20 -32 -11 -8 -20 -22 -20 -31 0 -10 -5 -19 -10 -21 -6 -2 -13 -20 -17 -40 -8 -51 16 -88 57 -88 25 0 30 -4 30 -25 0 -14 -4 -25 -10 -25 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -8 -20 -5 0 -15 -12 -23 -27 -8 -16 -16 -30 -19 -33 -3 -3 -14 -24 -24 -47 -11 -24 -23 -43 -28 -43 -4 0 -8 -9 -8 -20 0 -11 -4 -20 -10 -20 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -10 -20 -5 0 -10 -18 -10 -41 0 -39 17 -69 39 -69 6 0 11 -4 11 -10 0 -6 49 -10 126 -10 l125 0 -4 -87 c-3 -49 -8 -105 -11 -125 l-6 -38 115 0 115 0 0 54 c0 30 -4 58 -10 61 -5 3 -10 35 -10 71 l0 64 125 0 c77 0 125 4 125 10 0 6 5 10 11 10 24 0 39 30 39 78 0 28 -3 52 -8 54 -9 4 -82 126 -82 139 0 5 -4 9 -10 9 -5 0 -10 9 -10 20 0 11 -4 20 -10 20 -5 0 -10 7 -10 15 0 8 -4 15 -10 15 -5 0 -10 7 -10 15 0 8 -4 15 -10 15 -5 0 -10 11 -10 25 0 21 5 25 30 25 33 0 70 33 70 63 0 20 -40 100 -52 105 -5 2 -8 10 -8 18 0 8 -9 24 -20 36 -11 12 -20 28 -20 35 0 7 -4 13 -10 13 -5 0 -10 9 -10 20 0 11 -4 20 -10 20 -5 0 -10 7 -10 15 0 8 -4 15 -8 15 -4 0 -8 9 -9 20 -1 16 4 20 28 20 29 0 29 1 29 54 0 30 -3 56 -7 58 -7 3 -54 84 -78 135 -5 13 -13 23 -17 23 -5 0 -8 7 -8 15 0 8 -4 15 -10 15 -5 0 -10 9 -10 20 0 11 -4 20 -10 20 -5 0 -10 7 -10 16 0 22 -50 64 -75 64 -11 0 -28 -7 -37 -14z',
					name: 'item item' + i.c.alias + ' left' + xy.x + ' top' + xy.y + ' x' + i.x1 + ' y' + i.y1,
					fill: '#000',
					scale: {x: map.cellSize / 2500, y: map.cellSize / 2500}
				})
				map.group.add(tree);
				tree.cache();
	
				/*map.base.append('<div' +
					' id="item' + i.id + '"' +
					' class="item item_' + i.c.alias + ' x' + i.x1 + ' y' + i.y1  + '"' +
					' style="left: ' + $('div.cell.x' + i.x1).css('left') + '; top: ' + $('div.cell.y' + i.y1).css('top') + ';' +
					' width: ' + (map.cellSize * i.c.sizeX - 1) + 'px; height: ' + (map.cellSize * i.c.sizeY - 1) + 'px;' +
					' background: url(items/' + i.c.img + ') no-repeat; background-size: cover;"' +
					' data-x="' + i.x1 + '" data-y ="' + i.y1 + '" data-id="' + i.id + '">' +
					'</div>');*/
	
			}
			map.layer.draw();
	
			/*$('.item').unbind('click').click(function(){
				user.moving( $(this).attr('data-x'), $(this).attr('data-y') );
			});*/
	
		} });

}

return items;

});