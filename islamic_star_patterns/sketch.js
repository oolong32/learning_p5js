// Dan Shiffman, Coding Challenge #54.1: Islamic Star Patterns
// https://youtu.be/sJ6pMLp_IaI

var polys = [];
var angle = 60;
var delta = 10;
var deltaSlider;
var angleSlider;

function setup() {
  createCanvas(400, 400);
  background(0);

  // grid
  var cell = 120;
  var rows = floor(height / cell);
  var cols = floor(width / cell);
  var offset_x = width % cell / 2;
  var offset_y = height % cell / 2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      var x = offset_x + col * cell;
      var y = offset_y + row * cell;
      poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + cell, y);
      poly.addVertex(x + cell, y + cell);
      poly.addVertex(x, y + cell);
      poly.close();
      polys.push(poly);
    }
  }
 
  // sliders
  deltaSlider = createSlider(0, cell/2, cell);
  angleSlider = createSlider(0, 90, 60);
}

function draw() {
  background(0);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  
  for (var p = 0; p < polys.length; p++) {
    polys[p].hankin();
    polys[p].show();
  }
}
