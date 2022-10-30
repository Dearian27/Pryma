let currLine = null, currEl = null;
let canFinish = false;

const addLine = (e) => {
  if (stage == 'ribs' && !modalLine.classList.contains('active')) {
    for (obj of objects) {
      if (!ribDirecting) { //* not find connect yet
        if (obj.cx.animVal.value - e.clientX < 20 &&
          obj.cx.animVal.value - e.clientX > -20 &&
          obj.cy.animVal.value - e.clientY < 20 &&
          obj.cy.animVal.value - e.clientY > -20
        ) {
          const segment = document.createElementNS("http://www.w3.org/2000/svg", 'line');
          segment.classList.add('line');
          segment.setAttribute("x1", obj.cx.animVal.value); // set x pos
          segment.setAttribute("y1", obj.cy.animVal.value); // set y pos
          segment.setAttribute("x2", obj.cx.animVal.value); // set x pos
          segment.setAttribute("y2", obj.cy.animVal.value); // set y pos
          lines.appendChild(segment); // add to html
          currEl = {
            start: obj,
            end: null, // waiting to connect
            segment: segment,
            value: null,
            valueHTML: null,
          };
          segments.push(currEl); // add information in array
          ribDirecting = true; // set directing mode
          currLine = segment; // set current
          if (device == 'mobile') {
            currLine.ondragstart = () => { return false }
            moveLine(e);
          }
        }
      }
      else if (obj.cx.animVal.value == currLine.x2.animVal.value && obj.cy.animVal.value == currLine.y2.animVal.value &&
        obj != currEl.start
      ) { //* submit start
        let can = true;
        segments.forEach(element => {
          if (element.start == currEl.start && element.end == obj ||
            element.end == currEl.start && element.start == obj)
            can = false;
        });
        if (can) {
          modalLine.classList.add('active'); // modal
          ribDirecting = false;
          segments[segments.indexOf(currEl)].end = obj;
          if (!canFinish) {
            checkFinish();
            if (canFinish) { //** CHECKER **//
              //* if connected all nodes 
              next.disabled = false;
            }
          }
        }
      }
    }

  }
}

const moveLine = (e) => {
  if (stage == 'ribs' && ribDirecting) {
    let isSet = false;
    for (obj of objects) {
      if (obj.cx.animVal.value - e.clientX < 20 &&
        obj.cx.animVal.value - e.clientX > -20 &&
        obj.cy.animVal.value - e.clientY < 20 &&
        obj.cy.animVal.value - e.clientY > -20 &&
        obj !== currEl.start
      ) {
        isSet = true;
        currLine.setAttributeNS(null, "x2", obj.cx.animVal.value);
        currLine.setAttributeNS(null, "y2", obj.cy.animVal.value);
      }
    }
    if (!isSet) {
      currLine.setAttributeNS(null, "x2", e.clientX);
      currLine.setAttributeNS(null, "y2", e.clientY);
    }
  }
}





canvas.addEventListener('click', (event) => {  //* select start
  if (device == "pc") {
    addLine(event)
  }
})

addEventListener("keydown", (event) => { //* escape
  if (event.keyCode == 27 && stage == "ribs" && ribDirecting) {
    lines.removeChild(currLine); // add to html
    segments = segments.filter(el => el.segment !== currLine);
    ribDirecting = false;
  }
})

addEventListener('mousemove', (event) => { //* moving end of segment
  if (device === 'pc') {
    moveLine(event)
  }
});

//* MOBILE */

canvas.addEventListener('mousedown', (event) => {  //* select start
  if (device == 'mobile') {
    addLine(event)
  }
})

addEventListener('mousedown', (event) => { //* moving end of segment
  if (device == 'mobile') {
    addLine(event)
  }
});


const checkFinish = () => {
  let count = 0;

  for (const obj of objects) {
    let isChecked = false;
    segments.forEach(segment => {
      if (isChecked == false && (segment.end == obj || segment.start == obj)) {
        count++;
        isChecked = true;
      }
    })
  }
  if (count == objects.length) canFinish = true;
}