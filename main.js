import { initSnake, moveSnake } from "./lib/snake.js";
import {
  buildGrid,
  renderBoard,
  mouseDown,
  mouseUp,
  pressVisual,
  releaseVisual
} from "./dom.js";

const btns = Array.from(document.getElementsByClassName("btn"));

buildGrid();
const snake = initSnake([0, 0]);
renderBoard(snake);

// ##################### Click Events ######################

btns.forEach((btn) => {
  btn.addEventListener("mousedown", (e) => mouseDown(e));
  btn.addEventListener("mouseup", (e) => mouseUp(e));
});

// ##################### Keyboard Events ######################

document.addEventListener("keydown", (e) => {
  const key = e.key;
  pressVisual(key);

  let round;

  if (key === "ArrowUp") round = moveSnake(snake, [-1, 0], false);
  if (key === "ArrowDown") round = moveSnake(snake, [1, 0], false);
  if (key === "ArrowLeft") round = moveSnake(snake, [0, -1], false);
  if (key === "ArrowRight") round = moveSnake(snake, [0, 1], false);

  renderBoard(snake);
});

document.addEventListener("keyup", (e) => {
  const key = e.key;
  releaseVisual(key);
});

// const game = setInterval(() => {}, 500);
