/* set raster and margin/gutter */
var FIELD = 32;
var MARGIN = 5;

var triangles = [];

/* perlin noise offset */
var xoff = 0;

function setup() {
  createCanvas(500, 500);

  /* move raster into the center of the canvas */
  var origin_x = ((width - (FIELD + MARGIN)) % (FIELD + MARGIN)) / 2;
  var origin_y = ((height - (FIELD + MARGIN)) % (FIELD + MARGIN)) / 2;

  /* create raster with margin between fields */
  for ( var y = origin_y; y < (height - FIELD); y += (FIELD + MARGIN) ) {
    for ( var x = origin_x; x < (width - FIELD); x += (FIELD + MARGIN) ) {
      triangles.push(new Triangle( x, y, FIELD ));
    }
  }
}

function draw() {
  background(0);
  stroke(255);
  // noFill();

  var allTriangles = triangles.length;
  var i = 0;
  for ( ; i < allTriangles; i++ ) {
    triangles[i].redraw( xoff + i * 10 );
    triangles[i].display();
  }
  xoff += 0.01;

}
