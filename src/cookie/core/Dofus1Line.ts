/** @module dofus1Line */

/**▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 * getLine
 * @author Simsoft [simsoft[at]ankama.com]
 *
 * @param {number} x - x coordinate of source point
 * @param {number} y - y coordinate of source point
 * @param {number} targetX - x coordinate of target point
 * @param {number} targetY - y coordinate of target point
 *
 * @return {Array}
 *
 * TODO: - refactoring !!!
 *       - instead of returning a line, provide a callback funtion to call everytime we add a new cell
 *         So that we can stop algorithm when line being blocked
 */
export function getLine(x: number, y: number, targetX: number, targetY: number) {
  const line = [];

  x += 0.5;
  y += 0.5;
  targetX += 0.5;
  targetY += 0.5;

  let padX = 0;
  let padY = 0;
  let steps = 0;
  let cas = 0;

  if (Math.abs(x - targetX) === Math.abs(y - targetY)) {
    // Diagonale parfaite
    steps = Math.abs(x - targetX);
    padX = (targetX > x) ? 1 : -1;
    padY = (targetY > y) ? 1 : -1;
    cas = 1;
  } else if (Math.abs(x - targetX) > Math.abs(y - targetY)) {
    // On se base sur l'axe X, qui a plus de divisions que l'autre
    steps = Math.abs(x - targetX);
    padX = (targetX > x) ? 1 : -1;
    padY = (targetY - y) / steps;
    padY = padY * 100;
    padY = Math.ceil(padY) / 100;
    cas = 2;
  } else {
    // On se base sur l'axe Y, qui a plus de divisions que l'autre
    steps = Math.abs(y - targetY);
    padX = (targetX - x) / steps;
    padX = padX * 100;
    padX = Math.ceil(padX) / 100;
    padY = (targetY > y) ? 1 : -1;
    cas = 3;
  }

  const errorSup = ~~(3 + (steps / 2));
  const errorInf = ~~(97 - (steps / 2));

  for (let i = 0; i < steps; i++) {
    let cellX;
    let cellY;
    const xPadX = x + padX;
    const yPadY = y + padY;

    if (cas === 2) {
      const beforeY = Math.ceil(y * 100 + padY * 50) / 100;
      const afterY = Math.floor(y * 100 + padY * 150) / 100;
      const diffBeforeCenterY = Math.floor(Math.abs(Math.floor(beforeY) * 100 - beforeY * 100)) / 100;
      const diffCenterAfterY = Math.ceil(Math.abs(Math.ceil(afterY) * 100 - afterY * 100)) / 100;

      cellX = Math.floor(xPadX);

      if (Math.floor(beforeY) === Math.floor(afterY)) {
        cellY = Math.floor(yPadY);
        if ((beforeY === cellY && afterY < cellY) || (afterY === cellY && beforeY < cellY)) {
          cellY = Math.ceil(yPadY);
        }
        line.push({ x: cellX, y: cellY });
      } else if (Math.ceil(beforeY) === Math.ceil(afterY)) {
        cellY = Math.ceil(yPadY);
        if ((beforeY === cellY && afterY < cellY) || (afterY === cellY && beforeY < cellY)) {
          cellY = Math.floor(yPadY);
        }
        line.push({ x: cellX, y: cellY });
      } else if (~~(diffBeforeCenterY * 100) <= errorSup) {
        // attention aux arrondis selon la distance du pt de départ
        line.push({ x: cellX, y: Math.floor(afterY) });
      } else if (~~(diffCenterAfterY * 100) >= errorInf) {
        // attention aux arrondis selon la distance du pt de départ
        line.push({ x: cellX, y: Math.floor(beforeY) });
      } else {
        line.push({ x: cellX, y: Math.floor(beforeY) });
        line.push({ x: cellX, y: Math.floor(afterY) });
      }
    } else if (cas === 3) {
      const beforeX = Math.ceil(x * 100 + padX * 50) / 100;
      const afterX = Math.floor(x * 100 + padX * 150) / 100;
      const diffBeforeCenterX = Math.floor(Math.abs(Math.floor(beforeX) * 100 - beforeX * 100)) / 100;
      const diffCenterAfterX = Math.ceil(Math.abs(Math.ceil(afterX) * 100 - afterX * 100)) / 100;

      cellY = Math.floor(yPadY);

      if (Math.floor(beforeX) === Math.floor(afterX)) {
        cellX = Math.floor(xPadX);
        if ((beforeX === cellX && afterX < cellX) || (afterX === cellX && beforeX < cellX)) {
          cellX = Math.ceil(xPadX);
        }
        line.push({ x: cellX, y: cellY });
      } else if (Math.ceil(beforeX) === Math.ceil(afterX)) {
        cellX = Math.ceil(xPadX);
        if ((beforeX === cellX && afterX < cellX) || (afterX === cellX && beforeX < cellX)) {
          cellX = Math.floor(xPadX);
        }
        line.push({ x: cellX, y: cellY });
      } else if (~~(diffBeforeCenterX * 100) <= errorSup) {
        // attention aux arrondis selon la distance du pt de départ
        line.push({ x: Math.floor(afterX), y: cellY });
      } else if (~~(diffCenterAfterX * 100) >= errorInf) {
        // attention aux arrondis selon la distance du pt de départ
        line.push({ x: Math.floor(beforeX), y: cellY });
      } else {
        line.push({ x: Math.floor(beforeX), y: cellY });
        line.push({ x: Math.floor(afterX), y: cellY });
      }
    } else {
      // cas === 1
      line.push({ x: Math.floor(xPadX), y: Math.floor(yPadY) });
    }

    x = (x * 100 + padX * 100) / 100;
    y = (y * 100 + padY * 100) / 100;
  }

  return line;
}
