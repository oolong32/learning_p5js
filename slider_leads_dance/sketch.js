var sliders = [];
angle = 0;

function setup() {
  noCanvas();
	for (var i = 0; i < 100; i++) {
		sliders[i] = createSlider(0, 255, 50);
	}
	sliders[0].input(adjustSliders);
}

function adjustSliders() {
	for (var i = 1; i < sliders.length; i++) {
		sliders[i].value(sliders[0].value());
	}
}
