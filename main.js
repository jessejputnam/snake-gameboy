// ##################### DOM Elements ######################

const screen = document.getElementById("innerScreen");

const btns = Array.from(document.getElementsByClassName("btn"));
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const btnA = document.getElementById("abtn");
const btnB = document.getElementById("bbtn");
const btnStart = document.getElementById("btnStart");
const btnSelect = document.getElementById("btnSelect");

// ##################### Click Events ######################

btns.forEach((btn) => {
  btn.addEventListener("mousedown", (e) => {
    const b = e.target.closest(".btn");
    b.classList.add("press");
  });

  btn.addEventListener("mouseup", (e) => {
    const b = e.target.closest(".btn");
    b.classList.remove("press");
  });
});

// ##################### Keyboard Events ######################

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowUp") btnUp.classList.add("press");
  if (key === "ArrowDown") btnDown.classList.add("press");
  if (key === "ArrowLeft") btnLeft.classList.add("press");
  if (key === "ArrowRight") btnRight.classList.add("press");
  if (key === "z") btnA.classList.add("press");
  if (key === "x") btnB.classList.add("press");
  if (key === "Enter") btnStart.classList.add("press");
  if (key === "Shift") btnSelect.classList.add("press");
});

document.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key === "ArrowUp") btnUp.classList.remove("press");
  if (key === "ArrowDown") btnDown.classList.remove("press");
  if (key === "ArrowLeft") btnLeft.classList.remove("press");
  if (key === "ArrowRight") btnRight.classList.remove("press");
  if (key === "z") btnA.classList.remove("press");
  if (key === "x") btnB.classList.remove("press");
  if (key === "Enter") btnStart.classList.remove("press");
  if (key === "Shift") btnSelect.classList.remove("press");
});

// ##################### Screen Creation ######################
function buildGrid() {
  for (let rows = 0; rows < 30; rows++) {
    for (let cols = 0; cols < 40; cols++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      screen.append(div);
    }
  }
}

buildGrid();
