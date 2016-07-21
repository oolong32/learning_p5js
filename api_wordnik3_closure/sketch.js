var url = "http://api.wordnik.com:80/v4/words.json/randomWords";
var wordnik_arguments = "?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=-1&limit=1"
var word_type1 = "&includePartOfSpeech=adjective";
var word_type2 = "&includePartOfSpeech=noun";

var api_key = "&api_key=c55c85c904a10978d500602818303e1ab7e812322e07f7f5d";

var my_words = [];
var display_text;

function callWordnik( word_argument, index ) {
  var api_call = url + wordnik_arguments + word_argument + api_key;
  loadJSON( api_call, gotWords )
  function gotWords( data ) {
    console.log(  data );
    my_words[ index ] = data[ 0 ].word;
    if ( my_words.length == 2 ) {
      display_text.html( "You " + my_words[ 0 ] + " " + my_words[ 1 ] + "&thinsp;!" );
      display_text.style( "font-size", "96px" );
      display_text.style( "font-family", "helvetica neue" );
      display_text.style( "font-weight", "bold" );
      display_text.style( "line-height", "1em" );
      display_text.style( "letter-spacing", "-0.01em" );
      display_text.style( "word-spacing", "-0.1em" );
    }
  }
}

function setup() {
  noCanvas();
  display_text = createP( "…" );
  callWordnik( word_type1, 0 );
  callWordnik( word_type2, 1 );
}

function draw() {
}
