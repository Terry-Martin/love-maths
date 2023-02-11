// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

/**
 * The main game loop, called when the script is first loaded
 * and after the users answer has been processed
 */
function runGame(gameType) {

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    }
    else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    }
    
    
    else {
        alert(`Unknown game type: ${gameType}`);
        throw (`Unknown game type: ${gameType}. Aborting!`);
    }

}


/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */

function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    let x = 0;

    if (isCorrect) {
        alert("You da man!")
        incrementScore();
    } else {
        alert(`Unlucky - you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];

    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];

    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];

    } else if (operator === "/") {
        return [operand1 / operand2, "division"];

    } else {
        alert(`Unimplemented operaotor ${operator}`);
        throw `Unimplemented operaotor ${operator}. Aborting!`;
    }
}


/**
 * Get the current correct score from DOM
 * Increment score by 1
 * Displayed incremented score
 */
function incrementScore() {

    let answerCorrect = parseInt(document.getElementById("score").innerText)
    answerCorrect++;
    document.getElementById('score').textContent = answerCorrect;
}

/**
 * Get the current incorrect score from DOM
 * Increment score by 1
 * Displayed incremented score
 */
function incrementWrongAnswer() {
    let answerWrong = parseInt(document.getElementById("incorrect").innerText)
    answerWrong++;
    document.getElementById('incorrect').textContent = answerWrong;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operand1').textContent = (Math.floor(Math.random() * 25) + 1) * operand2;
    document.getElementById('operator').textContent = "/";
}