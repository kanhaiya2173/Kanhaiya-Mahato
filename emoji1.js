let scores, currentScore, activePlayer, isPlaying;

const playerEls = document.querySelectorAll('.player');
const emojiEl = document.getElementById('emoji');
const startBtn = document.getElementById('STARTBtn');
const holdBtn = document.getElementById('holdBtn');
const newGameBtn = document.getElementById('newGamebtn');

const emojis = ['\u{1F31A}', '\u2764', '\u{1F60D}', '\u{1F64F}', '\u{1F923}', '\u{1F495}', '\u{1F451}', '\u{1F525}', '\uD83D\uDE18', '\u{1F600}','\u{1F4A3}'];

function newGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  playerEls.forEach((playerEl, i) => {
    playerEl.querySelector('.current').textContent = '0';
    playerEl.querySelector('.score').textContent = 'Score: 0';
    playerEl.classList.remove('winner', 'active');
    const winText = playerEl.querySelector('.winner-text');
    if (winText) winText.remove();
  });

  playerEls[0].classList.add('active');
  emojiEl.textContent = '\u{1F451}';//crown emoji
}

function switchPlayer() {
  currentScore = 0;
  playerEls[activePlayer].querySelector('.current').textContent = '0';
  playerEls[activePlayer].classList.remove('active');
   activePlayer = activePlayer === 0 ? 1 : 0; //flip turn
  playerEls[activePlayer].classList.add('active');
}

function rollEmoji() {
  if (!isPlaying) return;

  const index = Math.floor(Math.random() * emojis.length);
  const rolledEmoji = emojis[index];
  emojiEl.textContent = rolledEmoji;

  if (rolledEmoji === '\u{1F4A3}') {//bomb emoji
    currentScore = 0;
    playerEls[activePlayer].querySelector('.current').textContent = '0';
    switchPlayer();
  } else {
    const points = 10 - index;
    currentScore += points;
    playerEls[activePlayer].querySelector('.current').textContent = currentScore;

    if (scores[activePlayer] + currentScore >= 100) {
      scores[activePlayer] += currentScore;
      playerEls[activePlayer].querySelector('.score').textContent = 'Score: ' + scores[activePlayer];
      endGame();
    }
  }
}

function holdScore() {
  if (!isPlaying) return;

  scores[activePlayer] += currentScore;
  playerEls[activePlayer].querySelector('.score').textContent = 'Score: ' + scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    endGame();
  } else {
    switchPlayer();
  }
}

function endGame() {
  isPlaying = false;
  emojiEl.textContent = '🏆';
  const text = document.createElement('div');
  text.classList.add('winner-text');
  text.textContent = 'CHAMPION!';
  playerEls[activePlayer].classList.add('winner');
  playerEls[activePlayer].appendChild(text);
}

// Event Listeners
startBtn.addEventListener('click', rollEmoji);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', newGame);

// Initialize game
newGame();
