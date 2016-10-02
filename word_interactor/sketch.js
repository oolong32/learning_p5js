// Coding Challenge #38: Word Interactor
// https://youtu.be/AKuW48WeNMA
// this differs a bit from the tutorial, as i tried to use plain js for some of the dom manipulations

var textfield,
  outpunt,
  submit;

function setup() {
  noCanvas();

  textfield = select( '#input' );
  input = select( '#output' );
  submit = select( '#submit' );
  submit.mousePressed( newText );
}

function highlight() {
  console.log( this.innerText );
}

function newText() {
  // purge p#output
  var paragraph = document.getElementById( 'output' );
  paragraph.innerHTML = '';

  var s = textfield.value();
  var words = s.split( /(\W+)/ );

  for ( var i = 0; i < words.length; i++ ) {
    // instead of using p5 dom, use 'pure' JS
    var span = document.createElement( 'span' );
    var word = document.createTextNode( words[ i ] );
    span.appendChild( word );
    paragraph.appendChild( span );
  }

  var spans = document.querySelectorAll( '#output span' );
  for ( var i = 0; i < spans.length; i++ ) {
    r = /\w+/; // filter spans with wordlike content
    if ( r.test( spans[ i ].innerHTML ) ) {
      spans[ i ].style.backgroundColor = 'cyan'; 
      spans[ i ].addEventListener( 'mouseover', highlight );
    }
  }
  // console.log( words );
}
