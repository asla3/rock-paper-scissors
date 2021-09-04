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
var roundLastResults = document.getElementById('round-result');
var playerScoreDisplayer = document.getElementById('player-score');
var computerScoreDisplayer = document.getElementById('computer-score');
var roundDisplayer = document.getElementsByClassName('round')[0];
var announcerWrapper = document.getElementById('winner-announcer');
var announcer = document.getElementById('announcer');
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
    roundLastResults.style.display = 'block';
    buttonsWrapper.classList.remove('hidden');
    startRoundButton.removeAttribute('disabled');
    if (playerSelection == computerSelection) {
        roundLastResults.innerText = 'Tie!';
    }
    // checks if the player won
    else if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
        (playerSelection == 'paper' && computerSelection == 'rock') ||
        (playerSelection == 'scissors' && computerSelection == 'paper')) {
        playerScore++;
        playerScoreDisplayer.textContent = "" + playerScore;
        roundLastResults.innerText = 'You won!';
    }
    else {
        computerScore++;
        computerScoreDisplayer.textContent = "" + computerScore;
        roundLastResults.innerText = 'Computer won!';
    }
    // disable game buttons so the player can't change their choice
    toggleDisabled();
    if (playerScore == 5 || computerScore == 5) {
        startRoundButton.toggleAttribute('disabled');
        announcerWrapper.style.display = 'block';
        if (playerScore == 5) {
            announcer.innerText = 'won';
        }
        else {
            announcer.innerText = 'lost';
        }
    }
};
// resets the game and starts another round
var resetGame = function () {
    round = 0;
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplayer.textContent = "" + playerScore;
    computerScoreDisplayer.textContent = "" + computerScore;
    announcerWrapper.style.display = 'none';
    playRound();
};
var playRound = function () {
    if (round == 0) {
        scoresWrapper.style.display = 'block';
        optionsWrapper.style.display = 'block';
        startRoundButton.innerText = 'Next round';
    }
    round++;
    roundDisplayer.textContent = "" + round;
    buttonsWrapper.classList.add('hidden');
    roundLastResults.style.display = 'none';
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
