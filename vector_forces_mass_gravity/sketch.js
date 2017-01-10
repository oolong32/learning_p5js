var m;
var a;

function setup() {
  createCanvas(640, 360);
  m = new Mover();
  a = new Attractor();
}

function draw() {
  background(0);

  var gravity = a.attract(m);
  // scale gravity according to object’s mass
  // gravity.mult(m.mass);
  m.applyForce(gravity);

  m.update();
  m.edges();
  m.display(); 
  a.display();
}

function mouseMoved() {
  a.handleHover(mouseX, mouseY);
}

function mousePressed() {
  a.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  a.handleHover(mouseX, mouseY);
  a.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  a.stopDragging();
}
