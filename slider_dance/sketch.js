var sliders = [];
angle = 0;

function setup() {
  noCanvas();
	for (var i = 0; i < 100; i++) {
		sliders[i] = createSlider(0, 255, 50);
	}
}

function draw() {
	var offset = 0;
	for (var i = 0; i < sliders.length; i++) {
		var val = map(sin(angle + offset), -1, 1, 0, 255);
		sliders[i].value(val);
		angle += 0.001;
		offset += 0.01;
	}
}
