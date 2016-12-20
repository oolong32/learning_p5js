var canvas;
var score;
var button;

function setup() {
  canvas = createCanvas(100, 100);
  button = createButton('click');
  button.mousePressed(increaseScore)

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUDbFETuCpxP38CZVLyZVreDnRuOrawPA",
    authDomain: "mein-erstes-firebase-projekt.firebaseapp.com",
    databaseURL: "https://mein-erstes-firebase-projekt.firebaseio.com",
    storageBucket: "mein-erstes-firebase-projekt.appspot.com",
    messagingSenderId: "417149637262"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


  var initialInput = createInput('initials');
  var submitButton = createButton('submit');


  score = 0;
  createP('click the button to get points.')
}

function gotData() {

  var scorelistings = selectAll('.scorelisting');
  for (var i = 0; i < scorelistings.length; i++) {
    scorelistings[i].remove();
  }
  // console.log(data.val());
  var scores = data.cal();
  var keys = Object.keys(scores);
  // console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var initials = scores[i].initials;
    var score = scores[i].score;
    var li = createElement('li', initials + ':' + score);
    li.class('scorelisting');
    li.parent('score-list');
  }
}

function errData() {
  console.log(err);
}

function draw() {
  background(0);
}

function submitScore() {
  var data = {
    'initials': initialInput.value(),
    'score': score
  }
  var ref = database.ref('scores');
  // ref.on('value', gotData, errData);

  ref.push(data);
  
}

function increaseScore() {
  score += 1;
  textAlign('CENTER');
  fill(255, 255, 255);
  text(score, 30, 30);
}
