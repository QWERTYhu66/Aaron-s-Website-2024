document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const consoleContainer = document.getElementById("console-container");
    const outputBox = document.getElementById("output");
    const commandInput = document.getElementById("command-input");

    let gameActive = false;

    function slowPrint(text, delay = 100) {
        let index = 0;
        function printChar() {
            if (index < text.length) {
                outputBox.innerHTML += text[index];
                outputBox.scrollTop = outputBox.scrollHeight;
                index++;
                setTimeout(printChar, delay);
            } else {
                outputBox.innerHTML += "<br>";
            }
        }
        printChar();
    }

    function processCommand() {
        const command = commandInput.value.trim();
        commandInput.value = "";
        if (gameActive && command) {
            handleGameCommand(command);
        }
    }

    function startGame() {
        slowPrint("You awaken in a dimly lit room. The walls pulse faintly, as if alive.");
        slowPrint("A single door stands before you, marked with a strange symbol.");
        slowPrint("\nDo you:\n1. Inspect the room\n2. Open the door\n3. Wait and listen\n> ");
    }

    function handleGameCommand(command) {
        if (command === "1") {
            slowPrint("You examine the room closely. The walls are warm to the touch, and they shudder under your hand.");
            slowPrint("You notice faint carvings on the floor—a warning you cannot read.");
            slowPrint("You decide to open the door.");
        } else if (command === "2") {
            slowPrint("You open the door and step into a dark corridor. Whispers echo faintly in the distance.");
        } else if (command === "3") {
            slowPrint("You sit still, listening to the sobbing beyond the door. It grows louder, then stops abruptly.");
            slowPrint("The room grows colder, and the walls seem to inch closer. You decide to move.");
        } else {
            slowPrint("Invalid choice. The room seems to grow smaller as you hesitate...");
        }
    }

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        consoleContainer.style.display = "flex";
        gameActive = true;
        startGame();
    });

    commandInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            processCommand();
        }
    });
});
