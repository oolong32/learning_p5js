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

		var wind = createVector(0.2, 0);	
		movers[i].applyForce(wind);

    // apply friction
    friction = movers[i].velocity.copy();
    friction.normalize();
    friction.mult(-1);
    var c = 0.1; // friction coeficient (arbitrarily set)
    friction.mult(c);
    movers[i].applyForce(friction);

    movers[i].update();
    movers[i].edges();
    movers[i].display(); 
  }
}
