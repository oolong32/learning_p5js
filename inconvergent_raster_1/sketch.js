var rows;
var cols;
var cell_w = 70;
var cell_h = 72;
var points = []

function setup() {
  createCanvas(500, 500);
  background(0);

  // set up grid
  cols = Math.floor(width / cell_w);
  rows = Math.floor(height / cell_h);
  
  // define margins
  offset_x = (width % cell_w) / 2;
  offset_y = (height % cell_h) / 2;

  // generate points in grid
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j <= cols; j++) {
      points.push(new Dot(j*cell_w + offset_x, i*cell_h + offset_y));
    }
  }
  
}

function draw() {
  background(0);
  noFill();
  stroke(200, 200, 200);

  // draw grid
  for (var i = 0; i < points.length; i++) {
    points[i].update();
    points[i].display();
  }

  // draw lines horizontally
  for (var i = 0; i <= rows ; i++) {
    beginShape();
    for (var j = 0; j <= cols; j++) {
      var currentIndex = j + i * (cols + 1);
      vertex(points[currentIndex].x, points[currentIndex].y);
    }
    endShape();
  }

  // draw lines horizontally
  for (var i = 0; i <= cols ; i++) {
    beginShape();
    for (var j = 0; j <= rows; j++) {
      var currentIndex = i + j * (cols + 1);
      vertex(points[currentIndex].x, points[currentIndex].y);
    }
    endShape();
  }

}

var Dot = function(x, y) {
  this.x = x;
  this.y = y;

  this.update = function() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  this.display = function() {
    push();
    stroke(0, 180, 255);
    var s = 10;
    ellipse(this.x, this.y, s, s);
    pop();
  }
}
