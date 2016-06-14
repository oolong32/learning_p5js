var rasterSlider, circleDimension;
var rasterField;

function setup() {
  createCanvas(400, 300);
  background(0);
  fill(255);
  noStroke();
  circleDimension = createSlider(1, rasterField, rasterField / 2, 1);
  backgroundValue = createSlider(0, 255, 0, 1);
  colorValue = createSlider(0, 255, 127, 1);
}

function draw() {
  background(backgroundValue.value());
  fill(colorValue.value(), 0, 120);

  // set up raster
  rasterField = 50;
  var horizontalRest = width % rasterField;
  var verticalRest = height % rasterField;
  var rightLimit;
  var bottomLimit;

  if ( horizontalRest == 0 ) {
    rightLimit = width;
  } else {
    rightLimit = width - rasterField;
  }

  if ( verticalRest == 0 ) {
    bottomLimit = height;
  } else {
    bottomLimit = height - rasterField;
  }

  var i = horizontalRest * 0.5;
  for ( ; i < rightLimit; i += rasterField ) {
    var j = verticalRest * 0.5;
    for ( ; j < bottomLimit; j += rasterField ) {
      ellipse(i + rasterField * .5, j + rasterField * .5, circleDimension.value() * .5, circleDimension.value() * .5);
    } 
  }
}
