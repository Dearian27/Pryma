const next = document.querySelector('.btn');
const task = document.querySelector('.text');

const canvas = document.querySelector('.canvas');
const circles = document.querySelector('.circles');
const lines = document.querySelector('.lines');

const objects = [];
const segments = [];

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


const segment = document.querySelector('.line');

addEventListener('mousemove', (event) => {
  if (stage == 'ribs' && !ribDirecting) {
    let isSet = false;
    for (obj of objects) {
      if (obj.cx.animVal.value - event.clientX < 20 &&
        obj.cx.animVal.value - event.clientX > -20 &&
        obj.cy.animVal.value - event.clientY < 20 &&
        obj.cy.animVal.value - event.clientY > -20
      ) {
        isSet = true;
        segment.setAttribute("x2", obj.cx.animVal.value);
        segment.setAttribute("y2", obj.cy.animVal.value);
      }
    }
    if (!isSet) {
      segment.setAttribute("x2", event.clientX);
      segment.setAttribute("y2", event.clientY);
      isSet = false
    }
  }

});



let scheme = [
  [0, 8, 0, 0, 2, 0],
  [8, 0, 9, 0, 4, 3],
  [0, 9, 0, 8, 0, 5],
  [0, 8, 8, 0, 0, 10],
  [2, 4, 0, 6, 0, 0],
  [0, 3, 5, 10, 0, 0],
];
let result = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];
let way = [0];

