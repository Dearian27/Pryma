/* <line class="line" x1="271" y1="377" x2="311.1766817280972" y2="359.8000375585564"></line> */
let currLine = null;

canvas.addEventListener('click', (event) => {
  console.log(event)
  if (stage == 'ribs' && !ribDirecting) {
    for (obj of objects) {
      if (obj.cx.animVal.value - event.clientX < 10 &&
        obj.cx.animVal.value - event.clientX > -10 &&
        obj.cy.animVal.value - event.clientY < 10 &&
        obj.cy.animVal.value - event.clientY > -10
      ) {
        const segment = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        segment.classList.add('line');
        segment.setAttribute("x1", obj.cx.animVal.value); // set x pos
        segment.setAttribute("y1", obj.cy.animVal.value); // set y pos
        segment.setAttribute("x2", obj.cx.animVal.value); // set x pos
        segment.setAttribute("y2", obj.cy.animVal.value); // set y pos
        lines.appendChild(segment); // add to html
        segments.push({
          start: obj,
          end: null, // waiting to connect
          segment: segment,
        }); // add in array
        ribDirecting = true; // set directing mode
        currLine = segment; // set current
      }
    }

  }
})

addEventListener("keydown", (event) => {
  if (event.keyCode == 27 && stage == "ribs" && ribDirecting) {
    lines.removeChild(currLine); // add to html
    segments = segments.filter(el => el.segment !== currLine);
    ribDirecting = false;
  }
})

addEventListener('mousemove', (event) => {
  if (stage == 'ribs' && ribDirecting) {
    let isSet = false;
    for (obj of objects) {
      if (obj.cx.animVal.value - event.clientX < 20 &&
        obj.cx.animVal.value - event.clientX > -20 &&
        obj.cy.animVal.value - event.clientY < 20 &&
        obj.cy.animVal.value - event.clientY > -20
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
