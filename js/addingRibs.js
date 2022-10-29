/* <line class="line" x1="271" y1="377" x2="311.1766817280972" y2="359.8000375585564"></line> */
let currLine = null, currEl = null;
let idNumber = 0;

canvas.addEventListener('click', (event) => {  //* select start
  if (stage == 'ribs') {
    for (obj of objects) {
      if (!ribDirecting) { //* not find connect yet
        if (obj.cx.animVal.value - event.clientX < 20 &&
          obj.cx.animVal.value - event.clientX > -20 &&
          obj.cy.animVal.value - event.clientY < 20 &&
          obj.cy.animVal.value - event.clientY > -20
        ) {
          const segment = document.createElementNS("http://www.w3.org/2000/svg", 'line');
          segment.classList.add('line');
          segment.setAttribute("x1", obj.cx.animVal.value); // set x pos
          segment.setAttribute("y1", obj.cy.animVal.value); // set y pos
          segment.setAttribute("x2", obj.cx.animVal.value); // set x pos
          segment.setAttribute("y2", obj.cy.animVal.value); // set y pos
          segment.setAttribute("title", "Софийский собор"); // set y pos
          lines.appendChild(segment); // add to html
          currEl = {
            start: obj,
            end: null, // waiting to connect
            segment: segment,
          };
          segments.push(currEl); // add information in array
          ribDirecting = true; // set directing mode
          currLine = segment; // set current
        }
      }
      else if (obj.cx.animVal.value == currLine.x2.animVal.value && obj.cy.animVal.value == currLine.y2.animVal.value &&
        obj != currEl.start
      ) { //* submit start
        ribDirecting = false;
        segments[segments.indexOf(currEl)].end = obj;
      }
    }

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
  if (stage == 'ribs' && ribDirecting) {
    let isSet = false;
    for (obj of objects) {
      if (obj.cx.animVal.value - event.clientX < 20 &&
        obj.cx.animVal.value - event.clientX > -20 &&
        obj.cy.animVal.value - event.clientY < 20 &&
        obj.cy.animVal.value - event.clientY > -20 &&
        obj !== currEl.start
      ) {
        isSet = true;
        currLine.setAttributeNS(null, "x2", obj.cx.animVal.value);
        currLine.setAttributeNS(null, "y2", obj.cy.animVal.value);
      }
    }
    if (!isSet) {
      currLine.setAttributeNS(null, "x2", event.clientX);
      currLine.setAttributeNS(null, "y2", event.clientY);
    }
  }
});