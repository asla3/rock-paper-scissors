// options for the game
type GameOptions = 'rock' | 'paper' | 'scissors';

let playerScore = 0;
let computerScore = 0;
let round = 0;
let gameOptionsDisabled = false;
const availableGameOptions: GameOptions[] = ['rock', 'paper', 'scissors'];

//buttons
const buttonsWrapper = document.getElementById('buttons-wrapper');
const startRoundButton = document.getElementById('game-button');
const resetButton = document.getElementById('reset-button');
// results
const scoresWrapper = document.getElementById('info-wrapper');
const roundLastResults = document.getElementById('round-result');
const playerScoreDisplayer = document.getElementById('player-score');
const computerScoreDisplayer = document.getElementById('computer-score');
const roundDisplayer = document.getElementsByClassName('round')[0];
const announcerWrapper = document.getElementById('winner-announcer');
const announcer = document.getElementById('announcer');
// clickable options
const optionsWrapper = document.getElementById('options-wrapper');
const clickableGameOptions = document.getElementsByClassName('option');

// disables the clickable options
const toggleDisabled = () => {
	for (let i = 0; i < clickableGameOptions.length; i++) {
		const gameOption = clickableGameOptions[i];
		gameOption.toggleAttribute('disabled');
	}
	gameOptionsDisabled = !gameOptionsDisabled;
};

// this function takes the player's choice and determines who won the round
const determineRound = (playerSelection: GameOptions) => {
	// simulates a random selection for the computer by calling Math.random()
	const computerSelection = availableGameOptions[Math.floor(Math.random() * 3)];
	roundLastResults.style.display = 'block';
	buttonsWrapper.classList.remove('hidden');
	startRoundButton.removeAttribute('disabled');
	if (playerSelection == computerSelection) {
		roundLastResults.innerText = 'Tie!';
	}
	// checks if the player won
	else if (
		(playerSelection == 'rock' && computerSelection == 'scissors') ||
		(playerSelection == 'paper' && computerSelection == 'rock') ||
		(playerSelection == 'scissors' && computerSelection == 'paper')
	) {
		playerScore++;
		playerScoreDisplayer.textContent = `${playerScore}`;
		roundLastResults.innerText = 'You won!';
	} else {
		computerScore++;
		computerScoreDisplayer.textContent = `${computerScore}`;
		roundLastResults.innerText = 'Computer won!';
	}
	// disable game buttons so the player can't change their choice
	toggleDisabled();
	if (playerScore == 5 || computerScore == 5) {
		startRoundButton.toggleAttribute('disabled');
		announcerWrapper.style.display = 'block';
		if (playerScore == 5) {
			announcer.innerText = 'won';
		} else {
			announcer.innerText = 'lost';
		}
	}
};

// resets the game and starts another round
const resetGame = () => {
	round = 0;
	playerScore = 0;
	computerScore = 0;
	playerScoreDisplayer.textContent = `${playerScore}`;
	computerScoreDisplayer.textContent = `${computerScore}`;
	announcerWrapper.style.display = 'none';
	playRound();
};

const playRound = () => {
	if (round == 0) {
		scoresWrapper.style.display = 'block';
		optionsWrapper.style.display = 'block';
		startRoundButton.innerText = 'Next round';
	}
	round++;
	roundDisplayer.textContent = `${round}`;
	buttonsWrapper.classList.add('hidden');
	roundLastResults.style.display = 'none';
	// if the buttons are disable enable them
	if (gameOptionsDisabled) {
		toggleDisabled();
	}
};

// listener for the game options
for (let i = 0; i < clickableGameOptions.length; i++) {
	clickableGameOptions[i].addEventListener('click', (e) => {
		const elementId = (<HTMLElement>e.target).id;
		if (
			elementId == 'rock' ||
			elementId == 'scissors' ||
			elementId == 'paper'
		) {
			determineRound(elementId);
		}
	});
}
startRoundButton.addEventListener('click', playRound);
resetButton.addEventListener('click', resetGame);
