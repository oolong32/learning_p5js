var wave;
var env;
var playing;
var button;

function setup() {
  createCanvas( 100, 100 );

  button = createButton( 'play/pause' );
  button.mousePressed( toggle );

  env = new p5.Env();
  env.setADSR( 0.05, 0.1, 0.3, 0.4 );
  env.setRange( 0.8, 0 )

  wave = new p5.Oscillator();
  wave.setType( 'sine' );
  wave.start();
  wave.amp( env );
  wave.freq( 440 );


  slider = createSlider( 100, 1200, 440 );
}

function draw() {
  wave.freq( slider.value() );
  if ( playing ) {
    background( 255, 0, 255 );
  } else {
    background( 51 );
  }
}

function toggle () {
  env.play();
  // if ( !playing ) {
  //   playing = true;
  //   wave.amp( .1, 1 );
  // } else {
  //   playing = false;
  //   wave.amp( 0, .4 );
  // }
}
