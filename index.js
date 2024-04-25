const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }
  // implement the guessLetter function:
  guessLetter(letter) {
    this.letter = letter
    // Checks if letter is in the word
    if (this.word.includes(letter)) {
      // replaces underscore with letter
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          this.displayWord = this.displayWord.substring(0,i) + letter + this.displayWord.substring(i+1, this.displayWord.length)
        }
      }
      // adds letter to correctLetters array
      this.correctLetters.push(letter)
    } else {
      // decreases remaining guesses
      this.remainingGuesses -= 1
      // adds letter to incorrectLetters array
      this.incorrectLetters.push(letter)
    }
  }
  // implement the updateScreen function:
  updateScreen() {
    document.getElementById("remaining-guesses").textContent = this.remainingGuesses
    document.getElementById("incorrect-letters").textContent = this.incorrectLetters
    document.getElementById("word-to-guess").textContent = this.displayWord
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.remainingGuesses <= 0 || this.displayWord === this.word) {
      return true
    } else {
      return false
    }
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.remainingGuesses > 0 && this.displayWord === this.word) {
      return 'win'
    } if (this.remainingGuesses <= 0 && this.displayWord !== this.word) {
      return 'loss'
    } else {
      return null
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()