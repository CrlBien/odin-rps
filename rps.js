const WIN_CONDITION = {"rock":"scissors", "paper":"rock", "scissors":"paper"};

const scoreInfo = document.querySelector("#scoreInfo");
const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const playAgainMsg = document.querySelector(".play-again-message");
const playerHand = document.querySelector("#playerHand");
const computerHand = document.querySelector("#computerHand");
const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");

let humanScore = 0;
let comScore = 0;

const buttons = document.querySelectorAll('.gesture-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const handSelected = button.textContent.trim().toLowerCase();
        playRound(handSelected);
    });
});

function setButtonsDisabled(disabled) {
    buttons.forEach(btn => btn.disabled = disabled);
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    if(randomNumber === 0) {
        return "rock";
    } else if (randomNumber === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function compareHands(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return 'tie';
    } else if (WIN_CONDITION[humanChoice] === computerChoice) {
        humanScore += 1;
        return 'player';
    } else { 
        comScore += 1;
        return 'computer';
    }
}

function updateScoreInfo(roundWinner, pScore, cScore) {
    switch (roundWinner) {
        case 'player':
            scoreInfo.textContent = "You win this round.";
            playerScore.textContent = `${pScore}`;
            break;
        case 'computer':
            scoreInfo.textContent = "You lose this round.";
            computerScore.textContent = `${cScore}`;
            break;
        case 'tie':
            scoreInfo.textContent = "It's a tie.";
            break;
    }
}

function playRound(humanChoice) {
    playerHand.src = 'images/hands/rock.png';
    computerHand.src = 'images/hands/rock.png';
    if (humanScore >= 5 || comScore >= 5) return;

    const computerChoice = getComputerChoice();

    setButtonsDisabled(true);

    playerHand.classList.remove('animate-player');
    computerHand.classList.remove('animate-computer');
    void playerHand.offsetWidth;
    void computerHand.offsetWidth;

    playerHand.classList.add('animate-player');
    computerHand.classList.add('animate-computer');

    setTimeout(() => {
        playerHand.src = `images/hands/${humanChoice}.png`;
        computerHand.src = `images/hands/${computerChoice}.png`;

        const roundWinner = compareHands(humanChoice, computerChoice);
        updateScoreInfo(roundWinner, humanScore, comScore);

        if (humanScore >= 5 || comScore >= 5) {
            showPlayAgainMessage();
        } else {
            setButtonsDisabled(false);
        }
    }, 1500);
}

function showPlayAgainMessage() {
    playAgainMsg.style.visibility = 'visible';
    scoreInfo.textContent = "YOU WIN THE GAME!";
    document.body.addEventListener('click', restartGame, { once: true });
}

function restartGame() {
    humanScore = 0;
    comScore = 0;
    playerScore.textContent = '0';
    computerScore.textContent = '0';
    scoreInfo.textContent = 'First to 5 points wins!';
    playAgainMsg.style.visibility = 'hidden';
    playerHand.src = 'images/hands/rock.png';
    computerHand.src = 'images/hands/rock.png';
    setButtonsDisabled(false);
}
