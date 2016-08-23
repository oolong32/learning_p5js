// https://youtu.be/8uLVnM36XUc
var xoff = 0;
var smoothedSensor = 0;

function setup() {
  createCanvas( 300, 300 );
  noStroke();
}

function draw() {
  xoff += .1;
  var sensor = noise( xoff ) * 10 + mouseX;
  smoothedSensor = lerp( smoothedSensor, sensor, 0.1 )

  background( 44 );

  fill( 0, 100, 250 );
  ellipse( smoothedSensor, 200, 80, 80 );

  fill( 250, 150, 0, 200 );
  ellipse( sensor, 200, 20, 20 );
}
