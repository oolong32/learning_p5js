function Foo(x, y, d) {
	this.x = x + d;
	this.y = y + d;
	this.r = d;
	this.col = color(255, 255, 255);
	
	this.display = function() {
		noStroke()
		fill(this.col);
		ellipseMode(CENTER);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}

	this.move = function() {
		this.x = this.x + random(-1, 1);
		this.y = this.y + random(-1, 1);
	}

	this.intersect = function(other) {
		if (dist(this.x, this.y, other.x, other.y) < this.r + other.r) {
			return true;
		} else {
			return false;
		}
	}

	this.change_color = function() {
		this.col = color(random(255), random(255), random(255))
	}
}
