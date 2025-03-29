const inputContainer = document.querySelector('.main-input');
const noteInput = document.querySelector('#noteInput');
const noteAddButton = document.querySelector('#noteAddButton');

// CONTAINERS
const outputTodoContainer = document.querySelector('.main-output-todo-container');

// NOTE OBJECT
const noteObject = {
    
};

// ADD A NEW NOTE

function addANewNote(e) {
    e.preventDefault();
    
    if (noteInput.value.length > 0) {
        const outputItself = document.createElement('div');
        outputItself.classList.add('main-output');
        outputItself.draggable = true;
        const outputParagraph = document.createElement('p');
        outputParagraph.classList.add('main-output-paragraph');
        outputParagraph.textContent = noteInput.value;
        const outputDeleteButton = document.createElement('button');
        outputDeleteButton.classList.add('main-output-button');
        outputDeleteButton.type = 'button';
        outputDeleteButton.textContent = 'DELETE';
        outputItself.appendChild(outputParagraph);
        outputItself.appendChild(outputDeleteButton);

        outputTodoContainer.appendChild(outputItself);

        // RESETTING EVERYTHING
        noteInput.value = '';
        inputContainer.style.border = '1px solid var(--border-c)';
    } else {
        inputContainer.style.border = '1px solid red';
        inputContainer.classList.add('main-input-error');
        setTimeout(() => inputContainer.classList.remove('main-input-error'), 300);
    };
};

// INITIALIZE BUTTONS
noteAddButton.addEventListener('click', addANewNote);