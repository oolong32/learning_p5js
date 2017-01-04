var movers = [];

function setup() {
	createCanvas(400, 500);
  for (var i = 0; i < 5; i++) {
    movers.push(new Mover());
  }
}

function draw() {
	background(0);


  for (var i = 0; i < movers.length; i++) {
    var gravity = createVector(0, 0.3);	
    // scale gravity according to object’s mass
    gravity.mult(movers[i].mass);
    movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].edges();
    movers[i].display(); 
  }
}

function mousePressed() {
		f = createVector(0.2, 0);	
		m.applyForce(f);
}
