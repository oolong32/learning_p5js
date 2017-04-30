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
  }
  var section = document.createElement('section');
  if (!hasClass(section, "phenomena-specs")) {
    addClass(section, "phenomena-specs");
  }
  document.body.appendChild(section);
  var h1 = document.createElement('h1');
  h1.innerHTML = 'Phenomena';
  section.appendChild(h1);
  for (var i = 0; i < world.phenomena.length; i++) {
    var article = document.createElement('article');
    if (!hasClass(article, "phenomenon-" + i)) {
      addClass(article, "phenomenon-" + i);
    }
    if (i === world.active_phenomenon_index) {
      addClass(article, "active");
    }
    var h2 = document.createElement('h2');
    h2.innerHTML = 'Phenomenon ' + i;
    article.appendChild(h2);
    on = document.createElement('p');
    on.innerHTML = 'Number of original nodes: ' + world.phenomena[i].nodes.length;
    article.appendChild(on);
    cn = document.createElement('p');
    cn.innerHTML =  'Number of current nodes: ' + world.phenomena[i].current_hosts.length;
    article.appendChild(cn);
    h = document.createElement('h3');
    h.innerHTML = 'Hosts';
    article.appendChild(h);
    for (var j = 0; j < world.phenomena[i].current_hosts.length; j++) {
      var pp = document.createElement('p');
      pp.innerHTML = 'N°&thinsp;' + j + ': ' + world.phenomena[i].current_hosts[j];
      article.appendChild(pp);
      
    }
    section.appendChild(article);
    
  }
  return null;
}

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
