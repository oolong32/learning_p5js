function setup() {
  createCanvas(500, 300)
}

var mouse;
var center;

function draw() {
  background(120);
  strokeWeight(2);
  stroke(0, 255, 255);
  noFill();
  
  translate(width/2, height/2);
  ellipse(0, 0, 4, 4);
 
  mouse = createVector(mouseX, mouseY);
  center = createVector(width/2, height/2);
  foo = mouse.sub(center);
  line(0, 0, foo.x, foo.y);
}
