const solution = "abcd";
let guess = ""
let numMoves = 0;

const saveInput = (val) => {
  // Never need to reset guess b/c it gets re-saved on the onkeyup event
  guess = val // type is string
}

const masterMind = () => {
    numMoves++;

    if (solution === guess) {
        window.alert(`You guessed it in ${numMoves} moves!`);
        window.location.reload(true); // will also reset numMoves 
    } else {
        const hint = generateHint(guess);
        const row = document.createElement("p")
        row.innerHTML = `#${numMoves}:   Guess was ${guess}..... hint is ${hint}`;
        document.getElementById("board").append(row);
        checkMoves();
    }
}

const generateHint = (guess) => {
    let guessArray = guess.replace(/\s+/g, '').split(''); // Remove white space. Turn each character into an array element
    let solutionArray = solution.split('');
    let correctLetterLocations = 0;
    let correctLetters = 0;

    for (let i = 0; i < solutionArray.length; i++) {
        if (guessArray[i] === solutionArray[i]) {
            solutionArray[i] = null;
            correctLetterLocations++;
        }
    }

    for (let i = 0; i < solutionArray.length; i++) {

      const targetIndex = solutionArray.indexOf(guessArray[i])

      if (targetIndex > -1) {
        solutionArray[i] = null; // not really needed 
        correctLetters++
      }
    }

    return `${correctLetterLocations}-${correctLetters}`
}

const checkMoves = () => {
    if (numMoves === 10) {
        window.alert(`You ran out of turns! The solution was ${solution}.`)
        window.location.reload(true); // will also reset numMoves 
    }
}