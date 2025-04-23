// script.js
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
  const input = document.getElementById('cardCount');
  const count = parseInt(input.value);
  const gameBoard = document.getElementById('gameBoard');

  if (isNaN(count) || count % 2 !== 0 || count < 4 || count > 100) {
    alert("Please enter a valid even number between 4 and 100.");
    return;
  }

  // Reset Board
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = repeat(${Math.ceil(Math.sqrt(count))}, auto);
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Generate Pairs
  const pairs = [];
  for (let i = 0; i < count / 2; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    pairs.push(value, value);
  }

  // Shuffle
  pairs.sort(() => 0.5 - Math.random());

  // Render Cards
  pairs.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = '';
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

  card.classList.add('face-up');
  card.innerText = card.dataset.value;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    // Match
    firstCard.classList.add('matched', 'disabled');
    secondCard.classList.add('matched', 'disabled');
    resetFlips();
    checkWin();
  } else {
    // No match
    setTimeout(() => {
      firstCard.classList.remove('face-up');
      secondCard.classList.remove('face-up');
      firstCard.innerText = '';
      secondCard.innerText = '';
      resetFlips();
    }, 1000);
  }
}

function resetFlips() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const allCards = document.querySelectorAll('.card');
  const matchedCards = document.querySelectorAll('.card.matched');
  if (allCards.length === matchedCards.length) {
    setTimeout(() => {
      alert("Congratulations! You've matched all the cards!");
    }, 300);
  }
}