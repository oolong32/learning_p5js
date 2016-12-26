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

  // slow it down
  //frameRate(4);
  
}

function getSurroundingIndexes(index, elementsPerRow) {
  var surroundingIndexes= [];
  if (index % elementsPerRow === 0) {
    // index on left border
    var h_start = 0;
  } else {
    var h_start = -1;
  }
  if (index % elementsPerRow === elementsPerRow - 1) {
    // index on righthand border
    var h_stop = 0;
  } else {
    var h_stop = 1;
  }
  for (var v = -1; v <= 1; v++) {
    for (var h = h_start; h <= h_stop; h++) {
      var current = index + elementsPerRow * v + h;
      if (current != index) {
        surroundingIndexes.push(current);
      }
    }
  }
  return surroundingIndexes;
}

function draw() {
  background(0);
  noFill();
  stroke(200, 200, 200);

  // draw grid
  for (var i = 0; i < points.length; i++) {
    // every dot moves at random a bit
    points[i].update();

    // every dot tries to move to the average position of its neighbours

    // get surrounding dots
    var si = getSurroundingIndexes(i, (cols + 1));
    var existing_si = si.filter(function(foo) {return foo >= 0 && foo < points.length;});
    var average_x = existing_si.map(function(foo) {return points[foo].x}).reduce(function(bar, baz) {return bar + baz}) / existing_si.length;
    var average_y = existing_si.map(function(foo) {return points[foo].y}).reduce(function(bar, baz) {return bar + baz}) / existing_si.length;
    // a bit proud to use higher order functions
    // very much ashamed of arguments’ names
    push();
    stroke(255, 0, 255);
    line(points[i].x, points[i].y, average_x, average_y);
    pop();
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

// Define ‘Dot’ object
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
