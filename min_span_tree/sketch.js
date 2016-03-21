// Solves minimal spanning tree problem by way of Prim’s Algorhythm

var vertices = [];

function setup() {
	createCanvas(640, 360); 
	// Instead of func. mousePressed, there could be random points
	// If so, the computing of the lines should be moved into setup as it only needs to happen once. With points being added at runtime, recomputing needs to happen constantly (or always when a point is added)
	/*
	for (var i = 0; i < 50; i+=1) {
		var v = createVector(random(width), random(height));
		vertices.push(v);
	}
	*/
}

function mousePressed() {
	var v = createVector(mouseX, mouseY);
	vertices.push(v);
}

function draw() {
	background(51); 
	var reached = [];
	var unreached = [];

for (var i = 0; i < vertices.length; i+=1) {
		unreached.push(vertices[i]);
	}

	reached.push(unreached[0]);
	unreached.splice(0, 1);

	while (unreached.length > 0) {
		var record = 100000;
		var rIndex;
		var uIndex;

		for (var i = 0; i < reached.length; i+=1) {
			for (var j = 0; j < unreached.length; j+=1) {
				var v1 = reached[i];
				var v2 = unreached[j];
				var d = dist(v1.x, v1.y, v2.x, v2.y);

				if (d < record) {
					record = d;
					rIndex = i;
					uIndex = j;
				}
			}
		}

		stroke(255);
		strokeWeight(2);
		line(reached[rIndex].x, reached[rIndex].y, unreached[uIndex].x, unreached[uIndex].y);

		reached.push(unreached[uIndex]);
		unreached.splice(uIndex, 1);

	}

for (var i = 0; i < vertices.length; i+=1) {
		fill(255);
		stroke(255);
		ellipse(vertices[i].x, vertices[i].y, 16, 16);
	}
}
