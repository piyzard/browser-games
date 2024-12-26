const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartBtn');

const gridSize = 20; // Size of each grid block
let snake = [{x: 200, y: 200}]; // Initial position of the snake
let direction = 'RIGHT'; // Initial direction
let food = generateFood(); // Position of food
let score = 0;
let gameInterval;

// Initialize the game
function startGame() {
    score = 0;
    snake = [{x: 200, y: 200}];
    direction = 'RIGHT';
    food = generateFood();
    scoreDisplay.textContent = `Score: ${score}`;

    // Hide game over message when restarting
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.classList.add('hidden');  // Make sure the game over message is hidden
    
    // Clear the canvas and start the game loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameInterval = setInterval(gameLoop, 100); // 100ms for game speed
}


// Generate food at a random position
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return {x, y};
}

// Game loop function
function gameLoop() {
    // Move the snake
    const head = { ...snake[0] };

    if (direction === 'RIGHT') head.x += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;

    // Check for collisions with walls or itself
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollidingWithSnake(head)) {
        endGame();
        return;
    }

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the tail
    }

    // Add new head to the snake
    snake.unshift(head);

    // Clear the canvas and redraw the snake and food
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Check if the snake collides with itself
function isCollidingWithSnake(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Handle keyboard input for snake movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' || e.key === 's' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' || e.key === 'a' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' || e.key === 'd' && direction !== 'LEFT') direction = 'RIGHT';
});

// End the game
function endGame() {
    clearInterval(gameInterval);
    
    // Display game over message
    const gameOverMessage = document.getElementById('gameOverMessage');
    const finalScore = document.getElementById('finalScore');
    
    finalScore.textContent = score;  // Display the final score
    gameOverMessage.classList.remove('hidden');  // Remove 'hidden' to show the message
}


// Restart the game
restartButton.addEventListener('click', startGame);

// Start the game for the first time
startGame();
