var url1 = "http://api.wordnik.com:80/v4/word.json/";
var word = "oolong";
var url2 = "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key="
var api_key = "c55c85c904a10978d500602818303e1ab7e812322e07f7f5d";

var api_call = url1 + word + url2 + api_key;

var display_text;

function got_data( data ) {
  // console.log(  data );
  num = data.examples.length;
  display_text.style( "font-size", "96px" );
  display_text.style( "font-family", "helvetica neue" );
  display_text.style( "font-weight", "bold" );
  display_text.style( "line-height", "1em" );
  display_text.style( "letter-spacing", "-0.01em" );
  display_text.style( "word-spacing", "-0.1em" );

  var content = data.examples[ Math.floor( random( 0, num )) ].text;
  // check for apostrophe
  if (/'/.test( content ) ) {
    // after some research i find out that
    // lookbehind doesn’t work in javascript
    // so why bother with lookahead
    // this is broken :-(
    content = content.replace(/'/, "’");
  }

  display_text.html( content );
 
}

function setup() {
  noCanvas();
  display_text = createP( "…" );
  loadJSON( api_call, got_data )
}

function draw() {

}
