function Blob( r, x, y ) {
  this.pos = createVector( x, y );
  this.r = r;
  this.vel = createVector( 0, 0 );

  this.eats = function( other ) {
    var d = p5.Vector.dist( this.pos, other.pos );
    if ( d < this.r + other.r ) {
      //calculate area of blob + eaten blob to calculate new radius
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt( sum / PI );
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    var newvel = createVector( mouseX - width / 2, mouseY - height / 2 );
    newvel.setMag( 3 );
    this.vel.lerp( newvel, 0.2 );
    this.pos.add( this.vel );
  };

  this.show = function() {
    fill( 255 );
    ellipse( this.pos.x, this.pos.y, this.r * 2, this.r * 2 );
  };
}
