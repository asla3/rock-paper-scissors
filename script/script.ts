// options for the game
type GameOptions = 'rock' | 'paper' | 'scissors';

let playerScore = 0;
let computerScore = 0;
let round = 0;
let gameOptionsDisabled = false;
const availableGameOptions: GameOptions[] = ['rock', 'paper', 'scissors'];

const mainWrapper = document.getElementsByClassName('game-main-wrapper')[0];
const gameExplanationContainer =
	document.getElementsByClassName('game-explanation')[0];
//buttons
const buttonsWrapper = document.getElementById('main-buttons-wrapper');
const startRoundButton = document.getElementById('game-button');
const resetButton = document.getElementById('reset-button');
const endButton = document.getElementById('end-button');
// results
const scoresWrapper = document.getElementById('info-wrapper');
const roundLastResults = document.getElementById('round-result');
const playerScoreDisplayer = document.getElementById('player-score');
const computerScoreDisplayer = document.getElementById('computer-score');
const roundDisplayer = document.getElementsByClassName('round')[0];
const announcerWrapper = document.getElementById('winner-announcer');
const announcer = document.getElementById('announcer');
// options chosen
const playerSelectionDisplayer = document
	.getElementById('player-last-pick')
	.getElementsByTagName('span')[0];
const computerSelectionDisplayer = document
	.getElementById('computer-last-pick')
	.getElementsByTagName('span')[0];
// clickable options
const optionsWrapper = document.getElementById('options-wrapper');
const clickableGameOptions = document.getElementsByClassName('option');

const rockIconClass = 'far fa-hand-rock';
const paperIconClass = 'far fa-hand-paper';
const scissorsIconClass = 'far fa-hand-scissors';

// Hides the clickable options so the player can't change their option
const toggleHideGameOptions = (hide?: boolean) => {
	optionsWrapper.style.display = hide ? 'none' : 'block';
	gameOptionsDisabled = !gameOptionsDisabled;
};

const showLastPlayed = (
	selection: GameOptions,
	elementToModify: HTMLElement
) => {
	switch (selection) {
		case 'rock':
			elementToModify.setAttribute('class', rockIconClass);
			break;
		case 'paper':
			elementToModify.setAttribute('class', paperIconClass);
			break;
		case 'scissors':
			elementToModify.setAttribute('class', scissorsIconClass);
			break;
	}
};

// this function takes the player's choice and determines who won the round
const determineRoundResult = (playerSelection: GameOptions) => {
	// simulates a random selection for the computer by calling Math.random()
	const computerSelection = availableGameOptions[Math.floor(Math.random() * 3)];
	roundLastResults.style.display = 'block';
	buttonsWrapper.classList.remove('hidden');
	showLastPlayed(playerSelection, playerSelectionDisplayer);
	showLastPlayed(computerSelection, computerSelectionDisplayer);
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
	toggleHideGameOptions(true);
	if (playerScore == 5 || computerScore == 5) {
		startRoundButton.style.display = 'none';
		endButton.style.display = 'inline-block';
	}
};

const endGame = () => {
	(<HTMLElement>mainWrapper).style.display = 'none';
	announcerWrapper.style.display = 'block';
	if (playerScore == 5) {
		announcer.innerText = 'won!';
	} else {
		announcer.innerText = 'lost!';
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
	playerSelectionDisplayer.removeAttribute('class');
	computerSelectionDisplayer.removeAttribute('class');
	(<HTMLElement>mainWrapper).style.display = 'block';
	endButton.style.display = 'none';
	startRoundButton.style.display = 'inline-block';
	playRound();
};

const playRound = () => {
	if (round == 0) {
		scoresWrapper.style.display = 'block';
		optionsWrapper.style.display = 'block';
		(<HTMLElement>gameExplanationContainer).style.display = 'none';
		startRoundButton.innerText = 'Next round';
	}
	round++;
	roundDisplayer.textContent = `${round}`;
	buttonsWrapper.classList.add('hidden');
	roundLastResults.style.display = 'none';
	// if the buttons are disable enable them
	if (gameOptionsDisabled) {
		toggleHideGameOptions();
	}
};

// listener for the game options
for (let i = 0; i < clickableGameOptions.length; i++) {
	clickableGameOptions[i].addEventListener('click', (e) => {
		const clickedOption = (<HTMLElement>e.target).dataset.option;
		// console.log(clickedOption);
		if (
			clickedOption == 'rock' ||
			clickedOption == 'scissors' ||
			clickedOption == 'paper'
		) {
			determineRoundResult(clickedOption);
		}
	});
}
startRoundButton.addEventListener('click', playRound);
resetButton.addEventListener('click', resetGame);
endButton.addEventListener('click', endGame);
