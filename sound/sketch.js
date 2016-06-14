var tune;
var sliderVolume;
// var sliderRate;
// var sliderPan;
var col = 0;

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
  backCol = noise(col);
  backCol = map(backCol, 0, 1, 0, 255); 
  background(Math.floor(backCol));
  // tune.pan(sliderPan.value());
  // tune.rate(sliderRate.value());
  tune.setVolume(sliderVolume.value());
  col += 0.001;
}
