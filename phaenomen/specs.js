// es ist nicht so elegant wie gewünscht:
// specs() wird aus den methoden von Phenomenon() gerufen
// aber fürs erste ist es ok

var specs = function(foo) {
  /* print some information
  if (foo) {
    console.log('I’m an update.');
  } else {
    console.log('first time!');
  }*/

  if (document.getElementsByClassName('phenomena-specs').length) {
    var sec = document.querySelector('section');
    sec.parentNode.removeChild(sec);
  } // Tabula rasa

  var section = document.createElement('section');
  if (!hasClass(section, "phenomena-specs")) {
    addClass(section, "phenomena-specs");
  }
  document.body.appendChild(section);

  var h1 = document.createElement('h1');
  h1.innerHTML = 'Phenomena';
  section.appendChild(h1);

  for (var i = 0; i < world.phenomena.length; i++) {

    // Einzelner Abschnitt
    var article = document.createElement('article');

    if (!hasClass(article, "phenomenon-" + i)) {
      addClass(article, "phenomenon-" + i);
    } // numbered class

    if (i === world.active_phenomenon_index) {
      addClass(article, "active");
    } // active class if it is

    var h2 = document.createElement('h2');
    h2.innerHTML = 'Phenomenon ' + i; // Titel
    article.appendChild(h2);

    // Drift
    var p_drift = document.createElement('p');
    p_drift.innerHTML = 'Drift: ' + world.phenomena[i].drift;
    article.appendChild(p_drift);

    // Farbe
    var h3farbe = document.createElement('h3');
    h3farbe.innerHTML = 'Color';
    article.appendChild(h3farbe);

    // Hue Start
    var hue_start = document.createElement('p');
    hue_start.innerHTML = 'Hue (start): ' + world.phenomena[i].hue_start;
    article.appendChild(hue_start);

    // Hue End
    var hue_end = document.createElement('p');
    hue_end.innerHTML = 'Hue (end): ' + world.phenomena[i].hue_end;
    article.appendChild(hue_end);

    // Saturation
    var sat = document.createElement('p');
    sat.innerHTML = 'Saturation: ' + world.phenomena[i].saturation;
    article.appendChild(sat);

    // Brightness Start
    var brightness_start = document.createElement('p');
    brightness_start.innerHTML = 'Brightness (start): ' + world.phenomena[i].brightness_start;
    article.appendChild(brightness_start);

    // Brightness End
    var brightness_end = document.createElement('p');
    brightness_end.innerHTML = 'Brightness (end): ' + world.phenomena[i].brightness_end;
    article.appendChild(brightness_end);

    var alpha = document.createElement('p');
    alpha.innerHTML = 'Alpha: ' + world.phenomena[i].transparency;
    article.appendChild(alpha);

    // Stroke Weight
    var h3sw = document.createElement('h3');
    h3sw.innerHTML = 'Stroke weight';
    article.appendChild(h3sw);

    // Stroke Weight Start
    var sw_start = document.createElement('p');
    sw_start.innerHTML = 'start: ' + world.phenomena[i].stroke_weight_start;
    article.appendChild(sw_start);

    // Stroke Weight End
    var sw_end = document.createElement('p');
    sw_end.innerHTML = 'end: ' + world.phenomena[i].stroke_weight_end;
    article.appendChild(sw_end);

    // Segmente
    var h3seg = document.createElement('h3');
    h3seg.innerHTML = 'Segments';
    article.appendChild(h3seg);

    // Number of Segments
    var seg_num = document.createElement('p');
    seg_num.innerHTML = 'Number of segments: ' + world.phenomena[i].segment_number;
    article.appendChild(seg_num);

    // Length of Segments
    var seg_len = document.createElement('p');
    seg_len.innerHTML = 'Max.&#x2006;length of segments: ' + world.phenomena[i].segment_length;
    article.appendChild(seg_len);
    section.appendChild(article);
  }
  return null;
};

// helper function as in https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}
  
function addClass(el, className) {
        if (el.classList) el.classList.add(className);
        else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
        if (el.classList) el.classList.remove(className);
        else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}
