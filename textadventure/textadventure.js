document.getElementById("start-button").addEventListener("click", startGame);

let gameState = {
    currentText: "",
    inputEnabled: false,
};

function updateGameOutput(text) {
    const gameOutput = document.getElementById("game-output");
    gameOutput.innerHTML = text;
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

function disableInputBox() {
    const inputBox = document.getElementById("user-input");
    inputBox.disabled = true;
    inputBox.value = "";
    gameState.inputEnabled = false;
}

function enableInputBox() {
    const inputBox = document.getElementById("user-input");
    inputBox.disabled = false;
    gameState.inputEnabled = true;
    inputBox.focus();
}

function slowPrint(text, delay = 25, callback = null, waitTime = 2500) {
    disableInputBox();
    let index = 0;
    let output = "";

    function printChar() {
        if (index < text.length) {
            output += text[index];
            updateGameOutput(output);
            index++;
            setTimeout(printChar, delay);
        } else if (callback) {
            setTimeout(callback, waitTime);
        } else {
            enableInputBox();
        }
    }

    printChar();
}

function startGame() {
    disableInputBox();
    document.getElementById("start-button").style.display = "none";
    slowPrint("You awaken in a dimly lit room. The walls pulse faintly, as if alive.", 25, askUserChoice);
}

function askUserChoice() {
    slowPrint("Do you:\n1. Inspect the room\n2. Open the door\n3. Wait and listen", 25, function () {
        setInputHandler(handleMainChoice);
    });
}

function setInputHandler(handler) {
    const inputBox = document.getElementById("user-input");
    inputBox.value = "";
    enableInputBox();
    const handleChoice = function (e) {
        if (e.key === "Enter" && gameState.inputEnabled) {
            const userInput = inputBox.value.trim().toLowerCase();
            inputBox.value = "";
            disableInputBox();
            inputBox.removeEventListener("keypress", handleChoice);
            handler(userInput);
        }
    };
    inputBox.addEventListener("keypress", handleChoice);
}

function handleMainChoice(userInput) {
    if (userInput === "1") {
        inspectRoom();
    } else if (userInput === "2") {
        openDoor();
    } else if (userInput === "3") {
        waitAndListen();
    } else {
        slowPrint("Invalid choice. Please choose 1, 2, or 3.", 25, askUserChoice);
    }
}

function inspectRoom() {
    slowPrint("You examine the room closely. The walls are warm to the touch, and they shudder under your hand.", 25, function () {
        slowPrint("You notice faint carvings on the floor - a warning you cannot read.", 25, openDoor);
    });
}

function openDoor() {
    slowPrint("You open the door and step into a dark corridor. Whispers echo faintly in the distance.", 25, corridorOfWhispers);
}

function waitAndListen() {
    slowPrint("You sit still, listening to the sobbing beyond the door. It grows louder, then stops abruptly.", 25, function () {
        slowPrint("The room grows colder, and the walls seem to inch closer. You decide to move.", 25, openDoor);
    });
}

function corridorOfWhispers() {
    slowPrint("The whispers grow louder as you move forward, though you cannot see their source.", 25, function () {
        slowPrint("Do you:\n1. Follow the whispers\n2. Turn back\n3. Touch the walls", 25, function () {
            setInputHandler(handleCorridorChoice);
        });
    });
}

function handleCorridorChoice(userInput) {
    if (userInput === "1") {
        followWhispers();
    } else if (userInput === "2") {
        slowPrint("You decide to turn back, but the whispers seem to follow you.", 25, openDoor);
    } else if (userInput === "3") {
        slowPrint("Touching the walls sends shivers through your body. They feel alive.", 25, roomOfEyes);
    } else {
        slowPrint("Invalid choice. Please choose 1, 2, or 3.", 25, corridorOfWhispers);
    }
}

function followWhispers() {
    const chance = Math.random();
    if (chance < 0.4) {
        slowPrint("The whispers grow louder until they consume you. Your vision fades, and everything goes dark.", 25, gameOver);
    } else {
        slowPrint("The whispers lead you to a circular room filled with eyes.", 25, roomOfEyes);
    }
}

function roomOfEyes() {
    slowPrint("The walls are covered with blinking eyes. A central eye glows brightly, tracking your every move.", 25, endGame);
}

function gameOver() {
    slowPrint("\nYour journey ends here. The Labyrinth consumes you.");
    disableInputBox();
}

function endGame() {
    slowPrint("\nYou survived... for now. The Labyrinth shifts around you, preparing its next trap.");
    disableInputBox();
}