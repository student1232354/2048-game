
import Game from '../modules/Game.class.js';

const game = new Game();
const startButton = document.querySelector('.button');

function updateUI() {
  const currentStatus = game.getStatus();
  const messagestart = document.querySelector('.message-start');
  const loseMessage = document.querySelector('.message-lose');
  const winmessage = document.querySelector('.message-win');

  if (currentStatus === 'playing') {
    messagestart.classList.add('hidden');
    winmessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
  }

  if (currentStatus === 'idle') {
    startButton.classList.remove('restart');
    startButton.classList.add('start');
    startButton.textContent = 'Start';
  } else {
    startButton.classList.remove('start');
    startButton.classList.add('restart');
    startButton.textContent = 'Restart';
  }

  if (currentStatus === 'lose') {
    if (loseMessage) {
      loseMessage.classList.remove('hidden');
    }
    render();
    Score();
  } else if (currentStatus === 'win') {
    winmessage.classList.remove('hidden');
    render();
  } else {
    if (loseMessage) {
      loseMessage.classList.add('hidden');
    }
  }
}

startButton.addEventListener('click', () => {
  game.restart();
  render();
  Score();
  updateUI();
});

window.addEventListener('keydown', (e) => {
  updateUI();

  if (game.status !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      game.moveLeft();
      break;
    case 'ArrowRight':
      e.preventDefault();
      game.moveRight();
      break;
    case 'ArrowDown':
      e.preventDefault();
      game.moveDown();
      break;
    case 'ArrowUp':
      e.preventDefault();
      game.moveUp();
      break;
    default:
      return;
  }

  render();
  Score();
  highscore();
  game.checkLose();
  game.getStatus();
});

function Score() {
  const currentScore = game.getScore();
  const scoreElement = document.querySelector('.game-score');

  if (scoreElement) {
    scoreElement.textContent = currentScore;
  }
}

function highscore() {
  const highscoreElement = document.querySelector('.game-highscore');

  if (highscoreElement) {
    highscoreElement.textContent = game.highscore;
  }
}

function render() {
  const board = game.getState();
  const cells = document.querySelectorAll('.field-cell');

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const value = board[y][x];
      const cellIndex = y * 4 + x;
      const currentCell = cells[cellIndex];

      if (value === 0) {
        currentCell.textContent = '';
        currentCell.className = 'field-cell';
      } else {
        currentCell.textContent = value;
        currentCell.className = `field-cell field-cell--${value}`;
      }
    }
  }
}
updateUI();
