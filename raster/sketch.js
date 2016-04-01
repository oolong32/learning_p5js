var w = 520;
var h = 460;
var raster = 84;
var margin_x = (w % raster) / 2;
var margin_y = (h % raster) / 2; 

function setup() {
  createCanvas(w, h);
}

function draw() {
	var sw = 1;
	for (var i = margin_x; i < w - margin_x; i += raster) {
		for (var j = margin_y; j < h - margin_y; j += raster) {
			rect(i, j, raster, raster);
		}
	}
}
