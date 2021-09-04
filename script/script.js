var playerScore = 0;
var computerScore = 0;
var round = 0;
var gameOptionsDisabled = false;
var availableGameOptions = ['rock', 'paper', 'scissors'];
//buttons
var buttonsWrapper = document.getElementById('buttons-wrapper');
var startRoundButton = document.getElementById('game-button');
var resetButton = document.getElementById('reset-button');
// results
var scoresWrapper = document.getElementById('info-wrapper');
var lastResults = document.getElementById('result');
var playerScoreDisplayer = document.getElementById('player-score');
var computerScoreDisplayer = document.getElementById('computer-score');
var roundDisplayer = document.getElementsByClassName('round')[0];
// clickable options
var optionsWrapper = document.getElementById('options-wrapper');
var clickableGameOptions = document.getElementsByClassName('option');
// disables the clickable options
var toggleDisabled = function () {
    for (var i = 0; i < clickableGameOptions.length; i++) {
        var gameOption = clickableGameOptions[i];
        gameOption.toggleAttribute('disabled');
    }
    gameOptionsDisabled = !gameOptionsDisabled;
};
// this function takes the player's choice and determines who won the round
var determineRound = function (playerSelection) {
    // simulates a random selection for the computer by calling Math.random()
    var computerSelection = availableGameOptions[Math.floor(Math.random() * 3)];
    lastResults.style.display = 'block';
    buttonsWrapper.classList.remove('hidden');
    resetButton.style.display = 'block';
    startRoundButton.innerText = 'Next round';
    if (playerSelection == computerSelection) {
        lastResults.innerText = 'Tie!';
    }
    // checks if the player won
    else if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
        (playerSelection == 'paper' && computerSelection == 'rock') ||
        (playerSelection == 'scissors' && computerSelection == 'paper')) {
        playerScore++;
        playerScoreDisplayer.textContent = "" + playerScore;
        lastResults.innerText = 'You won!';
    }
    else {
        computerScore++;
        computerScoreDisplayer.textContent = "" + computerScore;
        lastResults.innerText = 'Computer won!';
    }
    // disable game buttons so the player can't change their choice
    toggleDisabled();
};
// resets the game and starts another round
var resetGame = function () {
    round = 0;
    playerScore = 0;
    computerScore = 0;
    playRound();
};
var playRound = function () {
    round++;
    buttonsWrapper.classList.add('hidden');
    scoresWrapper.style.display = 'block';
    roundDisplayer.textContent = "" + round;
    optionsWrapper.style.display = 'block';
    lastResults.style.display = 'none';
    playerScoreDisplayer.textContent = "" + playerScore;
    computerScoreDisplayer.textContent = "" + computerScore;
    // if the buttons are disable enable them
    if (gameOptionsDisabled) {
        toggleDisabled();
    }
};
// listener for the game options
for (var i = 0; i < clickableGameOptions.length; i++) {
    clickableGameOptions[i].addEventListener('click', function (e) {
        var elementId = e.target.id;
        if (elementId == 'rock' ||
            elementId == 'scissors' ||
            elementId == 'paper') {
            determineRound(elementId);
        }
    });
}
startRoundButton.addEventListener('click', playRound);
resetButton.addEventListener('click', resetGame);
