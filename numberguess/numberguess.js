// script.js
const minRange = 1;
const maxRange = 100;
const secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const resetBtn = document.getElementById('reset-btn');

function resetGame() {
  window.location.reload();
}

submitBtn.addEventListener('click', () => {
  const guess = parseInt(userInput.value);

  if (isNaN(guess)) {
    feedback.textContent = 'Please enter a valid number.';
    feedback.style.color = 'red';
  } else if (guess < minRange || guess > maxRange) {
    feedback.textContent = `Guess must be between ${minRange} and ${maxRange}.`;
    feedback.style.color = 'red';
  } else if (guess === secretNumber) {
    feedback.textContent = 'Congratulations! You guessed it right!';
    feedback.style.color = 'green';
    submitBtn.disabled = true;
    resetBtn.classList.remove('hidden');
  } else if (guess < secretNumber) {
    feedback.textContent = 'Too low! Try again.';
    feedback.style.color = 'orange';
  } else {
    feedback.textContent = 'Too high! Try again.';
    feedback.style.color = 'orange';
  }
});

resetBtn.addEventListener('click', resetGame);
