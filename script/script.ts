// possible options for the game
type GameOptions = 'rock' | 'paper' | 'scissors'
// storing player and computer's score
let playerScore = 0
let computerScore = 0
// array that contains all the possible choices in the game
const options: GameOptions[] = ['rock', 'paper', 'scissors']
// this function takes the player's choice and the computer's choice. It returns the winner
function determineWinner(
	playerSelection: GameOptions,
	computerSelection: GameOptions
) {
	// checks if user won
	if (
		(playerSelection == 'rock' && computerSelection == 'scissors') ||
		(playerSelection == 'paper' && computerSelection == 'rock') ||
		(playerSelection == 'scissors' && computerSelection == 'paper')
	) {
		return 'player'
	}
	// checks if there's a tie
	else if (playerSelection == computerSelection) {
		return 'tie'
	}
	// check if user lost
	else {
		return 'computer'
	}
}
// this function asks and validates the user choice. Returns the user choice if it is valid, if not, it asks the user to try again
function askUserInput(): GameOptions {
	// calls window.prompt to get the player's option
	let userInput = window.prompt('Pick an option: ')
	// check if not undefined
	if (userInput) {
		// lowercase it so the user can write it with caps or without any caps at all
		userInput = userInput.toLowerCase()
		// validates that it is a valid answer
		if (
			userInput === 'rock' ||
			userInput === 'scissors' ||
			userInput === 'paper'
		) {
			return userInput
		}
	}
	// if its undefined or not a valid answer, it calls the function to try again.
	console.log(
		'Invalid input. Try again. You can just choose rock, paper or scissors'
	)
	return askUserInput()
}
// this function starts the game
function startGame() {
	// starts a loop so the user can play five rounds
	for (let i = 0; i < 5; i++) {
		// prints the current round to the console
		console.log(`Round ${i + 1}`)
		// prints how many rounds there are left
		if (i == 3) {
			console.log(`There is 1 round left`)
		} else {
			console.log(`There are ${4 - i} rounds left`)
		}
		// call askUserInput so we can ask the user to choose an option
		let userSelection = askUserInput()
		// simulates a random choice by accessing the options array in a random position
		const computerSelection = options[Math.floor(Math.random() * 3)]
		// calls determineWinner to get the winner of the round
		const winner = determineWinner(userSelection, computerSelection)
		// if player wins, print to console and add 1 to player's score
		if (winner == 'player') {
			console.log('Congratulations! You won.')
			playerScore++
		}
		// if it's a tie, just print to the console
		else if (winner == 'tie') {
			console.log('Tie!')
		}
		// if computer won, add one to computer's score and print to the console
		else {
			console.log('You lost! :(')
			computerScore++
		}
		// prints all the choices
		console.log(
			`Your choice: ${userSelection}. Computer's choice: ${computerSelection}`
		)
		// prints the current score
		console.log(`Score: ${playerScore} - ${computerScore}.`)
	}
	// prints the result of the game
	console.log('The game has ended!')
	console.log(`Final score ${playerScore} - ${computerScore}`)
	if (playerScore < computerScore) {
		console.log('You lost the game! Try again.')
	} else if (playerScore > computerScore) {
		console.log('You won!')
	} else {
		console.log('Tie!')
	}
}
// calling startGame so we can start the game
startGame()
