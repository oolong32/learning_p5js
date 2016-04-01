function setup() {
	createCanvas(320, 240); 
	pixelDensity(1);
}

function draw() {
	background(51);

	loadPixels();


	for (var y = 0; y < height; y += 1) {
		for (var x = 0; x < width; x += 1) {
			var index = (y * width + x) * 4;
				pixels[index + 0] = 255;
				pixels[index + 1] = 0;
				pixels[index + 2] = 255;
				pixels[index + 3] = 255;
			/*
			for (var p = 0; p < 4; p += 1) {
				pixels[index + p] = 255;
			}
			*/
		}
	}
  
	updatePixels();

}
