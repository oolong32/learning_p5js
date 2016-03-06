var SIZE = 100;
var MARGIN = 20;
var FOOS = [];
var NEST = [];

function setup() {
	createCanvas(400, 600);
	for (var y = ((height - SIZE) % (SIZE + MARGIN)) / 2; y < height - SIZE; y += SIZE + MARGIN) {
		for (var x = ((width - SIZE) % (SIZE + MARGIN)) / 2; x < width - SIZE; x += SIZE + MARGIN) {
			FOOS.push(new Foo(x, y, SIZE / 2));
		}
	}
}

function draw() {
	fill(0);
	rect(0, 0, width, height);
	for (var f = FOOS.length - 1; f >= 0; f--) {
		FOOS[f].display();
		FOOS[f].move(); 
		for (var g = f - 1; g >= 0; g--) {
			if (f != g && FOOS[f].intersect(FOOS[g])) {
				FOOS[f].change_color();
				FOOS[g].change_color();
			}
		}
	}
}
