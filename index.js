const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝', '🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝'];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards at the beginning
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    shuffle(icons);
    gameBoard.innerHTML = '';
    icons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.innerHTML = icon;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === icons.length / 2) {
            setTimeout(() => alert('Congratulations! You won!'), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', resetGame);

function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    createCards();
}

// Initialize game
createCards();
