var tune;
var sliderVolume;
// var sliderRate;
// var sliderPan;

function setup() {
  createCanvas(300, 400);

  tune = loadSound("beat.mp3", loaded);

  // sliderRate = createSlider(0, 3, 1, 0.01);
  // sliderPan = createSlider(0, 1, 0.5, 0.01);
  sliderVolume = createSlider(0, 1, 0.5, 0.01);

  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function loaded() {
  tune.play();
}

function togglePlaying() {
  if ( !tune.isPlaying() ) {
    tune.play();
    button.html("pause");
  } else {
    tune.pause();
    button.html("play");
  }
}

function draw() {
  background(random(255));
  // tune.pan(sliderPan.value());
  // tune.rate(sliderRate.value());
  tune.setVolume(sliderVolume.value());
}
