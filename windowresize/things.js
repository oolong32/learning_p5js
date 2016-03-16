function Thing(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.col = (random(100, 200), 0, random(100, 200));
	this.draw_it = function() {
		fill(120, 0, 0);
		noStroke();
		ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size * .5, this.size * .5);
		fill(0);
		stroke(255);

	}
}
