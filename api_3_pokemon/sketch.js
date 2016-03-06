var data;

function preload() {
	data = loadJSON("pokemon.json");
}

function setup() {
  noCanvas;
	
	var pokemon = data.pokemon;
	for (var i = 0; i < pokemon.length; i++) {
		createElement('h1', pokemon[i].name);
		createElement('p', pokemon[i].name_jp);
		createElement('p', pokemon[i].species_jp);
	}
}
