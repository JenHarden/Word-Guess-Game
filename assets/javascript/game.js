$(document).ready(function () {

    var potentialWords = [{
        name: "indiana jones",
        image: "./assets/images/Indiana-Jones.jpg"
    },
    {
        name: "star wars",
        image: "./assets/images/Star-Wars.jpg"
    },
    {
        name: "harry potter",
        image: "./assets/images/Harry Potter.jpg"
    },
    {
        name: "the lord of the rings",
        image: "./assets/images/LOTR.jpg"
    },
    {
        name: "the fast and the furious",
        image: "./assets/images/Fast-and-Furious.jpg"
    },
    {
        name: "back to the future",
        image: "./assets/images/Back to the Future.jpg"
    },
    {
        name: "pirates of the caribbean",
        image: "./assets/images/Pirates-Caribbean.jpg"
    },
    {
        name: "jurassic park",
        image: "./assets/images/jurassic-park.jpg"
    },
    {
        name: "transformers",
        image: "./assets/images/Transformers.jpg"
    },
    {
        name: "mission impossible",
        image: "./assets/images/mission_impossible.jpg"
    },
    {
        name: "rocky",
        image: "./assets/images/rocky.png"
    },
    {
        name: "the matrix",
        image: "./assets/images/matrix.jpg"
    },
    {
        name: "the terminator",
        image: "./assets/images/terminator.jpg"
    },
    {
        name: "die hard",
        image: "./assets/images/die_hard.png"
    },
    {
        name: "underworld",
        image: "./assets/images/underworld.jpg"
    },
    {
        name: "predator",
        image: "./assets/images/predator.jpg"
    },
    {
        name: "alien",
        image: "./assets/images/alien.jpg"
    },
    {
        name: "home alone",
        image: "./assets/images/home_alone.jpg"
    },
    {
        name: "jaws",
        image: "./assets/images/jaws.jpg"
    },
    {
        name: "mad max",
        image: "./assets/images/mad_max.jpg"
    },
    {
        name: "smokey and the bandit",
        image: "./assets/images/smokey.jpg"
    }
];

    const maxGuesses = 14;
    var pauseGame = false;

    var lettersGuessed = [];
    var shownMovies = [];
    var guessingWord = [];
    var wordToMatch;
    var numberOfGuesses;
    var wins = 0;

    // Getting the initial movie data
    resetGame()

    // Awaiting key press event
    document.onkeypress = function (event) {

        // To make sure that the pressed key is a letter (converts it to upper case) and is the game not paused
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }
    // Checks to see if the letter is in the word
    function checkForLetter(letter) {
        var letterFound = false;
        var correctSoundEffect = document.createElement("audio");
        var incorrectSoundEffect = document.createElement("audio");
        correctSoundEffect.setAttribute("src", "assets/sounds/blop.mp3");
        incorrectSoundEffect.setAttribute("src", "assets/sounds/ting.mp3");

        //Searching to see if the letter is in the movie
        for (var i = 0; i < wordToMatch.length; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                letterFound = true
                correctSoundEffect.play()

                // To see if guessed movie matches the selected movie
                if (guessingWord.join("") === wordToMatch) {

                    // To increase the number of wins
                    wins++;
                    wordToMatch = "";

                    // This is the defined win state
                    if (wins === 10) {
                        var winSoundEffect = document.createElement("audio");
                        winSoundEffect.setAttribute("src", "assets/sounds/winning.mp3")
                        document.getElementById("hint").src = "./assets/images/awards.jpg";
                        winSoundEffect.play();
                    } else {
                        pauseGame = true;
                        setTimeout(resetGame, 4000);
                    }
                }
            }
        }


        // If the letter is not found in the selected movie

        if (!letterFound) {
            incorrectSoundEffect.play()

            // To check if the incorrect letter is already on the guessed letter list, if not, then push it to the list and decrease the number of guesses by 1
            if (!lettersGuessed.includes(letter)) {
                lettersGuessed.push(letter)
                numberOfGuesses--
            }
            // If the number of guesses left = 0, then you lose
            if (numberOfGuesses === 0) {
                var loseSoundEffect = document.createElement("audio");
                loseSoundEffect.setAttribute("src", "assets/sounds/loser.mp3")
                document.getElementById("hint").src = "./assets/images/Loser.jpg";
                loseSoundEffect.play();
                guessingWord = wordToMatch.split()
                pauseGame = true
            }
        }

        updateDisplay()
    }

    // Checks to see if the key pressed is between a-z
    function isAlpha(ch) {
        return /^[A-Z]$/i.test(ch);
    }

    // This initialize game variables and restarts the random movie selection
    function resetGame() {
        // To reset the arrays
        lettersGuessed = []
        guessingWord = []
        numberOfGuesses = maxGuesses;
        pauseGame = false;

        for (var i = 0; i < potentialWords.length; i++) {
            selectedMovie = potentialWords[Math.floor(Math.random() * potentialWords.length)];
            if (shownMovies.indexOf(selectedMovie) < 0) {
                shownMovies.push(selectedMovie);
                break;
            }
        }
        wordToMatch = selectedMovie.name.toUpperCase();
        document.getElementById("hint").src = selectedMovie.image;


        // To reset the guessed word
        for (var i = 0; i < wordToMatch.length; i++) {
            // To put a space instead of the _ between words of multiple display
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push(" _")
            }
        }

        updateDisplay()
    }

    // This will update the display as gameplay advances
    function updateDisplay() {
        document.getElementById("wins").innerHTML = wins
        document.getElementById("current-word").innerHTML = guessingWord.join("")
        document.getElementById("guesses-left").innerHTML = numberOfGuesses
        document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(" ")
    }

});