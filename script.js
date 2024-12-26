// Get all cards
const gameCards = document.querySelectorAll('.card');

// Add event listeners for each card to navigate to a game or show a message
gameCards.forEach(card => {
    card.addEventListener('click', () => {
        // Check which game was clicked and navigate accordingly
        switch(card.id) {
            case 'game1':
                window.location.href = 'stonepaperscissors/stonepaperscissors.html';  // Navigate to Stone, Paper, Scissors page
                break;
            case 'game2':
                window.location.href = 'tictactoe/tictactoe.html';  // Navigate to Tic Tac Toe page
                break;
            case 'game3':
                window.location.href = 'snakegame/snakegame.html';  // Navigate to Snake Game page
                break;
            default:
                alert('Game not available!');
        }
    });
});
