var data;
var txt = '$$exclamation$$! they said $$adverb$$ as they jumped into their $$noun$$ and flew off with their $$adjective$$ $$pluralnoun$$.';

function setup() {
  noCanvas();
  Tabletop.init( { key: '1NQmPjdyJFjA2GpD5hW1ybLOAV2M_ACHoDsxYywJwWrw',
  callback: gotData,
  simpleSheet: true } );

  var button = createButton( 'generate MadLib' );
  button.mousePressed( generate );
}

function gotData( stuff, tabletop ) {
  data = stuff;
}

function replacer( match, pos ) {
  var entry = random( data );
  return entry[ pos ];
}

function generate(  ) {
  // console.log( 'generate' );
  var madlib = txt.replace( /\$\$(.*?)\$\$/g, replacer );
  createP( madlib );
}
