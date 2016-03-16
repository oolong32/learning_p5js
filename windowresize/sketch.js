var things = [];

function generate_things() {
	// define with of fields
	var raster_field = 40;
	// calculate excess space
	var margin_x = width % raster_field;
	var margin_y = width % raster_field;
	// calculate number of fields in canvas
	var rasterfields_x = floor((width - margin_x) / raster_field);
	var rasterfields_y = floor((height - margin_y) / raster_field);
	// find starting point
	var origin_x = floor(margin_x * .5);
	var origin_y = floor(margin_y * .5);
	// write objects to array
	var x = origin_x;
	for (var i = 0; i < rasterfields_x; i++) {
		var y = origin_y;
		for (var j = 0; j < rasterfields_y; j++) {
			things.push(new Thing(x, y, raster_field));
			y = y + raster_field;
		}
		x = x + raster_field;
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);  
	// is this the right way to do this? (see windowResized function)
	things = [];
	generate_things();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	things = [];
	generate_things();
}

function draw() {
	background(100);
	for (var i = 0; i < things.length; i++) {
		things[i].draw_it();
	}
}
