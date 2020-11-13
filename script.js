// DECLARATION


let gridSize = document.getElementById('gridSize').valueAsNumber;
const changeButton = document.getElementById('submitButton');
const blackButton = document.getElementById('black');
const randomButton = document.getElementById('random');
let colorButton = document.getElementById('color');
const clearButton = document.getElementById('clear');
const parent = document.getElementById('parent');
let black = false;
let random = false;
let color = false;


// FUNCTIONALITY


let para = document.createElement('p');
para.innerHTML = 'Select your grid size and create a grid!';
para.classList.add('default');
parent.appendChild(para);

// change the drawing color using the "color" button
colorButton.addEventListener('change', changeColor);

// fire the "change" button to change the grid size dinamicaly
changeButton.addEventListener('click', (e) => {
    deletePreviousElements();
    gridSize = e.target.previousElementSibling.valueAsNumber;
    createGridTemplate(gridSize);
    createGrid(gridSize);
});

blackButton.addEventListener('click', blackButtonIsClicked);
randomButton.addEventListener('click', randomButtonIsClicked);
colorButton.addEventListener('change', colorButtonIsClicked);
clearButton.addEventListener('click', clearScreen);


// FUNCTIONS


function changeColor() {
    document.documentElement.style.setProperty(`--${this.name}`, `${this.value}`);
}

function deletePreviousElements() {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createGridTemplate(size) {
    let template = '';    
    for (let i = 0; i < size; i++) {
        template += `${parent.scrollHeight / size}px `;
    }
    parent.style.gridTemplateColumns = template;
    parent.style.gridTemplateRows = template;
}

function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        let child = document.createElement('div');
        child.classList.add('child');
        parent.appendChild(child);
        // cum il colorez (ce culoare)?
        child.addEventListener('click', chooseFunction);
    }
}

function chooseFunction(e) {
    if (black && !random && !color) {
        return blackChild(e);
    }
    else if (!black && random && !color) {
        return randomChild(e);
    }
    else if (!black && !random && color) {
        return colorChild(e);
    }
}

function blackButtonIsClicked() {
    black = true;
    random = false;
    color = false;
}

function randomButtonIsClicked() {
    black = false;
    random = true;
    color = false;
}

function colorButtonIsClicked() {
    black = false;
    random = false;
    color = true;    
}

function randomChild(e) {
    e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function blackChild(e) {
    e.target.style.backgroundColor = 'black';
}

function colorChild(e) {
    e.target.style.backgroundColor = colorButton.value;
}

function clearScreen() {
    parent.childNodes.forEach(element => {
        element.style.backgroundColor = 'white';
    });
}