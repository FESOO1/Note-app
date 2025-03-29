const inputContainer = document.querySelector('.main-input');
const noteInput = document.querySelector('#noteInput');
const noteAddButton = document.querySelector('#noteAddButton');

// SECTIONS
const sectionTodo = document.querySelector('.main-output-section-todo');
const sectionInProgress = document.querySelector('.main-output-section-in-progress');
const sectionFinished = document.querySelector('.main-output-section-finished');

// CONTAINERS TO/FROM DRAG
const outputTodoContainer = document.querySelector('.main-output-todo-container');
const outputInProgressContainer = document.querySelector('.main-output-in-progress-container');
const outputFinishedContainer = document.querySelector('.main-output-finished-container');

// NOTE OBJECT
const noteObject = {
    beingDraggedElement: undefined,
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

        // OUTPUT TODO CONTAINER
        outputTodoContainer.appendChild(outputItself);

        // RESETTING EVERYTHING
        noteInput.value = '';
        inputContainer.style.border = '1px solid var(--border-c)';



        // OUTPUT DRAGGING
        outputItself.addEventListener('dragstart', e => {
            noteObject.beingDraggedElement = e.target;
            outputItself.classList.add('main-output-dragging');
        });

        outputItself.addEventListener('dragend', () => {
            outputItself.classList.remove('main-output-dragging');
        });

        // DELETING AN ELEMENT
        outputDeleteButton.addEventListener('click', () => {
            outputItself.parentNode.removeChild(outputItself);
        });
    } else {
        inputContainer.style.border = '1px solid red';
        inputContainer.classList.add('main-input-error');
        setTimeout(() => inputContainer.classList.remove('main-input-error'), 300);
    };
};

// TODO

sectionTodo.addEventListener('dragover', e => e.preventDefault());

sectionTodo.addEventListener('drop', e => {
    if (e.target.classList.contains('main-output-section-todo') || e.target.classList.contains('main-output-todo-container') || e.target.classList.contains('main-output-section-header')) {
        outputTodoContainer.appendChild(noteObject.beingDraggedElement);
    };
});

sectionTodo.addEventListener('dragenter', e => {
    if (e.target.classList.contains('main-output-section-todo') || e.target.classList.contains('main-output-todo-container') || e.target.classList.contains('main-output-section-header')) {
        outputTodoContainer.appendChild(noteObject.beingDraggedElement);
    };
});

// IN PROGRESS DROP

sectionInProgress.addEventListener('dragover', e => e.preventDefault());

sectionInProgress.addEventListener('drop', e => {
    if (e.target.classList.contains('main-output-section-in-progress') || e.target.classList.contains('main-output-in-progress-container') || e.target.classList.contains('main-output-section-header')) {
        outputInProgressContainer.appendChild(noteObject.beingDraggedElement);
    };
});

sectionInProgress.addEventListener('dragenter', e => {
    if (e.target.classList.contains('main-output-section-in-progress') || e.target.classList.contains('main-output-in-progress-container') || e.target.classList.contains('main-output-section-header')) {
        outputInProgressContainer.appendChild(noteObject.beingDraggedElement);
    };
});

// FINISHED DROP

sectionFinished.addEventListener('dragover', e => e.preventDefault());

sectionFinished.addEventListener('drop', e => {
    if (e.target.classList.contains('main-output-section-finished') || e.target.classList.contains('main-output-finished-container') || e.target.classList.contains('main-output-section-header')) {
        outputFinishedContainer.appendChild(noteObject.beingDraggedElement);
    };
});

sectionFinished.addEventListener('dragenter', e => {
    if (e.target.classList.contains('main-output-section-finished') || e.target.classList.contains('main-output-finished-container') || e.target.classList.contains('main-output-section-header')) {
        outputFinishedContainer.appendChild(noteObject.beingDraggedElement);
    };
});

// INITIALIZE BUTTONS
noteAddButton.addEventListener('click', addANewNote);