fs = require('fs');

var num = process.argv[2] || 5;

var phenomena = createPhenomena(num);

fs.writeFile('phenomena_stash.json', phenomena, 'utf8', function() {console.log(num, 'phenomena created.')});

function createPhenomena(n) {
  var phenomena = [];
  for (var i = 0; i < n; i++) {
    var phenomenon = createPhenomenon();
    phenomena.push(phenomenon);
  }
  phenomena = JSON.stringify(phenomena, null, 2); // indented with two spaces
  return phenomena;
}

function createPhenomenon() {
  var phenomenon = {
    property01: parseInt(Math.random() * 12),
    property02: parseInt(Math.random() * 12),
    property03: parseInt(Math.random() * 12),
    property04: parseInt(Math.random() * 12),
    property05: parseInt(Math.random() * 12),
    property06: parseInt(Math.random() * 12),
    property07: parseInt(Math.random() * 12),
    property08: parseInt(Math.random() * 12),
    property09: parseInt(Math.random() * 12),
    property10: parseInt(Math.random() * 12),
    property11: parseInt(Math.random() * 12),
    property12: parseInt(Math.random() * 12)
  };
  return phenomenon;
}
