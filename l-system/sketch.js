// https://en.wikipedia.org/wiki/L-system
//
// Variables: A, B
// Axiom: A
// Rules: (A → AB), (B → A)

var axiom = "A";
var sentence;
var rules = [];

rules[ 0 ] = {
  a: "A",
  b: "AB"
}

rules[ 1 ] = {
  a: "B",
  b: "A"
}

function generate() {
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
}

function setup() {
  noCanvas();
  createP( axiom );
  sentence = axiom;
  var button = createButton( "generate" );
  button.mousePressed( generate );
}

function draw() {
}
