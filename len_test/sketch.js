// new approach to what i tried to do in "irr_raster"
var bar = [];

var sum_arr = function(a, l) {
	if (a.length > 0 && l > 0) {
		var c = 0;
		for (var z = 0; z < l; z += 1) {
			c += a[z];
		}
		return c;
	} else {
		return 0;
	} 
}

var split_length = function() {
	var x = 0;
	var arr = [];
	while (x < width) {
		var foo = Math.floor(random(10, 50));
		arr.push(foo);
		x += foo;
	}
	return arr;
}

function setup() {
  createCanvas(400, 200);
	background(80);
	stroke(255, 0, 100);
	strokeWeight(2);
	fill(0);
	for (var y = 0; y < height; y += 50) {
		bar = split_length();
		// sum of bar is higher than width, truncate last one
		var total = sum_arr(bar, bar.length);
		var difference = total - width;
		bar[bar.length - 1] -= difference + 1; // + 1 neccessary in order to display right border stroke of last rectangle
		for (var i = 0; i < bar.length; i += 1) {
			rect(sum_arr(bar, i), y, bar[i], 50);
		}
	}
}

function draw() {
  
}
