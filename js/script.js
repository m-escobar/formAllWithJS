window.addEventListener('load', start);

var globalNames = ['João', 'Maria', 'José', 'Ana'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

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

function updateName(newName){
  globalNames[currentIndex] = newName;
  currentIndex = null;
  clearInput;
}

function activateInput() {
  function insertNewName(typedName) {
    if(isEditing) {
      updateName(typedName);
      isEditing = false;
    } else { 
        globalNames.push(typedName);
      }
    render();
  }

  function handleTyping(event) {
    if(event.key === 'Enter') {
      if(event.target.value.trim().length === 0) {
        clearInput();
        return;
      }

      insertNewName(event.target.value);
    }
    
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName(){
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index){
    function editItem() {
      isEditing = true;
      inputName.value = name;
      inputName.focus();
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.textContent = name;
    span.classList.add('clickable');

    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');

  divNames.innerHTML = '';

  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    
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
