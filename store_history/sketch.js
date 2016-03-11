var things = [];

function Thing(x, y) {
	this.x = x;
	this.y = y;
	this.history = [];
	this.size = random(5,10);
	this.r = random(120, 255);
	this.g = random(120, 255);
	this.b = random(120, 255);
	this.col = color(this.r, this.g, this.b);

	this.update = function() {
		var v = createVector(this.x, this.y);
		this.history.push(v);
		if (this.history.length > 30) {
			this.history.splice(0, 1);
		}
		r1 = random(-5, 5);
		r2 = random(-5, 5);
		this.x = this.x + r1;
		this.y = this.y + r2;
		// update history as well
		for (var i = 0; i < this.history.length; i++) {
			this.history[i].x += random(-2, 2);
			this.history[i].y += random(-2, 2);
		}
	}

	this.draw_thing = function() {
		ellipseMode(CENTER);
		// draw the thing’s history
		/*
		var size = this.size;
		for (var i = 0; i < this.history.length; i++) {
			var pos = this.history[i];
			var size = size * .9;
			stroke(this.col);
			noFill();
			ellipse(pos.x, pos.y, size, size);
		}
		*/

	 // draw history as path
	 noFill();
	 stroke(80);
	 //stroke(this.col);
	 beginShape();
	 for (var i = 0; i < this.history.length; i++) {
		 var pos = this.history[i];
		 vertex(pos.x, pos.y);
	 } 
	 endShape();
	

	// draw the thing
	noStroke();
	fill(this.col);
	ellipse(this.x, this.y, this.size, this.size);
}
}

function mousePressed() {
	things.push(new Thing(mouseX, mouseY));
}

function setup() {
createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
for (var i = 0; i < 100; i++) {
	var x = random(0, width);
	var y = random(0, width); 
		things.push(new Thing(x, y));
	}
}

function draw() {
	background(0);
	for (var i = 0; i < things.length; i++) {
		things[i].update();
		things[i].draw_thing();
	} 
}
