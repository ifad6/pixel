function WorkArea()
{
	var self = this;

	this.recalc = function()
	{
		self.width =  Math.floor(document.body.clientWidth / 4);
		self.height = Math.floor(document.body.clientHeight / 4);

		self.x1 = Math.floor((document.body.clientWidth  - self.width) / 2);
		self.y1 = Math.floor((document.body.clientHeight - self.height) / 2);
		self.x2 = self.x1 + self.width;
		self.y2 = self.y1 + self.height;
	}
}


function SZ()
{
	var self = this;

	this.size = 1.5;

	this.recalc = function(cellSize, wa){

		self.width =  wa.width  + self.size * 2 * cellSize;
		self.height = wa.height + self.size * 2 * cellSize;

		self.x1 = Math.floor((document.body.clientWidth - self.width)  / 2);
		self.y1 = Math.floor((document.body.clientHeight - self.height) / 2);
		self.x2 = self.x1 + self.width;
		self.y2 = self.y1 + self.height;

	}
}


function Map ()
{
	var self = this;

	this.width = {};
	this.height = {};
	this.x1 = {};
	this.x2 = {};
	this.y1 = {};
	this.y2 = {};


	var wa = new WorkArea();
	var sz = new SZ();

	this.recalc = function()
	{
		wa.recalc();

		/*** Размер ячейки ***/
		self.cellSize = Math.floor(Math.sqrt( wa.width * wa.height / 90 ) / 10) * 10;
		if (self.cellSize < 50) self.cellSize = 50;
		if (self.cellSize > 150) self.cellSize = 150;

		sz.recalc(self.cellSize, wa);

		/*** Размеры карты ***/
		self.width.cell  = Math.ceil( sz.width  / self.cellSize ) + 2;
		self.height.cell = Math.ceil( sz.height / self.cellSize ) + 2;
		if (self.width.cell  % 2 < 1) self.width.cell++;
		if (self.height.cell % 2 < 1) self.height.cell++;

		self.width.px  = self.width.cell  * self.cellSize;
		self.height.px = self.height.cell * self.cellSize;

		/*if (wa.rect) wa.rect.setX(wa.x1).setY(wa.y1).width(wa.width).height(wa.height);
		if (sz.rect) sz.rect.setX(sz.x1).setY(sz.y1).width(sz.width).height(sz.height);*/

		/*** Координаты карты ***/

		self.x1.px = Math.floor((document.body.clientWidth  - self.width.px) / 2);
		self.y1.px = Math.floor((document.body.clientHeight - self.height.px) / 2);
		self.x2.px = self.x1.px + self.width.px;
		self.y2.px = self.y1.px + self.height.px;
	}
}















define('map', ['jquery', 'map__wa', 'map__sz', 'konva'], function ($, wa, sz, K) {

var map = { width: {}, height: {}, x1: {}, x2: {}, y1: {}, y2: {} }

map.recalc = function(){

	wa.recalc();

	/*** Размер ячейки ***/
	map.cellSize = Math.floor(Math.sqrt( wa.width * wa.height / 90 ) / 10) * 10;
	if (map.cellSize < 50) map.cellSize = 50;
	if (map.cellSize > 150) map.cellSize = 150;

	sz.recalc(map.cellSize, wa);

	/*** Размеры карты ***/
	map.width.cell  = Math.ceil( sz.width  / map.cellSize ) + 2;
	map.height.cell = Math.ceil( sz.height / map.cellSize ) + 2;
	if (map.width.cell  % 2 < 1) map.width.cell++;
	if (map.height.cell % 2 < 1) map.height.cell++;

	map.width.px  = map.width.cell  * map.cellSize;
	map.height.px = map.height.cell * map.cellSize;

	/*if (wa.rect) wa.rect.setX(wa.x1).setY(wa.y1).width(wa.width).height(wa.height);
	if (sz.rect) sz.rect.setX(sz.x1).setY(sz.y1).width(sz.width).height(sz.height);*/

	/*** Координаты карты ***/

	map.x1.px = Math.floor((document.body.clientWidth  - map.width.px) / 2);
	map.y1.px = Math.floor((document.body.clientHeight - map.height.px) / 2);
	map.x2.px = map.x1.px + map.width.px;
	map.y2.px = map.y1.px + map.height.px;

}
map.recalc();


map.drawMap = function(x, y)
{

	map.x1.cell = x - Math.ceil(map.width.cell / 2) + 1;
	map.x2.cell = map.x1.cell + map.width.cell - 1;
	map.y1.cell = y - Math.ceil(map.height.cell / 2) + 1;
	map.y2.cell = map.y1.cell + map.height.cell - 1;
	
	map.loadMap({x1: map.x1, x2: map.x2, y1: map.y1, y2: map.y2});

}


map.refreshMap = function(x, y)
{
	map.recalc();
	map.group.setX(0).setY(0);
	map.group.find('.cell').remove();
	map.group.find('Text').remove();
	map.drawMap(x, y);
}


map.createMap = function(x, y)
{

	/*wa.rect = new K.Rect({ x: wa.x1, y: wa.y1, width: wa.width, height: wa.height, stroke: 'red', strokeWidth: 1 })
	sz.rect = new K.Rect({ x: sz.x1, y: sz.y1, width: sz.width, height: sz.height, stroke: 'green', strokeWidth: 1 })
	map.layer.add(wa.rect); map.layer.add(sz.rect);*/

	//map.group.draggable('true');

	map.group = new K.Group({ x: 0, y: 0 });
	map.layer.add(map.group);

	map.drawMap(x, y);

	setInterval(function(){
		if ( map.group.x() + map.x1.px > sz.x1 ) map.createCell('x1');
		else if ( map.group.x() + map.x2.px < sz.x2 ) map.createCell('x2');
		if ( map.group.y() + map.y1.px > sz.y1 ) map.createCell('y1');
		else if ( map.group.y() + map.y2.px < sz.y2 ) map.createCell('y2');
	}, 100);
	
}


map.loadMap = function(a)
{
//console.log(a);
	// Отрисовка сетки
	for ( var i = {cell : a.x1.cell, px: a.x1.px}; i.cell <= a.x2.cell && i.px <= a.x2.px; i.cell++, i.px += map.cellSize )
	{

		for ( var j = {cell : a.y1.cell, px: a.y1.px}; j.cell <= a.y2.cell && j.px <= a.y2.px; j.cell++, j.px += map.cellSize )
		{

			map.group.add(
				new K.Rect({
					x: i.px + 0.5, y: j.px + 0.5,
					width: map.cellSize, height: map.cellSize,
					stroke: '#EEE', strokeWidth: 1,
					name: 'cell left' + i.px + ' top' + j.px + ' x' + i.cell + ' y' + j.cell
				})
			);
			map.group.add(new K.Text({ x: i.px, y: j.px, text: i.cell + ' ' + j.cell, fontSize: 10, fontFamily: 'Calibri', fill: '#000', name: 'left' + i.px + ' top' + j.px + ' x' + i.cell + ' y' + j.cell }));

		}

	}

	map.layer.draw();

}

map.createCell = function(line) {

	if (line == 'x1')
	{

		while (map.x2.px - map.x1.px >= map.width.px)
		{
			map.group.find('.left' + (map.x2.px - map.cellSize)).destroy();
			map.x2.px -= map.cellSize;
			map.x2.cell--;
		}
		map.x1.px -= map.cellSize;
		map.x1.cell--; 

		map.loadMap({x1: map.x1, x2: map.x1, y1: map.y1, y2: map.y2});

	}
	else if (line == 'x2')
	{

		while (map.x2.px - map.x1.px >= map.width.px)
		{
			map.group.find('.left' + map.x1.px).destroy();
			map.x1.px += map.cellSize;
			map.x1.cell++;
		}
		map.x2.cell++;

		map.loadMap({x1: map.x2, x2: map.x2, y1: map.y1, y2: map.y2});
		map.x2.px += map.cellSize;

	}
	else if (line == 'y1')
	{

		while (map.y2.px - map.y1.px >= map.height.px)
		{
			map.group.find('.top' + (map.y2.px - map.cellSize)).destroy();
			map.y2.px -= map.cellSize;
			map.y2.cell--;
		}
		map.y1.px -= map.cellSize;
		map.y1.cell--;

		map.loadMap({x1: map.x1, x2: map.x2, y1: map.y1, y2: map.y1});

	}
	else if (line == 'y2')
	{

		while (map.y2.px - map.y1.px >= map.height.px)
		{
			map.group.find('.top' + map.y1.px).destroy();
			map.y1.px += map.cellSize;
			map.y1.cell++;
		}
		map.y2.cell++;

		map.loadMap({x1: map.x1, x2: map.x2, y1: map.y2, y2: map.y2});
		map.y2.px += map.cellSize;
	}
}

map.takeXYpx = function(x, y)
{
	x = map.x1.px + (x - map.x1.cell) * map.cellSize;
	y = map.y1.px + (y - map.y1.cell) * map.cellSize;
	return {x: x, y: y}
}

map.takeXYcell = function(x, y)
{
	//console.log(x, map.x1.px, map.group.x(), map.cellSize, map.x1.cell);
	x = Math.ceil((x - (map.x1.px + map.group.x())) / map.cellSize) + map.x1.cell - 1;
	y = Math.ceil((y - (map.y1.px + map.group.y())) / map.cellSize) + map.y1.cell - 1;
	return {x: x, y: y}
}

return map;

});