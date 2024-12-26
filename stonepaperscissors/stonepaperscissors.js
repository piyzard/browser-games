// Get the elements
const playerChoiceDisplay = document.getElementById('player-choice');
const aiChoiceDisplay = document.getElementById('ai-choice');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');

// Choice buttons
const stoneButton = document.getElementById('stone');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Array of possible choices
const choices = ['Stone', 'Paper', 'Scissors'];

// Function to get AI's random choice
function getAIChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
        return "It's a Draw!";
    }
    if (
        (playerChoice === 'Stone' && aiChoice === 'Scissors') ||
        (playerChoice === 'Paper' && aiChoice === 'Stone') ||
        (playerChoice === 'Scissors' && aiChoice === 'Paper')
    ) {
        return "You Win!";
    }
    return "AI Wins!";
}

// Function to handle player choice
function handlePlayerChoice(choice) {
    const playerChoice = choice;
    const aiChoice = getAIChoice();

    // Display choices
    playerChoiceDisplay.textContent = playerChoice;
    aiChoiceDisplay.textContent = aiChoice;

    // Determine winner
    const winner = determineWinner(playerChoice, aiChoice);
    winnerDisplay.textContent = winner;
}

// Event listeners for player choices
stoneButton.addEventListener('click', () => handlePlayerChoice('Stone'));
paperButton.addEventListener('click', () => handlePlayerChoice('Paper'));
scissorsButton.addEventListener('click', () => handlePlayerChoice('Scissors'));

// Reset the game
resetButton.addEventListener('click', () => {
    playerChoiceDisplay.textContent = '';
    aiChoiceDisplay.textContent = '';
    winnerDisplay.textContent = '';
});
