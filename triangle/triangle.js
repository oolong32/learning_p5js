function Triangle ( x, y, limit ) {

  // define upper left corner of raster field
  this.x_reference = x;
  this.y_reference = y;

  // define lower right corner of raster field
  this.x_limit = x + limit;
  this.y_limit = y + limit;

  // draw three points within the raster field
  this.p1 = createVector( Math.floor( random( x, x + limit * 0.3 )), Math.floor( random( y, y + limit * 0.3 )));
  this.p2 = createVector( Math.floor( random( x + limit * 0.6, x + limit )), Math.floor( random( y, y + limit * 0.3 )));
  this.p3 = createVector( Math.floor( random( x + limit * 0.4, x + limit * 0.6 )), random( y + limit * 0.6, y + limit ));

  // draw the triangle
  this.display = function() {
    // for debugging: create rectangle to check raster
    // rect(this.x_reference, this.y_reference, limit, limit);
    triangle( this.p1.x, this.p1.y, this.p2.x, this.p2.y,this.p3.x, this.p3.y );
  };

  // move the three points
  this.redraw = function ( xoff ) {
    this.p1.x = map(noise( xoff ), 0, 1, this.x_reference, this.x_limit );
    this.p1.y = map(noise( xoff ), 0, 1, this.y_reference, this.y_reference + limit * .5 );

    this.p2.x = map( noise( xoff ), 0, 1, this.x_reference + limit * .5, this.x_limit );
    this.p2.y = map( noise( xoff ), 0, 1, this.y_reference + limit * .5, this.y_limit );

    this.p3.x = map( noise( xoff ), 0, 1, this.x_reference, this.x_reference + limit * .5 );
    this.p3.y = map( noise( xoff ), 0, 1, this.y_reference + limit * .5, this.y_limit );
  }
}
