let humanScore = 0;
let computerScore = 0;

let winCondition = {"rock":"scissors", "paper":"rock", "scissors":"paper"};

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

function getHumanChoice(){
    //let choice = prompt("Enter Rock, Paper or Scissors");
    let choice = "rock";
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("Tie!");
    } else if (winCondition[humanChoice] === computerChoice) {
        console.log("You win!");
        humanScore += 1;
    } else { 
        console.log ("Computer wins!");
        humanScore += 1;
    }
}

function PlayGame() {
    let playerChoice = getHumanChoice();
    let comChoice = getComputerChoice();
    playRound(playerChoice, comChoice);

    
}

