import { coordToIdx } from "../lib/helpers.js";
import { COLS, ROWS } from "../lib/vars.js";

// ##################### DOM Elements ######################

const screen = document.getElementById("innerScreen");

const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const btnA = document.getElementById("abtn");
const btnB = document.getElementById("bbtn");
const btnStart = document.getElementById("btnStart");
const btnSelect = document.getElementById("btnSelect");

const scoreEl = document.getElementById("score");
const hiscoreEl = document.getElementById("hiscore");

// ##################### Functions ######################
function buildGrid() {
  for (let rows = 0; rows < ROWS; rows++) {
    for (let cols = 0; cols < COLS; cols++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      screen.append(div);
    }
  }
}

function mouseDown(e) {
  const b = e.target.closest(".btn");
  b.classList.add("press");
}

function mouseUp(e) {
  const b = e.target.closest(".btn");
  b.classList.remove("press");
}

function pressVisual(e) {
  const key = e.key;
  if (key === "ArrowUp") btnUp.classList.add("press");
  if (key === "ArrowDown") btnDown.classList.add("press");
  if (key === "ArrowLeft") btnLeft.classList.add("press");
  if (key === "ArrowRight") btnRight.classList.add("press");

  if (key === "z") btnA.classList.add("press");
  if (key === "x") btnB.classList.add("press");

  if (key === "Enter") btnStart.classList.add("press");
  if (key === "Shift") btnSelect.classList.add("press");
}

function releaseVisual(e) {
  const key = e.key;
  if (key === "ArrowUp") btnUp.classList.remove("press");
  if (key === "ArrowDown") btnDown.classList.remove("press");
  if (key === "ArrowLeft") btnLeft.classList.remove("press");
  if (key === "ArrowRight") btnRight.classList.remove("press");

  if (key === "z") btnA.classList.remove("press");
  if (key === "x") btnB.classList.remove("press");

  if (key === "Enter") btnStart.classList.remove("press");
  if (key === "Shift") btnSelect.classList.remove("press");
}

function renderBoard(snake, foodIdx) {
  for (let cell of screen.children) {
    cell.classList.remove("snake");
    cell.classList.remove("food");
  }

  snake.forEach((coord) => {
    const idx = coordToIdx(coord);
    screen.children[idx].classList.add("snake");
  });

  if (foodIdx) screen.children[foodIdx].classList.add("food");
}

function updateScore(score) {
  scoreEl.textContent = score;
}

function updateHiscore(hiscore) {
  hiscoreEl.textContent = hiscore;
}

export {
  buildGrid,
  mouseDown,
  mouseUp,
  pressVisual,
  releaseVisual,
  renderBoard,
  updateScore,
  updateHiscore
};
