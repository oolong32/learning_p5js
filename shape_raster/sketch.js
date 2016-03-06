var RASTER = 50;
var MARGIN = 10;
var shapes = [];
var shapes_out = [];

function setup() {
	createCanvas(400, 600);
	noStroke();
	// move everything into the center of the stage
	var ORIGIN_X = ((width - RASTER) % (RASTER + MARGIN)) / 2;
	var ORIGIN_Y = ((height - RASTER) % (RASTER + MARGIN)) / 2;
	// go through rows & columns
	for (var r = ORIGIN_Y; r < height - RASTER; r += RASTER + MARGIN) {
		for (var c = ORIGIN_X; c < width - RASTER; c += RASTER + MARGIN) {
			d = random(RASTER * 0.25, RASTER);
			shapes.push(new Shape(c, r, d, d));
		}
	}
}

function mousePressed() {
	if (shapes.length > 0) {
		for (var s = shapes.length - 1; s >= 0 ; s--) {
			shapes[s].clicked();
		}	
	}
	if (shapes_out.length > 0) {
		for (var o = shapes.length - 1; o >= 0; o--) {
			shapes_out[o].clicked();
		}
	}
}

function draw() {
	background(255);
	// for loops below iterate backwards over array, because splicing results in skipping one entry.
	for (var s = shapes.length - 1; s >= 0 ; s--) {
		// check if object touches limit of raster field
		if (shapes[s].x < shapes[s].raster_left || shapes[s].x > shapes[s].raster_right || shapes[s].y < shapes[s].raster_top || shapes[s].y > shapes[s].raster_bottom) {
			//	write object that went too far to other array
			//  and delete object from original array
			//  there’s no need to call the draw_shape function here, as this shape will be drawn when iterating over shapes_out
			shapes_out.push(shapes[s]);
			shapes.splice(s, 1);
		} else {
			// draw objects that do fine
			// and move them randomly
			shapes[s].draw_shape();
			shapes[s].move_shape();
		}
	}
	// did we find objects at the limit of their allowed space?
	if (shapes_out.length > 0) {
		for (var o = shapes_out.length - 1; o >= 0 ; o--) {
			//	check if they have arrived at the center
			if (shapes_out[o].x == shapes_out[o].raster_center_x && shapes_out[o].y == shapes_out[o].raster_center_y) {
				// write object back to array containing the goodies
				// delete object from array containing the badies
				shapes_out[o].draw_shape();
				shapes.push(shapes_out[o]);
				shapes_out.splice(o, 1);
			} else {
				//	draw objects that will be moving to the center
				//	move them back to the center
				shapes_out[o].draw_shape();
				shapes_out[o].go_center();
			}
		}
	}
}
