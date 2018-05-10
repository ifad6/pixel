define('items', ['jquery', 'user'], function ($, user) {

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
			map.base.append('<div' +
				' id="item' + i.id + '"' +
				' class="item item_' + i.c.alias + ' x' + i.x1 + ' y' + i.y1  + '"' +
				' style="left: ' + $('div.cell.x' + i.x1).css('left') + '; top: ' + $('div.cell.y' + i.y1).css('top') + ';' +
				' width: ' + (map.cellSize * i.c.sizeX - 1) + 'px; height: ' + (map.cellSize * i.c.sizeY - 1) + 'px;' +
				' background: url(items/' + i.c.img + ') no-repeat; background-size: cover;"' +
				' data-x="' + i.x1 + '" data-y ="' + i.y1 + '" data-id="' + i.id + '">' +
				'</div>');

		}

		$('.item').unbind('click').click(function(){
			user.moving( $(this).attr('data-x'), $(this).attr('data-y') );
		});

	} });

}

return items;

});