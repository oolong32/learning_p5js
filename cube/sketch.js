var cubes = [];
MARGIN = 20;
RASTER = 100;

function setup() {
	createCanvas(600, 800);
	for (var y = (((height - RASTER) % (MARGIN + RASTER)) / 2); y < height - RASTER; y += (MARGIN + RASTER)) {
		for (var x = (((width - RASTER) % (MARGIN + RASTER)) / 2); x < width - RASTER; x += (MARGIN + RASTER)) {
			cubes.push(new Cube(x + RASTER * 0.1, y + RASTER * 0.1, RASTER * 0.8, RASTER * 0.8));
		}
	}
	console.log(cubes);

}

function draw() { 
	for (var i = cubes.length - 1; i >= 0; i--) {
		cubes[i].display();
	}
}
