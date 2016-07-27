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

  this.randfac = random( 0, 1000 );

  // put something inside
  this.thing_x = Math.floor( random( this.x, this.limit_x ) );
  this.thing_y = Math.floor( random( this.y, this.limit_y ) );
  this.thing_rad = Math.floor( random( 2, 6) );

  this.display = function() {
    push();
    noFill();
    stroke( this.r, this.g, this.b );
    // ellipseMode( RADIUS );
    // ellipse(this.thing_x, this.thing_y, this.thing_rad, this.thing_rad );
    rectMode( RADIUS );
    rect(this.thing_x, this.thing_y, this.thing_rad, this.thing_rad );
    pop();
  };

}
