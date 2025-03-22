const words = [
    { word: "algorithm", hint: "A set of instructions for solving a problem" },
    { word: "compiler", hint: "A tool that converts source code into machine code" },
    { word: "debugging", hint: "The process of finding and fixing errors in code" },
    { word: "framework", hint: "A structured foundation for building software applications" },
    { word: "iteration", hint: "A repeated execution of a block of code" }
];

let selectedWord = "";
let hint = "";
let guessedWord = [];
let wrongAttempts = 0;
const maxAttempts = 6;
let selectedMode = "default";

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 250;

function toggleCustomInput() {
    selectedMode = document.querySelector('input[name="mode"]:checked').value;
    document.getElementById("custom-input").classList.toggle("hidden", selectedMode !== "custom");
    document.getElementById("start-btn").disabled = false;
}

function startGame() {
    document.getElementById("game-area").classList.remove("hidden");

    if (selectedMode === "custom") {
        const customWord = document.getElementById("custom-word").value.trim().toUpperCase();
        const customHint = document.getElementById("custom-hint").value.trim();

        if (!customWord || !customHint) {
            alert("Please enter both a word and a hint.");
            return;
        }

        selectedWord = customWord;
        hint = customHint;
    } else {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex].word.toUpperCase();
        hint = words[randomIndex].hint;
    }

    guessedWord = Array(selectedWord.length).fill("_");
    wrongAttempts = 0;

    document.getElementById("word-container").innerText = guessedWord.join(" ");
    document.getElementById("hint").innerText = `Hint: ${hint}`;
    document.getElementById("wrong-attempts").innerText = wrongAttempts;
    document.getElementById("message").innerText = "";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guessLetter() {
    let input = document.getElementById("guess").value.toUpperCase();
    document.getElementById("guess").value = "";

    if (!input || input.length !== 1 || !input.match(/[A-Z]/)) {
        document.getElementById("message").innerText = "Please enter a valid letter.";
        return;
    }

    if (selectedWord.includes(input)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === input) {
                guessedWord[i] = input;
            }
        }
    } else {
        if (wrongAttempts < maxAttempts) {
            drawHangman(wrongAttempts);
        }
        wrongAttempts++;
    }

    document.getElementById("word-container").innerText = guessedWord.join(" ");
    document.getElementById("wrong-attempts").innerText = wrongAttempts;

    if (!guessedWord.includes("_")) {
        document.getElementById("message").innerText = "Congratulations! You guessed the word.";
    } else if (wrongAttempts >= maxAttempts) {
        document.getElementById("message").innerText = `Game Over! The word was ${selectedWord}.`;
    }
}

function drawHangman(stage) {
    const parts = [
        () => ctx.strokeRect(10, 230, 90, 5), // Base
        () => ctx.strokeRect(55, 30, 5, 200), // Pole
        () => ctx.strokeRect(55, 30, 90, 5), // Top bar
        () => ctx.strokeRect(140, 30, 5, 40), // Rope
        () => { ctx.beginPath(); ctx.arc(140, 80, 20, 0, Math.PI * 2); ctx.stroke(); }, // Head
        () => ctx.strokeRect(140, 100, 5, 60), // Body
        () => ctx.beginPath(), ctx.moveTo(140, 120), ctx.lineTo(110, 150), ctx.stroke(), // Left Arm
        () => ctx.beginPath(), ctx.moveTo(140, 120), ctx.lineTo(170, 150), ctx.stroke(), // Right Arm
        () => ctx.beginPath(), ctx.moveTo(140, 160), ctx.lineTo(110, 200), ctx.stroke(), // Left Leg
        () => ctx.beginPath(), ctx.moveTo(140, 160), ctx.lineTo(170, 200), ctx.stroke() // Right Leg
    ];
    if (stage < parts.length) parts[stage](); // Ensure only valid parts are drawn
}

function resetGame() {
    startGame();
}
