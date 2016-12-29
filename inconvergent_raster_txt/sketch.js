var rows;
var cols;
var cell_w = 35;
var cell_h = 38;
var points = []

function setup() {
	createCanvas(windowWidth, windowHeight);  
  background(5);
	generate_points();
}

function generate_points() {

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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	points = [];
  background(5);
	generate_points();
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
  background(5);
  noFill();
  stroke(200, 200, 200);

  // draw grid
  for (var i = 0; i < points.length; i++) {
    // every dot moves at random a bit
    points[i].update();

    // get surrounding dots
    var si = getSurroundingIndexes(i, (cols + 1));
    var existing_si = si.filter(function(foo) {return foo >= 0 && foo < points.length;});
    var average_x = existing_si.map(function(foo) {return points[foo].x}).reduce(function(bar, baz) {return bar + baz}) / existing_si.length;
    var average_y = existing_si.map(function(foo) {return points[foo].y}).reduce(function(bar, baz) {return bar + baz}) / existing_si.length;
    // a bit proud to use higher order functions
    // very much ashamed of arguments’ names
    points[i].moveToAverage(average_x, average_y);
  }
}

// Define ‘Dot’ object
var Dot = function(posx, posy) {
  this.x = posx;
  this.y = posy;
  this.weight = random(0, 1); // scalar for average position
  this.open = (random(0, 1) > 0.5) ? true : false;
  this.txt = this.open ? "2017" : "happy";
  this.angle = 0;
  this.c = color(random(100, 250), random(50, 250), random(150, 255), 175);

  this.update = function() {
    if (this.x > width) {
      this.x = width - 1;
    } else if (this.x < 0) {
      this.x = 1;
    } else {
      this.x += random(-2, 2);
    }
    if (this.y > height) {
      this.y = height - 1;
    } else if (this.y < 0) {
      this.y = 1;
    } else {
      this.y += random(-2, 2);
    }
  }

  this.moveToAverage = function(x, y) {
    var curPos = createVector(this.x, this.y);
    var newPos = createVector(x, y);
    var difVec = p5.Vector.sub(newPos, curPos);
    var lilVec = difVec.normalize();
    var orientation = this.open ? 1 : -1;
    lilVec.mult()
    lilVec.mult(this.weight);
    this.x += lilVec.x;
    this.y += lilVec.y;
    
    var mouseVector = createVector(mouseX, mouseY);
    var textVector = createVector(x, y);
    var mouseToTextVector = mouseVector.sub(textVector);

    push();
    translate(x, y);
    // line(0, 0, mouseToTextVector.x, mouseToTextVector.y);
    this.angle = atan(mouseToTextVector.y/mouseToTextVector.x);
    rotate(this.angle);
    noStroke();
    // c = this.open ? color(0, 150, 255) : color(190, 80, 50);
    fill(this.c);
    textSize(35 * this.weight);
    textFont("comic sans ms");
    text(this.txt, 0 - textWidth(this.text)/4, 0);
    pop();
    
  }
}
