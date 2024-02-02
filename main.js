import { getDir, getFoodIdx, idxToCoord } from "./lib/helpers.js";
import { moveSnake } from "./lib/snake.js";
import { START, UP, DOWN, RIGHT, LEFT } from "./lib/vars.js";
import {
  buildGrid,
  renderBoard,
  mouseDown,
  mouseUp,
  pressVisual,
  releaseVisual,
  updateScore,
  updateHiscore,
  selectLevelEl,
  toggleMenu,
  toggleGameover
} from "./lib/dom.js";

// ##################### DOM Elements ######################

const btns = Array.from(document.getElementsByClassName("btn"));

// ##################### GameBoy Set Up ######################

buildGrid();

document.addEventListener("keydown", pressVisual);
document.addEventListener("keyup", releaseVisual);

btns.forEach((btn) => {
  btn.addEventListener("mousedown", mouseDown);
  btn.addEventListener("mouseup", mouseUp);
});

// ##################### Game Loop Variables ######################
let snake = [START];
const intervals = [300, 100, 50, 25];
const hiscores = [0, 0, 0, 0];

let level = 0;
let dir;

// ##################### Game Loop Event Callbacks #########################

function initGameKeyPress(e) {
  document.removeEventListener("keydown", levelSelect);
  const key = e.key;
  if (key === "ArrowUp") initRound(snake, UP, level);
  else if (key === "ArrowDown") initRound(snake, DOWN, level);
  else if (key === "ArrowLeft") initRound(snake, LEFT, level);
  else if (key === "ArrowRight") initRound(snake, RIGHT, level);
}

function levelSelect(e) {
  const key = e.key;
  if (key === "Enter" || key === "z") initGame();
  if (key === "ArrowUp") level = !level ? 0 : level - 1;
  if (key === "ArrowDown") level = level === 3 ? 3 : level + 1;
  selectLevelEl(level);
}

function changeDir(e) {
  dir = getDir(e, dir, snake.length);
}

function restart(e) {
  if (e.key === "Enter" || e.key === "z") {
    level = 0;
    dir = null;
    snake = [START];
    toggleGameover();
    toggleMenu();
    selectGame();
  }
}

// ################ Game Loop Functions ####################

function selectGame() {
  document.removeEventListener("keydown", restart);
  selectLevelEl(level);
  document.addEventListener("keydown", levelSelect);
}

function initGame() {
  document.removeEventListener("keydown", levelSelect);
  document.addEventListener("keydown", initGameKeyPress);
  renderBoard(snake);
  updateHiscore(hiscores[level]);
  updateScore(0);
  toggleMenu();
}

function initRound(snake, direction, level) {
  let interval, movement, food, foodIdx;
  let score = 0;
  dir = direction;
  updateHiscore(hiscores[level]);

  document.removeEventListener("keydown", initGameKeyPress);

  // Bind change direction to key
  document.addEventListener("keydown", changeDir);

  foodIdx = getFoodIdx(snake);
  food = idxToCoord(foodIdx);

  // Interval
  interval = setInterval(() => {
    movement = moveSnake(snake, dir, food);

    if (!movement) {
      clearInterval(interval);
      hiscores[level] = Math.max(score, hiscores[level]);
      updateHiscore(hiscores[level]);
      // GAME OVER AND RESET SCREEN
      toggleGameover();
      document.removeEventListener("keydown", changeDir);
      document.addEventListener("keydown", restart);
    }

    if (movement === 2) {
      score++;
      updateScore(score);
      foodIdx = getFoodIdx(snake);
      food = idxToCoord(foodIdx);
    }
    renderBoard(snake, foodIdx);
  }, intervals[level]);
}

// ##################### Game Loop ######################

selectGame();

// renderBoard(snake);
