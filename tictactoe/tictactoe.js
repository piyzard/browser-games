const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');

let board = Array(9).fill(null);
let currentPlayer = 'X'; // Player starts with 'X'
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize the game board
function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.textContent = cell;
        div.addEventListener('click', handlePlayerMove);
        gameBoard.appendChild(div);
    });
}

// Handle a player's move
function handlePlayerMove(event) {
    const index = event.target.dataset.index;
    if (board[index] !== null || !gameActive) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWin(currentPlayer)) {
        gameActive = false;
        statusDisplay.textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== null)) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') harderAIMove();
    }
}

// Check if a player has won
function checkWin(player) {
    return winConditions.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Harder AI Move: Blocks winning move, creates winning move, and prioritizes center/corners
function harderAIMove() {
    let moveMade = false;

    // Step 1: Block the player's winning move
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === 'X' && board[b] === 'X' && board[c] === null) {
            board[c] = 'O';
            moveMade = true;
            break;
        } else if (board[a] === 'X' && board[c] === 'X' && board[b] === null) {
            board[b] = 'O';
            moveMade = true;
            break;
        } else if (board[b] === 'X' && board[c] === 'X' && board[a] === null) {
            board[a] = 'O';
            moveMade = true;
            break;
        }
    }

    // Step 2: Try to create a winning move
    if (!moveMade) {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] === 'O' && board[b] === 'O' && board[c] === null) {
                board[c] = 'O';
                moveMade = true;
                break;
            } else if (board[a] === 'O' && board[c] === 'O' && board[b] === null) {
                board[b] = 'O';
                moveMade = true;
                break;
            } else if (board[b] === 'O' && board[c] === 'O' && board[a] === null) {
                board[a] = 'O';
                moveMade = true;
                break;
            }
        }
    }

    // Step 3: If no immediate winning/blocking moves, take center or corners
    if (!moveMade) {
        // Prioritize center if empty
        if (board[4] === null) {
            board[4] = 'O';
            moveMade = true;
        }

        // Otherwise, take one of the corners
        if (!moveMade) {
            const corners = [0, 2, 6, 8];
            for (let i = 0; i < corners.length; i++) {
                if (board[corners[i]] === null) {
                    board[corners[i]] = 'O';
                    moveMade = true;
                    break;
                }
            }
        }
    }

    // Step 4: Random fallback if no better move is found
    if (!moveMade) {
        const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[randomMove] = 'O';
    }

    renderBoard();

    if (checkWin('O')) {
        gameActive = false;
        statusDisplay.textContent = 'AI wins!';
    } else if (board.every(cell => cell !== null)) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = 'X';
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
    renderBoard();
});

renderBoard();
