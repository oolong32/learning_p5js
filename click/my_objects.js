function Lllp( x, y ) {
  this.x = x;
  this.y = y;
  this.r = 5;
  this.t = 1000; // Lllp’s lifetime
  this.shape = Math.floor( random( 3 ) );

  this.display = function() {
    fill( 255 );
    noStroke();
    switch ( this.shape ) {
      case 0:
        ellipse( this.x, this.y, this.r, this.r );
        break;
      case 1:
        rect( this.x, this.y, this.r, this.r );
        break;
      case 2:
        push();
        stroke( 255 );
        strokeWeight( 4 );
        line( this.x, this.y, this.x + this.r, this.y + this.r );
        pop();
        break;
    }
  };

  this.alive = function() {
    if ( this.t >= 1 ) {
      this.t -= 1;
      return true;
    } else {
      return false;
    }
  };
}
