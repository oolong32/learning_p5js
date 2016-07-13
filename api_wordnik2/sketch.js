var url = "http://api.wordnik.com:80/v4/words.json/randomWords";
var arguments1 = "?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=-1&limit=1"
var arguments2 = "?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=-1&limit=1"

var api_key = "&api_key=c55c85c904a10978d500602818303e1ab7e812322e07f7f5d";

var api_call_adjective = url + arguments1 + api_key;
var api_call_noun = url + arguments2 + api_key;

var adjective;
var noun;
var display_text;

function got_first( data1 ) {
  console.log(  data1 );
  adjective = data1[ 0 ].word;
  loadJSON( api_call_noun, got_second );
}

function got_second( data2 ) {
  console.log(  data2 );
  noun = data2[ 0 ].word;
  
  display_text.style( "font-size", "96px" );
  display_text.style( "font-family", "helvetica neue" );
  display_text.style( "font-weight", "bold" );
  display_text.style( "line-height", "1em" );
  display_text.style( "letter-spacing", "-0.01em" );
  display_text.style( "word-spacing", "-0.1em" );

  display_text.html( "You " + adjective + " " + noun + "&thinsp;!" );
}

function setup() {
  noCanvas();
  display_text = createP( "…" );
  loadJSON( api_call_adjective, got_first )
}

function draw() {

}
