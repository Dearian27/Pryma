canvas.addEventListener('click', (event) => {
  if (stage == 'objects') {
    const object = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    object.setAttributeNS(null, "cx", event.clientX);
    object.setAttributeNS(null, "cy", event.clientY);
    object.setAttributeNS(null, "r", 5);
    object.classList.add('object');
    circles.appendChild(object);
    objects.push(object);

    // active button check
    if (objects.length > 2 && stage == 'objects') {
      next.disabled = false;
    }
  }
})

