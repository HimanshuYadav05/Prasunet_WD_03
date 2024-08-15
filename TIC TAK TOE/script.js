const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
    const index = e.target.dataset.cellIndex;
    boardState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        if (currentPlayer === playerX) {
            scoreX.textContent = parseInt(scoreX.textContent) + 1;
        } else {
            scoreO.textContent = parseInt(scoreO.textContent) + 1;
        }
        setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
        resetBoard();
    } else if (boardState.every(cell => cell !== null)) {
        setTimeout(() => alert("It's a Draw!"), 100);
        resetBoard();
    } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
}

function checkWin() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetBoard() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.classList.remove(playerX, playerO);
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    gameActive = true;
}

function resetGame() {
    resetBoard();
    scoreX.textContent = '0';
    scoreO.textContent = '0';
    currentPlayer = playerX;
}
