import { COLS, ROWS, UP, DOWN, LEFT, RIGHT } from "./vars.js";

function idxToCoord(idx) {
  const x = Math.trunc(idx / COLS);
  const y = idx % COLS;
  return [x, y];
}

function coordToIdx(coord) {
  return coord[1] + coord[0] * COLS;
}

function addArrays(arr1, arr2) {
  return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

function isArrEqual(arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

function getDir(e, cur, len) {
  const key = e.key;
  // Disallow 180 degree change of direction
  if (key === "ArrowUp") return cur[0] === 1 && len > 1 ? DOWN : UP;
  if (key === "ArrowDown") return cur[0] === -1 && len > 1 ? UP : DOWN;
  if (key === "ArrowLeft") return cur[1] === 1 && len > 1 ? RIGHT : LEFT;
  if (key === "ArrowRight") return cur[1] === -1 && len > 1 ? LEFT : RIGHT;
  return cur;
}

function getFoodIdx(snake) {
  const set = new Set(snake.map((s) => coordToIdx(s)));
  const possibleValues = [];
  for (let i = 0; i < ROWS * COLS; i++) if (!set.has(i)) possibleValues.push(i);

  const n = possibleValues.length;
  const idx = Math.floor(Math.random() * n);
  return possibleValues[idx];
}

export { addArrays, idxToCoord, coordToIdx, getDir, getFoodIdx, isArrEqual };
