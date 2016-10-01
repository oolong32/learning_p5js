var textfield,
  outpunt,
  submit;

function setup() {
  noCanvas();
  textfield = select( '#input' );
  // textfield.changed( newText );
  input = select( '#output' );
  submit = select( '#submit' );
  submit.mousePressed( newText );
}

function newText() {
  var s = textfield.value();
  var r = /(\d{3})[-.]\d{4}/g;
  var results;
  while ( results = r.exec( s ) ) {
    createP( result[ 1 ] );
  }

}
