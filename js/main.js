import { getDir, getFoodIdx, idxToCoord } from "../lib/helpers.js";
import { moveSnake } from "../lib/snake.js";
import { START, UP, DOWN, RIGHT, LEFT } from "../lib/vars.js";
import {
  buildGrid,
  renderBoard,
  mouseDown,
  mouseUp,
  pressVisual,
  releaseVisual,
  updateScore,
  updateHiscore
} from "./dom.js";

// ##################### DOM Elements ######################

const btns = Array.from(document.getElementsByClassName("btn"));

// ##################### GameBoy Set Up ######################

buildGrid();

document.addEventListener("keydown", pressVisual);
document.addEventListener("keydown", initGameKeyPress);
document.addEventListener("keyup", releaseVisual);

btns.forEach((btn) => {
  btn.addEventListener("mousedown", mouseDown);
  btn.addEventListener("mouseup", mouseUp);
});

// ##################### Game Loop Functions ######################
let snake = [START];
const easy = 300;
const med = 100;
const hard = 50;
const insane = 25;

const hiscores = {
  easy: 0,
  med: 0,
  hard: 0,
  insane: 0
};

let speed = med;

function initGameKeyPress(e) {
  const key = e.key;
  if (key === "ArrowUp") initGame(snake, UP);
  else if (key === "ArrowDown") initGame(snake, DOWN);
  else if (key === "ArrowLeft") initGame(snake, LEFT);
  else if (key === "ArrowRight") initGame(snake, RIGHT);
}

function initGame(snake, dir, level = "easy") {
  document.removeEventListener("keydown", initGameKeyPress);

  let interval, movement, food, foodIdx;
  let score = 0;
  // Bind change direction to key
  document.addEventListener(
    "keydown",
    (e) => (dir = getDir(e, dir, snake.length))
  );

  foodIdx = getFoodIdx(snake);
  food = idxToCoord(foodIdx);

  // Interval
  interval = setInterval(() => {
    movement = moveSnake(snake, dir, food);

    if (!movement) {
      clearInterval(interval);
      hiscores[level] = Math.max(score, hiscores[level]);
      updateHiscore(hiscores[level]);
    }

    if (movement === 2) {
      score++;
      updateScore(score);
      foodIdx = getFoodIdx(snake);
      food = idxToCoord(foodIdx);
    }
    renderBoard(snake, foodIdx);
  }, speed);
}

// ##################### Game Loop ######################
renderBoard(snake);
