var font;
var vehicles = [];

function preload() {
  font = loadFont('NeueNeue-Medium.otf');
}

function setup() {
  createCanvas(800, 300);
  textFont(font);

  var points = font.textToPoints('Oolong', 10, 200, 192);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(20);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.show();
  }
}
