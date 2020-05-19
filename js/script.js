window.addEventListener('load', start);

var globalNames = ['João', 'Maria', 'José', 'Ana'];
var inputName = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');

  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertNewName(typedName) {
    globalNames.push(typedName);
    render();
  }

  function handleTyping(event) {
    if(event.key === 'Enter') {
      insertNewName(event.target.value);
    }
    
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');

  divNames.innerHTML = '';

  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = document.createElement('button');
    var span = document.createElement('span');

    button.textContent = 'x';
    button.classList.add('deleteButton');
    span.textContent = currentName;
    
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
