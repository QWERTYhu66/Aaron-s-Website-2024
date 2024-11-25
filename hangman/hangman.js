async function loadWords() {
    try {
        const response = await fetch("./12dicts_words.txt");
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        const words = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        if (words.length === 0) throw new Error("No words loaded.");
        return words;
    } catch (error) {
        console.error("Error loading words:", error.message);
        return ["hangman", "javascript", "python", "coding"];
    }
}

function getGuess() {
    const guess = document.getElementById("guess").value.toLowerCase();
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Please enter a single lowercase letter.");
        return null;
    }
    document.getElementById("guess").value = "";
    return guess;
}

function updateDashes(secretWord, dashes, guess) {
    return secretWord
        .split("")
        .map((char, idx) => (char === guess ? guess : dashes[idx]))
        .join("");
}

const hangmanStages = [
    "+------+",
    "+------+<br>|      |",
    "+------+<br>|      |<br>|      O",
    "+------+<br>|      |<br>|      O<br>|    --+--",
    "+------+<br>|      |<br>|      O<br>|    --+--<br>|      |",
    "+------+<br>|      |<br>|      O<br>|    --+--<br>|      |<br>|     / \\",
    "+------+<br>|      |<br>|      O<br>|    --+--<br>|      |<br>|     / \\<br>|    /   \\",
    "+------+<br>|      |<br>|      O<br>|    --+--<br>|      |<br>|     / \\<br>|    /   \\<br>|",
    "+------+<br>|      |<br>|      O<br>|    --+--<br>|      |<br>|     / \\<br>|    /   \\<br>|<br>+----------------"
];

async function startGame() {
    const words = await loadWords();
    const secretWord = words[Math.floor(Math.random() * words.length)];
    let dashes = "-".repeat(secretWord.length);
    let guessesLeft = hangmanStages.length - 1;
    let hangmanIndex = 0;

    const hangmanDisplay = document.getElementById("hangman");
    const wordDisplay = document.getElementById("word");
    const messageDisplay = document.getElementById("message");
    const guessInput = document.getElementById("guess");
    const submitButton = document.getElementById("submit-guess");

    hangmanDisplay.innerHTML = hangmanStages[0];
    wordDisplay.textContent = dashes;
    messageDisplay.textContent = "Start guessing!";

    function handleGuess() {
        const guess = getGuess();
        if (!guess) return;

        if (secretWord.includes(guess)) {
            dashes = updateDashes(secretWord, dashes, guess);
            wordDisplay.textContent = dashes;
            messageDisplay.textContent = "Correct guess!";
        } else {
            hangmanDisplay.innerHTML = hangmanStages[++hangmanIndex];
            guessesLeft--;
            messageDisplay.textContent = "Incorrect guess!";
        }

        if (dashes === secretWord) {
            messageDisplay.textContent = `You win! The word was "${secretWord}".`;
            cleanup();
        } else if (guessesLeft === 0) {
            messageDisplay.textContent = `Game Over! The word was "${secretWord}".`;
            cleanup();
        }
    }

    function cleanup() {
        submitButton.removeEventListener("click", handleGuess);
        document.removeEventListener("keydown", handleEnter);
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            handleGuess();
        }
    }

    submitButton.addEventListener("click", handleGuess);
    document.addEventListener("keydown", handleEnter);
}

startGame();
