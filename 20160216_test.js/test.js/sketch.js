var SIZE = 40;
var shapes = [];

function Shape(x, y) {
  this.x = random(0, width);
  this.y = random(0, height);
  this.x = x;
  this.y = y;
  this.size_x = random(1, SIZE);
  this.size_y = random(1, SIZE);
  this.r = random(0, 256);
  this.g = random(0, 256);
  this.b = random(0, 256);
  
  this.draw_shape = function() {
    noFill();
    stroke(this.r, this.g, this.b);
    rect(this.x, this.y, this.size_x, this.size_y);
  }
  
  this.move_shape = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}

function setup() {
  fill(0)
  createCanvas(600, 400);
}

function mousePressed() {
  shapes.push(new Shape(mouseX, mouseY));
}

function draw() {
  background(0);
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].draw_shape();
    shapes[i].move_shape();
  }
  if (shapes.length > 9) {
    shapes.splice(0, 1);
  }
}