'use strict';
var colors = require('colors'); // colors package

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
const solution = "abcd";

const masterMind = (guess) => {
    if (solution === guess) {
        console.log("You guessed it!");
        return true; // return statement for the tests
    } else {
        const hint = generateHint(guess);
        board.push(`${guess}, ${hint}`);
        console.log(board);
        return false; //return statement for the tests
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

      // Another method:
      // if (guessArray[i] === solutionArray[0] || guessArray[i] === solutionArray[1] || guessArray[i] === solutionArray[2] || guessArray[i] === solutionArray[3]) {
      //     correctLetters++;
      // }  
    }

    console.log(`Correct letter locations & letters: ${correctLetterLocations.toString().red}-${correctLetters.toString().white}`) // uses colors package
    return `${correctLetterLocations}-${correctLetters}`
}

const checkMoves = () => {
    if (board.length < 10) { 
        getPrompt();
        return true; //return statement for the tests
    } else {
        console.log(`You ran out of turns! The solution was ${solution}.`)
        return false; //return statement for the tests
    }
}

const getPrompt = () => {
    rl.question('guess: ', (a) => {
        masterMind(a);

        checkMoves();
    });
  }
  
  // Tests
  
  if (typeof describe === 'function') {
  
    describe('#getPrompt()', () => {
      it('should stop after 10 guesses', () => {
        board.length = 10; // game needs to stop
        assert.equal(checkMoves(), false);
      });
    });
  
    describe('#generateHint()', () => {
      it('should generate the correct hint', () => {
        assert.deepEqual(generateHint('aecd'), '3-0');
      });
    });

    describe('#checkForWin()', () => {
      it('should detect a win', () => {
        solution = "qwer"
        assert.equal(masterMind("qwer"), true);
        assert.equal(masterMind("qwet"), false);
      });
    });
  
  } else {
  
    getPrompt();
  
  }
  