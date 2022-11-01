let device = "pc"; //* mobile | pc

const modalLine = document.querySelector('.lineValueModal');
const valueBtn = document.querySelector('.valueBtn');
const inputLine = document.querySelector('#inputLine');
const next = document.querySelector('.btn');
const task = document.querySelector('.text');

const canvas = document.querySelector('.svgCanvas');
const mainCanvas = document.querySelector('.canvas');
const circles = document.querySelector('.circles');
const lines = document.querySelector('.lines');

let objects = [];
let segments = [];

let stage = "objects"; // objects | ribs | completion 
let currentObject = null; // chosen object as start pos
let ribDirecting = false; // is choosing rib end

const taskTexts = {
  objects: `1. Locate objects on canvas`,
  ribs: `2. Connect their by lines`,
  completion: ``,
}
task.innerHTML = taskTexts[stage];

let scheme = [],
  result = [];

addEventListener('click', (event) => {
  if (event.target === next) {
    if (stage == "objects") {
      stage = "ribs";
      task.innerHTML = taskTexts[stage];
      next.disabled = true;
      createScheme(); // zero all values
    }
    else if (stage == "ribs" && !ribDirecting) {
      stage = "completion";
      task.innerHTML = taskTexts[stage];
      next.disabled = true;
      next.innerHTML = 'again'
    }

  }
})

const createScheme = () => {
  //SCHEME
  for (let y = 0; y < objects.length; y++) {
    scheme.push([])
    for (let x = 0; x < objects.length; x++) {
      scheme[y][x] = 0;
    }
  }
  //RESULT
  for (let y = 0; y < objects.length; y++) {
    result.push([])
    for (let x = 0; x < objects.length; x++) {
      result[y][x] = 0;
    }
  }
}


const updateScheme = () => {
  scheme[objects.indexOf(currEl.start)][objects.indexOf(currEl.end)] = Number(currEl.value);
  scheme[objects.indexOf(currEl.end)][objects.indexOf(currEl.start)] = Number(currEl.value);
} 