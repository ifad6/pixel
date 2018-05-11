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


function Map (startX, startY)
{
	var self = this;

	this.layer = new window.Canvas();
	this.layer.create('container', 'map').setSize(document.body.clientWidth, document.body.clientHeight);
	var C = this.layer.getContext();

	this.cellSize = Math.floor(Math.sqrt(this.layer.width * this.layer.height / 90 ) / 10) * 10;
	if (this.cellSize < 50) this.cellSize = 50;
	if (this.cellSize > 150) this.cellSize = 150;

	this.width = {};
	this.height = {};
	this.width.cell  = Math.ceil(this.layer.width / this.cellSize) + 2;
	this.height.cell = Math.ceil(this.layer.height / this.cellSize) + 2;
	self.width.px  = this.width.cell  * this.cellSize;
	self.height.px = this.height.cell * this.cellSize;


	this.x1 = {};
	this.x2 = {};
	this.y1 = {};
	this.y2 = {};
	this.x1.px = Math.floor((this.layer.width  - this.width.px) / 2);
	this.y1.px = Math.floor((this.layer.height - this.height.px) / 2);
	this.x2.px = this.x1.px + this.width.px;
	this.y2.px = this.y1.px + this.height.px;
	this.x1.cell = startX - Math.ceil(this.width.cell / 2) + 1;
	this.x2.cell = this.x1.cell + this.width.cell - 1;
	this.y1.cell = startY - Math.ceil(this.height.cell / 2) + 1;
	this.y2.cell = this.y1.cell + this.height.cell - 1;

	this.draw = function()
	{
		C.clearRect(0, 0, self.layer.width, self.layer.height);
		C.beginPath();
		for (var i = self.x1.px; i <= self.x2.px; i += self.cellSize)
		{
			C.moveTo(i + 0.5, self.y1.px);
			C.lineTo(i + 0.5, self.y2.px);
		}
		for (var j = self.y1.px; j <= self.y2.px; j += self.cellSize)
		{
			C.moveTo(self.x1.px, j + 0.5);
			C.lineTo(self.x2.px, j + 0.5);
		}
		C.closePath();
		C.strokeStyle = '#EEE';
		C.lineWidth = 1;
		C.lineCap = 'round';
		C.stroke();
	}

	setInterval(function()
	{
		//var time = new Date().getTime();
		self.x1.px++;
		self.x2.px++;
		self.y1.px++;
		self.y2.px++;
		self.draw();
		//console.log('Время выполнения = ', new Date().getTime() - time);
	}, 10);



	/*for (var i = 0; i <= this.width.cell; i++)
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
	}*/






	//var wa = new WorkArea();
	//var sz = new SZ();

	this.recalc = function()
	{
		//wa.recalc();

		/*** Размер ячейки ***/

		//sz.recalc(self.cellSize, wa);

		/*** Размеры карты ***/

		/*if (self.width.cell  % 2 < 1) self.width.cell++;
		if (self.height.cell % 2 < 1) self.height.cell++;*/

		/*if (wa.rect) wa.rect.setX(wa.x1).setY(wa.y1).width(wa.width).height(wa.height);
		if (sz.rect) sz.rect.setX(sz.x1).setY(sz.y1).width(sz.width).height(sz.height);*/

		/*** Координаты карты ***/
	}

	this.createMap = function(x, y)
	{
		self.recalc();
		/*wa.rect = new K.Rect({ x: wa.x1, y: wa.y1, width: wa.width, height: wa.height, stroke: 'red', strokeWidth: 1 })
		sz.rect = new K.Rect({ x: sz.x1, y: sz.y1, width: sz.width, height: sz.height, stroke: 'green', strokeWidth: 1 })
		map.layer.add(wa.rect); map.layer.add(sz.rect);*/

		//map.group.draggable('true');

		/*map.group = new K.Group({ x: 0, y: 0 });
		map.layer.add(map.group);*/

		map.drawMap(x, y);

		/*setInterval(function(){
			if ( map.group.x() + map.x1.px > sz.x1 ) map.createCell('x1');
			else if ( map.group.x() + map.x2.px < sz.x2 ) map.createCell('x2');
			if ( map.group.y() + map.y1.px > sz.y1 ) map.createCell('y1');
			else if ( map.group.y() + map.y2.px < sz.y2 ) map.createCell('y2');
		}, 100);*/
	}



	this.drawMap = function(x, y)
	{
		

		self.loadMap({x1: self.x1, x2: self.x2, y1: self.y1, y2: self.y2});
	}


	this.refreshMap = function(x, y)
	{
		map.recalc();
		map.group.setX(0).setY(0);
		map.group.find('.cell').remove();
		map.group.find('Text').remove();
		map.drawMap(x, y);
	}

	this.loadMap = function(a)
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

	this.createCell = function(line) {

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

	this.takeXYpx = function(x, y)
	{
		x = map.x1.px + (x - map.x1.cell) * map.cellSize;
		y = map.y1.px + (y - map.y1.cell) * map.cellSize;
		return {x: x, y: y}
	}

	this.takeXYcell = function(x, y)
	{
		//console.log(x, map.x1.px, map.group.x(), map.cellSize, map.x1.cell);
		x = Math.ceil((x - (map.x1.px + map.group.x())) / map.cellSize) + map.x1.cell - 1;
		y = Math.ceil((y - (map.y1.px + map.group.y())) / map.cellSize) + map.y1.cell - 1;
		return {x: x, y: y}
	}
}