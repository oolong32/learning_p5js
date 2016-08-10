// https://en.wikipedia.org/wiki/L-system
//
// Variables: F+-[]
// Axiom: F
// Rules: F → FF+[+F-F-F]-[-F+F+F]

var axiom = "F";
var rules = [];
var angle;
var sentence = "";
var len = 70;

rules[ 0 ] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len = len * 0.5;
  var nextSentence = "";
  for ( var i = 0; i < sentence.length; i++ ) {
    var current = sentence.charAt( i );
    var found = false;
    for ( var r = 0; r < rules.length; r++ ) {
      if ( current == rules[ r ].a ) {
        found = true;
        nextSentence += rules[ r ].b;
        break;
      }
    }
    if ( !found ) {
      nextSentence += current;
    }
  } 
  sentence = nextSentence;
  createP( sentence );
  turtle();
}

function turtle() {
  // interpret Text as a Turtle Draw engine would
  // + = turn right, - = turn left
  // brackets = save where you were / restore and carry on
  background( 51 );
  resetMatrix();
  translate( width / 2, height );
  stroke( 80, 255, 150, 100 );

  for ( var i = 0; i < sentence.length; i++ ) {
    var current = sentence.charAt( i );

    if ( current == "F" ) {
      line( 0, 0, 0, -len );
      translate( 0, -len );
      console.log( "line" );
    } else if ( current == "+" ) {
      rotate( angle );
      console.log( "right" );
    } else if ( current == "-" ) {
      rotate( -angle );
      console.log( "left" );
    } else if ( current == "[" ) {
      push();
      console.log( "push" );
    } else if ( current == "]" ) {
      pop();
      console.log( "pop" );
    }
  }
}
function setup() {
  createCanvas( 400, 500);
  background( 51 );
  createP( axiom );
  sentence = axiom;
  angle = radians( 25 );;
  turtle();
  var button = createButton( "generate" );
  button.mousePressed( generate );
}

function draw() {
}
