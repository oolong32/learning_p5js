/* set width and height of single raster field */
var FIELD = 27;

/* set margin between fields of raster */
var MARGIN = 8;

function createRaster() {
  background(0);

  /* move raster into the center of the canvas */
  var origin_x = ((width - (FIELD + MARGIN)) % (FIELD + MARGIN)) / 2;
  var origin_y = ((height - (FIELD + MARGIN)) % (FIELD + MARGIN)) / 2;

  /* create raster with margin between fields */
  for ( var y = origin_y; y < (height - FIELD); y += (FIELD + MARGIN) ) {
    for ( var x = origin_x; x < (width - FIELD); x += (FIELD + MARGIN) ) {
      ellipseMode(CORNER);
      fill(random(255));
      ellipse(x, y, FIELD, FIELD);
    }
  }
}

function setup() {
  createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  noStroke(); // if there is a stroke of 1px, the margin seems to loose 1px

  createRaster();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createRaster();
}

function draw() {
	//background(255);
}
