var raster_x;
var raster_y;
var x_length;
var y_height;
var x_width_rest;
var y_height_rest;
var arr = [];
var manicotti;

function preload() {
  manicotti = loadFont( 'fonts/Manicotti-Regular.otf' );
}

function setup() {
  createCanvas( 300, 340 );
  background( 51 );

  raster_x = 50;
  raster_y = 60;

  x_width_rest  = width  % raster_x;
  y_height_rest = height % raster_y;

  x_width  = width  - x_width_rest  / 2;
  y_height = height - y_height_rest / 2;

  for ( var y = y_height_rest / 2; y < y_height; y += raster_y  ) {
    for ( var x = x_width_rest / 2; x < x_width ; x += raster_x  ) {
      arr.push( new Foo( x, y ) );
    }
  }
}

function draw() {
  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ].display();
  }
}

function Foo( x, y ) {
  this.x = x;
  this.y = y;
  this.w = random( 2, raster_x );
  this.h = random( 3, raster_y );
  this.basecolor = random( 255 );
  this.angle = random( 360 );

  this.display = function() {
    noStroke();

    push();
    fill( this.basecolor );
    rect( x, y, raster_x, raster_y );
    pop();

    push();
    fill( this.basecolor / 2 );
    rect( this.x + ( raster_x - this.w ) / 2, this.y + ( raster_y - this.h ) / 2, this.w, this.h);
    pop();

    push();
    fill( 255, 0, 50 );
    var char = "A";
    textFont( manicotti );
    textSize( this.h );
    translate(x + raster_x / 2, y + raster_y / 2);
    rotate( this.angle );
    // not acurate – one would like the letter to be centered :-/
    text( char,  raster_x / 4 - textWidth( char ), this.h / 3 );
    pop();
  };
}


