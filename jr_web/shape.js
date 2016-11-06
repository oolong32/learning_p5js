function Shape(x, y, w, h) {
	this.raster_origin_x = x;
	this.raster_origin_y = y;
	// the center of the shape
	// reference point / origin of the ellipse()
	this.x = x + RASTER / 2;
	this.y = y + RASTER / 2;
	// width, heigth (equal for the moment)
	this.size_x = w;
	this.size_y = h;
	// calculate the limits the shape is allowed to move within
	this.raster_top = this.raster_origin_y + this.size_y / 2;
	this.raster_right = this.raster_origin_x + RASTER - this.size_x / 2;
	this.raster_bottom = this.raster_origin_y + RASTER - this.size_y / 2;
	this.raster_left = this.raster_origin_x + this.size_x / 2;
	// calculate center of raster field
	this.raster_center_x = this.raster_origin_x + RASTER / 2;
	this.raster_center_y = this.raster_origin_y + RASTER / 2;
	// Color
  this.colored = false;
	this.col = color(123, 200);

  var orange = color( 248, 128, 23 );
  var violet = color( 137, 59, 255);
  var green = color( 0, 255, 0);
  var colors = [ orange, violet, green ]

	/* Methods */

	// move shape back to center of raster field
	this.go_center = function() {
		if (this.x > this.raster_center_x) {
			this.x = this.x - 1;
		} else if (this.x < this.raster_center_x) {
			this.x = this.x + 1;
		}

		if (this.y > this.raster_center_y) {
			this.y = this.y - 1;
		} else if (this.y < this.raster_center_y) {
			this.y = this.y + 1;
		}
	}

	// move shape orthogonally by 1 or -1
	this.move_shape = function() {
		this.x = this.x + parseInt(random(-2, 2));
		this.y = this.y + parseInt(random(-2, 2));
	}

	// display an ellipse
	this.draw_shape = function() {
		// fill(this.r, this.g, this.b);
		fill(this.col);
		ellipseMode(CENTER);
		ellipse(this.x, this.y, this.size_x, this.size_y);
		// for debugging
		/*
		noFill();
		stroke(110, 120, 0);
		rectMode(CORNER);
		rect(this.raster_origin_x, this.raster_origin_y, RASTER, RASTER);
		stroke(0, 190, 180);
		rect(this.raster_left, this.raster_bottom, this.raster_right - this.raster_left, this.raster_top - this.raster_bottom);
		fill(255, 0, 100);
		ellipse(this.raster_center_x, this.raster_center_y, 8, 8);
		fill(0, 100, 255);
		ellipse(this.x, this.y, 3, 3)
		*/
	}

	// function triggered by mousePressed
	this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size_x / 2) {
      if ( this.colored == false ) {
        var randIndex = Math.floor( random( 0, 3 ) );
        this.col = colors[ randIndex ];
        this.colored = true;
      } else { 
        console.log( "ho" );
        this.col = color( 123, 200 );
        this.colored = false;
      }
    }
	}
}
