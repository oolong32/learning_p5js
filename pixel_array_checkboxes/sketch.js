var video;
var vScale = 16;
var rows = 30;
var cols = 40;
var boxes = [];

function setup() {
  noCanvas();
  pixelDensity( 1 ); // because retina screen
  video = createCapture( VIDEO );
  video.size( cols, rows );
  slider = createSlider( 0, 255, 90 );

  for ( var y = 0; y < rows; y += 1 ) {
    for ( var x = 0; x < cols; x += 1 ) {
      var box = createCheckbox();
      box.parent( 'mirror' );
      boxes.push( box );
    }
    var br = createElement('br');
    br.parent( 'mirror' );
  }
}

function draw() {
  video.loadPixels();

  for ( var y = 0; y < video.height; y += 1 ) {
    for ( var x = 0; x < video.width; x += 1 ) {
      // var index = ( y * video.width + x ) * 4;
      // flip image
      var index = ( video.width - ( x + 1 ) + y * video.width ) * 4;
      var r = video.pixels[ index + 0 ];
      var g = video.pixels[ index + 1 ];
      var b = video.pixels[ index + 2 ];

      var threshold = slider.value();
      var bright = ( r + g + b ) / 3;
      
      var checkindex = x + y * cols;
      if ( bright > threshold ) {
        boxes[ checkindex ].checked( false );
      } else {
        boxes[ checkindex ].checked( true );
      }
    }
  }
}
