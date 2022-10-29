const next = document.querySelector('.btn');
const task = document.querySelector('.text');

const canvas = document.querySelector('.canvas');
const circles = document.querySelector('.circles');
const lines = document.querySelector('.lines');
console.log(lines)
let objects = [];
let segments = [];

let stage = "objects"; // objects | ribs | completion 
let currentObject = null; // chosen object as start pos
let ribDirecting = false; // is choosing rib end

const taskTexts = {
  objects: `1. Locate objects on canvas`,
  ribs: `2. Locate spots on canvas`,
  completion: `3. Locate spots on canvas`,
}
task.innerHTML = taskTexts[stage];

addEventListener('click', (event) => {
  if (event.target === next) {
    stage = "objects" ? "ribs" : "ribs" && "completion";
    task.innerHTML = taskTexts[stage];
    next.disables = true;
  }
})


