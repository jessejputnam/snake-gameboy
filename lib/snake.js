function initSnake(coord) {
  const snake = {
    coords: [coord]
  };

  return snake;
}

function moveSnake(snake, dir, food) {
  const head = snake.coords[0];
  const next = [head[0] + dir[0], head[1] + dir[1]];

  // Snake dies
  if (next[0] < 0 || next[0] > 29 || next[1] < 0 || next[1] > 39) return 0;

  snake.coords.unshift(next);
  if (!food) snake.coords.pop(); // grow with food
  return 1;
}

export { initSnake, moveSnake };
