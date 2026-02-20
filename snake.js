const GRID_SIZE = 20;
const CELL = 20;
const TICK_MS = 140;

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function randomInt(max, rng = Math.random) {
  return Math.floor(rng() * max);
}

function positionEquals(a, b) {
  return a.x === b.x && a.y === b.y;
}

function spawnFood(snake, rng = Math.random) {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  let candidate = null;
  let guard = 0;

  while (!candidate || occupied.has(`${candidate.x},${candidate.y}`)) {
    candidate = { x: randomInt(GRID_SIZE, rng), y: randomInt(GRID_SIZE, rng) };
    guard += 1;
    if (guard > GRID_SIZE * GRID_SIZE) {
      return null;
    }
  }

  return candidate;
}

export function createInitialState(rng = Math.random) {
  const start = { x: 8, y: 10 };
  const snake = [start, { x: 7, y: 10 }, { x: 6, y: 10 }];
  const food = spawnFood(snake, rng);
  return {
    snake,
    direction: "right",
    nextDirection: "right",
    food,
    score: 0,
    gameOver: false,
    paused: false,
  };
}

export function stepState(state, rng = Math.random) {
  if (state.gameOver || state.paused) {
    return { ...state };
  }

  const direction = state.nextDirection;
  const head = state.snake[0];
  const delta = DIRECTIONS[direction];
  const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= GRID_SIZE ||
    nextHead.y >= GRID_SIZE;
  const hitsSelf = state.snake.some((segment) => positionEquals(segment, nextHead));

  if (hitsWall || hitsSelf) {
    return { ...state, gameOver: true };
  }

  const ateFood = state.food && positionEquals(nextHead, state.food);
  const nextSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    nextSnake.pop();
  }

  const nextFood = ateFood ? spawnFood(nextSnake, rng) : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    nextDirection: direction,
    food: nextFood,
    score: ateFood ? state.score + 1 : state.score,
    gameOver: nextFood === null ? true : state.gameOver,
  };
}

function canChangeDirection(current, next) {
  return OPPOSITE[current] !== next;
}

function updateDirection(state, next) {
  if (canChangeDirection(state.direction, next)) {
    state.nextDirection = next;
  }
}

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const overlayEl = document.getElementById("overlay");
const restartBtn = document.getElementById("restart");
const pauseBtn = document.getElementById("pause");
const dpadButtons = document.querySelectorAll(".dpad-btn");

let state = createInitialState();

function drawGrid() {
  ctx.fillStyle = "#0f1012";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--grid");
  ctx.lineWidth = 1;

  for (let i = 0; i <= GRID_SIZE; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, GRID_SIZE * CELL);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(GRID_SIZE * CELL, i * CELL);
    ctx.stroke();
  }
}

function drawCell(pos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * CELL + 1, pos.y * CELL + 1, CELL - 2, CELL - 2);
}

function render() {
  drawGrid();

  const snakeColor = getComputedStyle(document.documentElement).getPropertyValue("--snake");
  const foodColor = getComputedStyle(document.documentElement).getPropertyValue("--food");

  state.snake.forEach((segment, index) => {
    const shade = index === 0 ? snakeColor : snakeColor.trim();
    drawCell(segment, shade);
  });

  if (state.food) {
    drawCell(state.food, foodColor);
  }

  scoreEl.textContent = String(state.score);

  if (state.gameOver) {
    overlayEl.textContent = "Game Over";
    overlayEl.classList.add("show");
  } else if (state.paused) {
    overlayEl.textContent = "Paused";
    overlayEl.classList.add("show");
  } else {
    overlayEl.classList.remove("show");
  }

  pauseBtn.textContent = state.paused ? "Resume" : "Pause";
}

function tick() {
  state = stepState(state);
  render();
}

function restart() {
  state = createInitialState();
  render();
}

function togglePause() {
  state = { ...state, paused: !state.paused };
  render();
}

function handleKey(event) {
  const key = event.key.toLowerCase();
  const map = {
    arrowup: "up",
    arrowdown: "down",
    arrowleft: "left",
    arrowright: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right",
    " ": "pause",
  };

  const action = map[key];
  if (!action) return;

  if (action === "pause") {
    togglePause();
    return;
  }

  updateDirection(state, action);
}

restartBtn.addEventListener("click", restart);
pauseBtn.addEventListener("click", togglePause);

window.addEventListener("keydown", handleKey);

for (const btn of dpadButtons) {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir;
    if (dir) updateDirection(state, dir);
  });
}

render();
setInterval(tick, TICK_MS);
