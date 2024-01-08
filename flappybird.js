const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BIRD_WIDTH = 50;
const BIRD_HEIGHT = 50;
const PIPE_WIDTH = 70;
const PIPE_GAP = 150;
const GRAVITY = 0.25;
const JUMP = 5;

const chickenImg = new Image();
chickenImg.src = 'kip.jpg'


let birdY = HEIGHT / 2;
let birdVelocity = 0;

const pipes = [];
let pipeTimer = 0;

let score = 0;

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText('Score:' + score, 20, 40);
}

function drawBird() {
  ctx.drawImage(chickenImg, WIDTH / 4, birdY, BIRD_WIDTH, BIRD_HEIGHT);
  // ctx.fillStyle = 'cyan';
  // ctx.fillRect(WIDTH / 4, birdY, BIRD_WIDTH, BIRD_HEIGHT);
}

function drawPipe(pipeX, pipeHeight) {
  ctx.fillStyle = 'beige';
  ctx.fillRect(pipeX, 0, PIPE_WIDTH, pipeHeight);
  ctx.fillRect(pipeX, pipeHeight + PIPE_GAP, PIPE_WIDTH, HEIGHT - pipeHeight - PIPE_GAP);
}

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  birdVelocity += GRAVITY;
  birdY += birdVelocity;

  if (birdY < 0 || birdY + BIRD_HEIGHT > HEIGHT) {
    gameOver();
    return;
  }

  if (pipeTimer % 100 === 0) {
    const pipeHeight = Math.floor(Math.random() * (HEIGHT - 200)) + 50;
    pipes.push({ x: WIDTH, height: pipeHeight });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;
    drawPipe(pipes[i].x, pipes[i].height);

    if (
      (WIDTH / 4 + BIRD_WIDTH >= pipes[i].x && WIDTH / 4 <= pipes[i].x + PIPE_WIDTH) &&
      (birdY <= pipes[i].height || birdY + BIRD_HEIGHT >= pipes[i].height + PIPE_GAP)
    ) {
      gameOver();
      return;
    }

    if (pipes[i].x + PIPE_WIDTH < 0) {
      pipes.splice(i, 1);
      i--;
      score++;
    }
  }

  drawBird();
  drawScore();
  
  pipeTimer++;
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  location.reload();
}

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 32) {
    birdVelocity = -JUMP;
  }
});

document.addEventListener('click', function (event) {
  birdVelocity = -JUMP;
});

gameLoop();