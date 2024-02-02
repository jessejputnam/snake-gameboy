import { addArrays, isArrEqual } from "./helpers.js";
import { COLS, ROWS } from "./vars.js";

function invalidCoord(next) {
  return next[0] < 0 || next[0] > ROWS - 1 || next[1] < 0 || next[1] > COLS - 1;
}

function moveSnake(snake, dir, food) {
  const next = addArrays(snake[0], dir);
  // Check if snake
  for (let i = 0; i < snake.length - 1; i++) {
    if (isArrEqual(next, snake[i])) return 0;
  }

  // Check if Food
  const isFood = next[0] == food[0] && next[1] == food[1];

  // Snake dies
  if (invalidCoord(next)) return 0;

  snake.unshift(next);

  // grow with food
  if (!isFood) snake.pop();
  return 1 + isFood;
}

export { moveSnake };
