var tune,
amp,
button,
sliderVolume;

function setup() {
  createCanvas( 200, 200 );
  tune = loadSound( "beat.mp3", loaded );
  sliderVolume = createSlider( 0, 1, 0.5, 0.01 );
  amp = new p5.Amplitude();
  background( 51 );
}

function loaded() {
  button = createButton( "pause" );
  button.mousePressed( togglePlaying );
  tune.play();
  button.html( "pause" );
}

function togglePlaying() {
  if ( !tune.isPlaying() ) {
    tune.play();
    button.html( "pause" );
  } else {
    tune.pause();
    button.html( "play" );
  }
}

function draw() {
  tune.setVolume( sliderVolume.value() );
  background( 51 );
  noStroke();
  fill( 255 );
  var ampRate = map( amp.getLevel(), 0, 1, 10, 200 );
  ellipse( width / 2, height / 2, ampRate, ampRate );
}
