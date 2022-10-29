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



const calculate = () => {
  while (way.length < scheme.length) {
    let min = null,
      xmin, ymin;
    for (let y = 0; y < scheme.length; y++) { // ітерація рядків
      if (way.indexOf(y) !== -1) { // якщо рядок присутній в масиві way
        scheme[y].forEach((el, x) => {
          if ((el < min || min === null) && el !== 0) {
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
    way.push(xmin); // добавлення рядка в масив 
  }
}
