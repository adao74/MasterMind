'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = "abcd";

const masterMind = (guess) => {
    if (solution === guess) {
        console.log("You guessed it!");
    } else {
        let hint = generateHint(guess);
        board.push(`${guess}, ${hint}`);
        console.log(board);
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
        if (guessArray[i] === solutionArray[0] || guessArray[i] === solutionArray[1] || guessArray[i] === solutionArray[2] || guessArray[i] === solutionArray[3]) {
            correctLetters++;
        }  
    }

    return `${correctLetterLocations}-${correctLetters}`

}

const getPrompt = () => {
    rl.question('guess: ', (a) => {
        masterMind(a)

        if (board.length < 10) { 
            getPrompt();
        } else {
            console.log(`You ran out of turns! The solution was ${solution}.`)
        }
    });
  }
  
  // Tests
  
  if (typeof describe === 'function') {
  
    describe('#towersOfHanoi()', () => {
      it('should be able to move a block', () => {
        towersOfHanoi('a', 'b');
        assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
      });
    });
  
    describe('#isLegal()', () => {
      it('should not allow an illegal move', () => {
        stacks = {
          a: [4, 3, 2],
          b: [1],
          c: []
        };
        assert.equal(isLegal('a', 'b'), false);
      });
      it('should allow a legal move', () => {
        stacks = {
          a: [4, 3, 2, 1],
          b: [],
          c: []
        };
        assert.equal(isLegal('a', 'c'), true);
      });
    });
    describe('#checkForWin()', () => {
      it('should detect a win', () => {
        stacks = { a: [], b: [4, 3, 2, 1], c: [] };
        assert.equal(checkForWin(), true);
        stacks = { a: [1], b: [4, 3, 2], c: [] };
        assert.equal(checkForWin(), false);
      });
    });
  
  } else {
  
    getPrompt();
  
  }
  