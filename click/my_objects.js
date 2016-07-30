function Lllp( x, y ) {
  this.x = x;
  this.y = y;
  this.r = 5;
  this.t = 1000; // Lllp’s lifetime

  this.display = function() {
    push();
    fill( 255 );
    stroke( 0 );
    ellipse( this.x, this.y, this.r, this.r );
    pop();
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
