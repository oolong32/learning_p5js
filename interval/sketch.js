arr = [];

function setup() {
  createCanvas( 400, 400 );
  background( 25 );
  // push dots to array
  setInterval( function() { arr.push( new Dot( Math.random() * width, Math.random() * height ) ); }, 1000 );
}

function draw() {
  background( 25 );
  var al = arr.length;
  if ( al >= 1 ) { // draw dots
    for ( var i = al - 1; i >= 0 ; i-- ) {
      arr[ i ].display();
      if( arr[ i ].count <= 0 ) {
        arr.splice( i, 1 );
      }
    }
    al = arr.length;
    if ( al >= 2 ) { // draw lines between dots
      for ( var i = 0; i < al - 1; i++ ) {
        var current = arr[ i ];
        var next = arr[ i + 1 ];
        push();
        stroke( 255, 50, 0 );
        line( current.x + 2, current.y + 2, next.x + 2, next.y + 2 );
        pop();
      }
      if ( al >= 3 ) { // connect first and last
        var first = arr[ 0 ];
        var last = arr[ arr.length - 1 ];
        push();
        stroke( 255, 50, 0 );
        line( first.x + 2, first.y + 2, last.x + 2, last.y + 2 );
        pop();
      }
    }
  }
}

function Dot( x, y ) {
  this.x = x;
  this.y = y;
  this.count = 1000;
  this.col = color( random( 125, 256 ) , random( 125, 256 ), random( 125, 256 ) );

  this.display = function() {
    noStroke()
    fill( this.col );
    rect( this.x, this.y, 4, 4 );
    this.count -= 1;
  }
}
