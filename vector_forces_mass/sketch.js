var movers = [];

function setup() {
	createCanvas(400, 500);
  for (var i = 0; i < 5; i++) {
    movers.push(new Mover());
  }
}

function draw() {
	background(0);

	var f = createVector(0, 0.1);	
  for (var i = 0; i < movers.length; i++) {
	movers[i].applyForce(f);

	movers[i].update();
	movers[i].edges();
	movers[i].display(); 
  }
}

function mousePressed() {
		f = createVector(0.2, 0);	
		m.applyForce(f);
}
