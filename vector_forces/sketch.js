var movers = [];

function setup() {
	createCanvas(400, 500);
	for ( var i = 0; i < 20; i++ ) {
		movers.push(new Mover());

	}
	for ( var i = 0; i < movers.length; i++ ) {
		console.log(movers[i].position);
	}
}

function draw() {
	background(0);
	for ( var i = 0; i < movers.length; i++ ) {
		movers[i].move();
		movers[i].edges();
		movers[i].display(); 
	}
}
