function Cube(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.inner_x = random(this.x + this.w * 0.1, this.x + this.w * 0.6);
	this.inner_y = random(this.y + this.h * 0.1, this.y + this.h * 0.6);
	this.inner_w = random(this.w * 0.1, this.w * 0.3);
	this.inner_h = random(this.h * 0.1, this.h * 0.3);

	this.display = function() {
		rect(this.x, this.y, this.w, this.h);
		line(this.x, this.y, this.inner_x, this.inner_y);
		line(this.x + this.w, this.y, this.inner_x + this.inner_w, this.inner_y);
		line(this.x, this.y + this.h, this.inner_x, this.inner_y + this.inner_h);
		line(this.x + this.w, this.y + this.h, this.inner_x + this.inner_w, this.inner_y + this.inner_h);
		rect(this.inner_x, this.inner_y, this.inner_w, this.inner_h);
	}
}
