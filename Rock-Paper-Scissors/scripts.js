let userScore = 0;
let compScore = 0;

const scoreOfUser = document.getElementById('user-score');
const scoreOfComp = document.getElementById('comp-score');
const result = document.querySelector('.result > p');

const rock = document.getElementById('r');
const paper = document.getElementById('p');
const scissors = document.getElementById('s');
const restart = document.getElementById('restart');

const smallUser = 'user'.fontsize(3).sup();
const smallComp = 'comp'.fontsize(3).sup();

function getCompChoice() {
	const choices = ['r', 'p', 's'];
	const compChoice = choices[Math.floor(Math.random() * choices.length)];
	return compChoice;
}

function formatChoice(choice) {
	if (choice === 'r') return 'Rock';
	if (choice === 'p') return 'Paper';
	if (choice === 's') return 'Scissors';
}

function hideItems() {
	['r', 'p', 's', 'action-message'].forEach((div) => document.getElementById(div).classList.add('hidden'));
	document.getElementById('restart').classList.remove('hidden');
}

function showItems() {
	['r', 'p', 's', 'action-message'].forEach((div) => document.getElementById(div).classList.remove('hidden'));
	document.getElementById('restart').classList.add('hidden');
}

function resetScore() {
	userScore = 0;
	compScore = 0;
	scoreOfUser.innerHTML = userScore;
	scoreOfComp.innerHTML = compScore;
	result.innerHTML = 'Choose Rock, Paper or Scissors to start playing.';
}

function getResult(userScore, compScore) {
	if (userScore > compScore) {
		result.innerHTML = `Congrats, you won with a score of ${userScore}${smallUser} : ${compScore}${smallComp}!`;
	} else {
		result.innerHTML = `Wow, a computer beat you with a score of ${userScore}${smallUser} : ${compScore}${smallComp}!`;
	}
}

function win(userChoice, compChoice) {
	userScore++;
	scoreOfUser.innerHTML = userScore;
	if (userScore + compScore >= 15) {
		hideItems();
		getResult(userScore, compScore);
	} else {
		result.innerHTML = `${formatChoice(userChoice)}${smallUser} beats ${formatChoice(compChoice)}${smallComp}. You won!`;
		const borders = document.getElementById(userChoice).classList;
		borders.add('green-glow');
		setTimeout(() => borders.remove('green-glow'), 300);
	}
}

function loose(userChoice, compChoice) {
	compScore++;
	scoreOfComp.innerHTML = compScore;
	if (userScore + compScore >= 15) {
		hideItems();
		getResult(userScore, compScore);
	} else {
		result.innerHTML = `${formatChoice(userChoice)}${smallUser} looses to ${formatChoice(compChoice)}${smallComp}. You lost.`;
		const borders = document.getElementById(userChoice).classList;
		borders.add('red-glow');
		setTimeout(() => borders.remove('red-glow'), 300);
	}
}

function draw(userChoice, compChoice) {
	result.innerHTML = `${formatChoice(userChoice)}${smallUser} equals ${formatChoice(compChoice)}${smallComp}. It's a draw.`;
	const borders = document.getElementById(userChoice).classList;
	borders.add('gray-glow');
	setTimeout(() => borders.remove('gray-glow'), 300);
}

function game(userChoice) {
	const compChoice = getCompChoice();
	switch (userChoice + compChoice) {
		case 'pr':
		case 'rs':
		case 'sp':
			win(userChoice, compChoice);
			break;
		case 'rp':
		case 'sr':
		case 'ps':
			loose(userChoice, compChoice);
			break;
		case 'rr':
		case 'ss':
		case 'pp':
			draw(userChoice, compChoice);
			break;
	}
}

function main() {
	rock.addEventListener('click', () => game('r'));
	paper.addEventListener('click', () => game('p'));
	scissors.addEventListener('click', () => game('s'));
	restart.addEventListener('click', () => {
		showItems();
		resetScore();
	});
}

main();
