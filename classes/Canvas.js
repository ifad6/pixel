function Canvas()
{
	var self = this;
	var layer;

	this.create = function (containerID, id)
	{
		var container = document.getElementById(containerID);
		container.style.position = 'relative';

		var canvas = document.createElement('canvas');
		canvas.setAttribute('id', id);
		container.appendChild(canvas);

		layer = document.getElementById(id);
		layer.style.position = 'absolute';
		return self;
	}
	this.set = function (id) {
		layer = document.getElementById(id);
		return self;
	}
	this.setSize = function (x, y) {
		layer.width = self.width = x || document.body.clientWidth;
		layer.height = self.height = y || document.body.clientHeight;
		return self;
	},
	this.setPosition = function(x, y) {
		self.x = layer.style.left = x + 'px';
		self.y = layer.style.top = y + 'px';
		return self;
	},
	this.getContext = function () {
		return layer.getContext('2d');
	},
	this.setFrameRate = function (rate) {
		self.frameRate = rate;
		self.frameTime = Math.round(1000 / self.frameRate);
		return self;
	}
}