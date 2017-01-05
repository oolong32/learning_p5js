 /* 
https://youtu.be/YvNiLmHXZ_U
*/

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

    // apply drag (formerly known as friction)
    var drag = movers[i].velocity.copy();
    drag.normalize();
    var c = -0.03; // drag coefficient (arbitrarily set)
    var speed = movers[i].velocity.magSq();
    drag.mult(c * speed * speed);
    movers[i].applyForce(drag);

    movers[i].update();
    movers[i].edges();
    movers[i].display(); 
  }
}
