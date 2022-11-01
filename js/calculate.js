let way = [0];

//* will make for of way instead 0 to 8 */


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
