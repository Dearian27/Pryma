//*MODAL */
inputLine.addEventListener('change', () => {
  if (inputLine.value >= 1 && inputLine.value <= 100) {
    valueBtn.disabled = false;
  }
  else {
    valueBtn.disabled = true;
  }
})

valueBtn.addEventListener('click', () => {
  modalLine.classList.remove('active')
  currEl.value = inputLine.value;
  showValue()
  inputLine.value = null;
  valueBtn.disabled = true;
})

const showValue = () => {
  const value = document.createElement('span');
  value.classList.add('valueNumber');
  console.log(currEl.segment)
  value.style.top = (currEl.segment.y1.animVal.value + currEl.segment.y2.animVal.value) / 2 + 'px';
  console.log(currEl.segment.y1.animVal.value + currEl.segment.y1.animVal.value - currEl.segment.y2.animVal.value);
  value.style.left = (currEl.segment.x1.animVal.value + currEl.segment.x2.animVal.value) / 2 + 'px';
  console.log(currEl.segment.x1.animVal.value + currEl.segment.x1.animVal.value - currEl.segment.x2.animVal.value);

  value.innerHTML = currEl.value;
  currEl.valueHTML = value;
  mainCanvas.appendChild(value);
  console.log(value)
}