function Foo( x, y, w, h ) {
  // create a rectangle from x/y to limit_x/limit_y
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.limit_x = this.x + this.w;
  this.limit_y = this.y + this.h;

  this.r = Math.floor( random( 0, 256 ) );
  this.g = Math.floor( random( 0, 256 ) );
  this.b = Math.floor( random( 0, 256 ) );

  // put something inside
  this.thing_x = Math.floor( random( this.x, this.limit_x ) );
  this.thing_y = Math.floor( random( this.y, this.limit_y ) );
  this.thing_rad = Math.floor( random( 2, 6) );

  this.update = function() {
    this.thing_x += Math.floor( random( - 1, 2 ) );
    this.thing_y += Math.floor( random( - 1, 2 ) );
  };

  this.out = function() {
    if ( this.thing_x <= this.x ) {
      this.thing_x = this.limit_x;
    } else if ( this.thing_x >= this.limit_x ) {
      this.thing_x = this.x;
    } else if ( this.thing_y <= this.y ) {
      this.thing_y = this.limit_y;
    } else if ( this.thing_y >= this.limit_y ) {
      this.thing_y = this.y;
    }
  }

  this.display = function() {
    push();
    noFill();
    stroke( this.r, this.g, this.b );
    ellipseMode( RADIUS );
    ellipse(this.thing_x, this.thing_y, this.thing_rad, this.thing_rad );
    pop();
  };

}
