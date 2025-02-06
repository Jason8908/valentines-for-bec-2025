const Wordle = (() => {
  const module = {};

  let thisDocument = null;
  let word = 'YES';
  let guess = ['', '', ''];
  let guesses = 0;
  let currIndex = 0;
  let currRow = null;
  let table = null;
  let onGameEnd = null;
  const MAX_INDEX = 3;
  const Colours = {
    CORRECT: '#69AA64',
    PRESENT: '#C9B458',
    INCORRECT: '#777C7E'
  }

  const wordleID = 'wordleContainer';
  const tableID = 'wordleTable';
  const helpID = 'helpContainer';

  let helpTimeout = null;

  const init = (doc, callback) => {
    thisDocument = doc;
    onGameEnd = callback;
    const game = thisDocument.querySelector(`#${wordleID}`);
    // Get table
    table = thisDocument.querySelector(`#${tableID}`);
    // Create first row
    currRow = createRow();
    table.appendChild(currRow);
    // Set event listener
    thisDocument.addEventListener('keydown', handleKeyPress);
    // Show game
    game.style.display = 'block';
    setTimeout(() => {
      game.style.opacity = 1;
    }, 1);
    // Show help
    helpTimeout = setTimeout(() => {
      thisDocument.querySelector(`#${helpID}`).style.opacity = 1;
    }, 5000);
  }

  const createRow = () => {
    /*
    <tr class="wordle-row">
      <td class="wordle-cell">
        <div class="content"></div>
      </td>
      <td class="wordle-cell">
        <div class="content"></div>
      </td>
      <td class="wordle-cell">
        <div class="content"></div>
      </td>
    </tr>
    */
    const row = thisDocument.createElement('tr');
    row.classList.add('wordle-row');
    for (let i = 0; i < 3; i++) {
      const cell = thisDocument.createElement('td');
      cell.classList.add('wordle-cell');
      const content = thisDocument.createElement('div');
      content.classList.add('content');
      cell.appendChild(content);
      row.appendChild(cell);
      // Set ID of the cell
      content.id = `cell-${guesses}_${i}`;
    }
    return row;
  }

  const handleKeyPress = (event) => {
    // If not an alphabet letter or enter, or backspace, ignore
    if (!(event.key.length == 1 && event.key.match(/[a-zA-Z]/)) && event.key !== 'Enter' && event.key !== 'Backspace') {
      return;
    }
    // Clear help timeout
    if (helpTimeout) {
      clearTimeout(helpTimeout);
      helpTimeout = null;
      thisDocument.querySelector(`#${helpID}`).style.opacity = 0;
    }
    switch (event.key) {
      case 'Enter':
        handleEnterPress();
        break;
      case 'Backspace':
        handleBackspacePress();
        break;
      default:
        handleLetterPress(event.key);
    }
  }

  const endGame = () => {
    // Show confetti
    showConfetti();
    // Remove event listener
    thisDocument.removeEventListener('keydown', handleKeyPress);
    // Call callback
    onGameEnd();
  }

  const handleEnterPress = () => {
    // If word not complete, ignore
    if (currIndex < 1) {
      return;
    }
    // Check each letter
    const result = examineGuess();
    // Update colours
    for (let i = 0; i < 3; i++) {
      const cell = thisDocument.querySelector(`#cell-${guesses}_${i}`);
      cell.parentElement.style.backgroundColor = result[i];
      cell.parentElement.style.border = 'none';
      cell.style.color = 'white';
    }
    const guessStr = guess.join('');
    if (guessStr === word) {
      return endGame();
    }
    // Create new row
    guesses++;
    currRow = createRow();
    table.appendChild(currRow);
    currRow.scrollIntoView({
      behavior: 'smooth'
    });
    // Reset variables
    guess = ['', '', ''];
    currIndex = 0;
  }

  const handleBackspacePress = () => {
    // If letters not entered, ignore
    if (currIndex === 0) {
      return;
    }
    guess[--currIndex] = '';
    updateRow();
  }

  const handleLetterPress = (letter) => {
    // If word complete, ignore
    if (currIndex === MAX_INDEX) {
      return;
    }
    letter = letter.toUpperCase();
    guess[currIndex++] = letter;
    updateRow();
  }

  const updateRow = () => {
    for (let i = 0; i < 3; i++) {
      const cell = thisDocument.querySelector(`#cell-${guesses}_${i}`);
      // If the letter is not entered, clear the cell
      cell.textContent = guess[i];
    }
  }

  const examineGuess = () => {
    let result = [];
    let wordArr = word.split('');
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (wordArr.includes(letter)) {
        const index = wordArr.indexOf(letter);
        wordArr[index] = null;
        if (index === i) {
          result.push(Colours.CORRECT);
        } else {
          result.push(Colours.PRESENT);
        }
      } else {
        result.push(Colours.INCORRECT);
      }
    }
    return result;
  }

  module.init = init;
  return module;
})();