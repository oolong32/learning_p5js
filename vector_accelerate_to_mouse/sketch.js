var walkers = [];

function setup() {
	createCanvas(400, 500);
	for ( var i = 0; i < 20; i++ ) {
		walkers.push(new Walker());

	}
	for ( var i = 0; i < walkers.length; i++ ) {
		console.log(walkers[i].position);
	}
}

function draw() {
	background(0);
	for ( var i = 0; i < walkers.length; i++ ) {
		walkers[i].move();
		walkers[i].checkEdges();
		walkers[i].display(); 
	}
}
