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
    sections: {
        todo: {
            todoInput: [],
            todoInputIndex: []
        },
        inProgress: {
            inProgressInput: [],
            inProgressInputIndex: [],
        },
        finished: {
            finishedInput: [],
            finishedInputIndex: [],
        }
    },
    noteCounter: 0,
};

// ADD A NEW NOTE

function addANewNote(e) {
    e.preventDefault();
    
    if (noteInput.value.length > 0) {
        const outputItself = document.createElement('div');
        outputItself.classList.add('main-output');
        outputItself.draggable = true;
        outputItself.setAttribute('data-output-index', noteObject.noteCounter);
        outputItself.setAttribute('data-output-parent', 'section-todo');
        noteObject.noteCounter++;
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

        // SAVING THE INPUT
        noteObject.sections.todo.todoInput.push(noteInput.value);
        noteObject.sections.todo.todoInputIndex.push(outputItself.getAttribute('data-output-index'));
        localStorage.setItem('noteObjectLS', JSON.stringify(noteObject));

        // RESETTING EVERYTHING
        noteInput.value = '';
        inputContainer.style.border = '1px solid var(--border-c)';
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
        dropAnElement('section-in-progress', 'inProgress', 'section-finished', 'finished', 'todo', outputTodoContainer, 'section-todo');
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
        dropAnElement('section-todo', 'todo', 'section-finished', 'finished', 'inProgress', outputInProgressContainer, 'section-in-progress');
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
        dropAnElement('section-in-progress', 'inProgress', 'section-todo', 'todo', 'finished', outputFinishedContainer, 'section-finished');
    };
});

sectionFinished.addEventListener('dragenter', e => {
    if (e.target.classList.contains('main-output-section-finished') || e.target.classList.contains('main-output-finished-container') || e.target.classList.contains('main-output-section-header')) {
        outputFinishedContainer.appendChild(noteObject.beingDraggedElement);
    };
});

// DROP AN ELEMENT

function dropAnElement(firstSection, firstSectionPropertyName, secondSection, secondSectionPropertyName, beingDroppedSectionName, outputContainerName, elementNewParent) {
    const elementParent = noteObject.beingDraggedElement.getAttribute('data-output-parent');
    const elementIndex = noteObject.beingDraggedElement.getAttribute('data-output-index');

    if (elementParent === firstSection) {
        const beingRemovedElementIndex = noteObject.sections[firstSectionPropertyName][`${firstSectionPropertyName}InputIndex`].indexOf(elementIndex);

        // ADDING THE DROPPED ELEMENT INTO THE IN PROGRESS PROPERTY
        noteObject.sections[beingDroppedSectionName][`${beingDroppedSectionName}Input`].push(noteObject.sections[firstSectionPropertyName][`${firstSectionPropertyName}Input`][beingRemovedElementIndex]);
        noteObject.sections[beingDroppedSectionName][`${beingDroppedSectionName}InputIndex`].push(noteObject.sections[firstSectionPropertyName][`${firstSectionPropertyName}InputIndex`][beingRemovedElementIndex]);

        // REMOVING THE DROPPED ELEMENT FROM THE TODO SECTION
        noteObject.sections[firstSectionPropertyName][`${firstSectionPropertyName}Input`].splice(beingRemovedElementIndex, 1);
        noteObject.sections[firstSectionPropertyName][`${firstSectionPropertyName}InputIndex`].splice(beingRemovedElementIndex, 1);
    } else if (elementParent === secondSection) {
        const beingRemovedElementIndex = noteObject.sections[secondSectionPropertyName][`${secondSectionPropertyName}InputIndex`].indexOf(elementIndex);

        // ADDING THE DROPPED ELEMENT INTO THE IN PROGRESS PROPERTY
        noteObject.sections[beingDroppedSectionName][`${beingDroppedSectionName}Input`].push(noteObject.sections[secondSectionPropertyName][`${secondSectionPropertyName}Input`][beingRemovedElementIndex]);
        noteObject.sections[beingDroppedSectionName][`${beingDroppedSectionName}InputIndex`].push(noteObject.sections[secondSectionPropertyName][`${secondSectionPropertyName}InputIndex`][beingRemovedElementIndex]);

        // REMOVING THE DROPPED ELEMENT FROM THE TODO SECTION
        noteObject.sections[secondSectionPropertyName][`${secondSectionPropertyName}Input`].splice(beingRemovedElementIndex, 1);
        noteObject.sections[secondSectionPropertyName][`${secondSectionPropertyName}InputIndex`].splice(beingRemovedElementIndex, 1);
    };
    // ADDING THE ELEMENT
    noteObject.beingDraggedElement.setAttribute('data-output-parent', elementNewParent);
    outputContainerName.appendChild(noteObject.beingDraggedElement);
};

// INITIALIZE BUTTONS
noteAddButton.addEventListener('click', addANewNote);

// LOCAL STORAGE

function storedDataHandling() {
    const noteObjectLS = JSON.parse(localStorage.getItem('noteObjectLS'));

    // TODO
    if (noteObjectLS) {
        for (let i = 0; i < noteObjectLS.sections.todo.todoInput.length; i++) {
            noteObject.noteCounter = noteObjectLS.noteCounter;
            noteObject.sections.todo.todoInput = noteObjectLS.sections.todo.todoInput;
            noteObject.sections.todo.todoInputIndex = noteObjectLS.sections.todo.todoInputIndex;
        };
    };
};

storedDataHandling();