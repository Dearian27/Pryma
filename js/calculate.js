let way = [0];
// let activeWay = [0];
//* will make for of way to 8 instead 0 */


const calculate = () => {

  while (way.length < scheme.length) {
    let min = null,
      xmin, ymin;
    for (let y = 0; y < scheme.length; y++) { // ітерація рядків
      if (way.indexOf(y) !== -1) { // якщо рядок присутній в масиві way
        scheme[y].forEach((el, x) => {
          if ((el < min || min === null) && el !== 0 && way.indexOf(x) === -1) {
            min = el;
            xmin = x;
            ymin = y;
          }
        })
      }
    }
    result[ymin][xmin] = min; // запис мінімального в таблицю результатів
    scheme[ymin][xmin] = 0; // занулення елемента
    scheme[xmin][ymin] = 0; // занулення симетричного елемента
    // activeWay.filter(el => el === ymin)
    // activeWay.push(xmin)
    way.push(xmin); // добавлення рядка в масив 
  }
  console.log(result)
}

let animWay = [0]

const calcAnim = (counter) => {
  let currentWay = animWay;
  animWay = [];
  for (let y = 0; y < currentWay.length; y++) {
    for (let x = 0; x < result.length; x++) {  // horizontal move
      let currSegment;
      if (result[currentWay[y]][x] > 0) {
        console.log('"> 0" checked')
        segments.forEach(segment => {
          if (objects.indexOf(segment.end) == x && objects.indexOf(segment.start) == currentWay[y] ||
            objects.indexOf(segment.start) == x && objects.indexOf(segment.end) == currentWay[y]) {
            currSegment = segment;
            animWay.push(x);
            //add value to count
            count += Number(segment.value);
            countHTML.innerHTML = count;
          }
        })
        currSegment.valueHTML.style.color = "#000";
        currSegment.segment.style.stroke = "#5aff5a";
        currSegment.start.style.fill = "#5aff5a";
        currSegment.end.style.fill = "#5aff5a";
      }
    }
  }

  setTimeout(() => {
    if (counter != way.length - 1) {
      calcAnim(counter + 1);
    }
    else {
      console.log(result)
      countHTML.classList.add('active');
      return;
    }
  }, 1000)
}