function recursiveDivision(
  startNode,
  endNode,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  walls,
  rowMap,
  colMap
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (rowEnd - rowStart <= 2 || colEnd - colStart <= 2) {
    return;
  }

  let row = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart;
  rowMap.set(`${row}`, true);
  let cellToBeExemptedInRow =
    Math.floor(Math.random() * (colEnd - colStart)) + colStart;

  for (let i = colStart; i <= colEnd; i++) {
    if (i !== cellToBeExemptedInRow && !colMap.has(`${i}`)) {
      if (row !== startNode[0] && row !== endNode[0]) {
        walls.set(`${row}-${i}`, { row: row, col: i });
      } else if (
        row === startNode[0] &&
        row !== endNode[0] &&
        i !== startNode[1]
      ) {
        walls.set(`${row}-${i}`, { row: row, col: i });
      } else if (
        row === endNode[0] &&
        row !== startNode[0] &&
        i !== endNode[1]
      ) {
        walls.set(`${row}-${i}`, { row: row, col: i });
      } else if (i !== startNode[1] && i !== endNode[1]) {
        walls.set(`${row}-${i}`, { row: row, col: i });
      }
    }
  }

  let col = Math.floor(Math.random() * (colEnd - colStart)) + colStart;
  colMap.set(`${col}`, true);
  let cellToBeExemptedInCol =
    Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart;

  for (let i = rowStart; i <= rowEnd; i++) {
    if (i !== cellToBeExemptedInCol && !rowMap.has(`${i}`)) {
      if (col !== startNode[1] && col !== endNode[1]) {
        walls.set(`${i}-${col}`, { row: i, col: col });
      } else if (
        col === startNode[1] &&
        col !== endNode[1] &&
        i !== startNode[0]
      ) {
        walls.set(`${i}-${col}`, { row: i, col: col });
      } else if (
        col === endNode[1] &&
        col !== startNode[1] &&
        i !== endNode[0]
      ) {
        walls.set(`${i}-${col}`, { row: i, col: col });
      } else if (i !== startNode[0] && i !== endNode[0]) {
        walls.set(`${i}-${col}`, { row: i, col: col });
      }
    }
  }

  recursiveDivision(
    startNode,
    endNode,
    rowStart,
    row - 2,
    colStart,
    col - 2,
    walls,
    rowMap,
    colMap
  );
  recursiveDivision(
    startNode,
    endNode,
    row + 2,
    rowEnd,
    col + 2,
    colEnd,
    walls,
    rowMap,
    colMap
  );
  recursiveDivision(
    startNode,
    endNode,
    row + 2,
    rowEnd,
    colStart,
    col - 2,
    walls,
    rowMap,
    colMap
  );
  recursiveDivision(
    startNode,
    endNode,
    rowStart,
    row - 2,
    col + 2,
    colEnd,
    walls,
    rowMap,
    colMap
  );

  if (
    walls.has(`${startNode[0]}, ${startNode[1] + 1}`) &&
    walls.has(`${startNode[0]}, ${startNode[1] - 1}`) &&
    walls.has(`${startNode[0] + 1}, ${startNode[1]}`) &&
    walls.has(`${startNode[0] - 1}, ${startNode[1]}`)
  ) {
    walls.delete(`${startNode[0]}, ${startNode[1] + 1}`);
    walls.delete(`${startNode[0]}, ${startNode[1] - 1}`);
    walls.delete(`${startNode[0] + 1}, ${startNode[1]}`);
    walls.delete(`${startNode[0] - 1}, ${startNode[1]}`);
  }
  if (
    walls.has(`${endNode[0]}, ${endNode[1] + 1}`) &&
    walls.has(`${endNode[0]}, ${endNode[1] - 1}`) &&
    walls.has(`${endNode[0] + 1}, ${endNode[1]}`) &&
    walls.has(`${endNode[0] - 1}, ${endNode[1]}`)
  ) {
    walls.delete(`${endNode[0]}, ${endNode[1] + 1}`);
    walls.delete(`${endNode[0]}, ${endNode[1] - 1}`);
    walls.delete(`${endNode[0] + 1}, ${endNode[1]}`);
    walls.delete(`${endNode[0] - 1}, ${endNode[1]}`);
  }
  return;
}

export default recursiveDivision;
