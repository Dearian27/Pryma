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
  completion: `3. `,
}
task.innerHTML = taskTexts[stage];

addEventListener('click', (event) => {
  if (event.target === next) {
    if (stage == "objects") {
      stage = "ribs";
      task.innerHTML = taskTexts[stage];
      next.disabled = true;
    }
    else if (stage == "ribs" && !ribDirecting) {
      stage = "completion";
      task.innerHTML = taskTexts[stage];
      next.disabled = true;
    }

  }
})

