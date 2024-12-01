let n = 0;

let gameState = {
    inputEnabled: false,
};

document.getElementById("start-button").addEventListener("click", startGame);

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

function slowPrint(text, delay = 25, waitTime = 2500) {
    return new Promise((resolve) => {
        disableInputBox();
        let index = 0;
        let output = "";

        function printChar() {
            if (index < text.length) {
                output += text[index];
                updateGameOutput(output);
                index++;
                setTimeout(printChar, delay);
            } else {
                setTimeout(() => {
                    resolve();
                }, waitTime);
            }
        }

        printChar();
    });
}

function getUserInput() {
    enableInputBox();
    const inputBox = document.getElementById("user-input");
    
    return new Promise((resolve) => {
        const handleInput = (e) => {
            if (e.key === "Enter") {
                const userInput = inputBox.value.trim().toLowerCase();
                inputBox.value = "";
                inputBox.removeEventListener("keypress", handleInput);
                disableInputBox();
                resolve(userInput);
            }
        };
        inputBox.addEventListener("keypress", handleInput);
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGame() {
    disableInputBox();
    document.getElementById("start-button").style.display = "none";
    await slowPrint("You awaken in a dimly lit room. The walls pulse faintly, as if alive.");
    await askUserChoice();
}

async function askUserChoice() {
    await slowPrint("Do you:\n1. Inspect the room\n2. Open the door\n3. Wait and listen");
    const userInput = await getUserInput();

    if (userInput === "1") {
        await inspectRoom();
    } else if (userInput === "2") {
        await openDoor();
    } else if (userInput === "3") {
        await waitAndListen();
    } else if (userInput === "god" &&  n === 1) {
        await slowPrint("...")
        await slowPrint("But you can't go back there.")
        await askUserChoice();
    } else if (userInput === "god") {
        await godMode();
    } else {
        await slowPrint("Invalid choice. Please choose 1, 2, or 3.");
        await askUserChoice();
    }
}

async function godMode() {
    await slowPrint("G O D M O D E")

    await slowPrint("You awaken in a space with no dimensions. There is no up, no down, only endless darkness.");

    await slowPrint("Your thoughts echo loudly, but not in your voice. Something is listening.");

    await slowPrint(`A voice invades your mind, sharp and cold: "So fragile. So lost. Do you think you matter here?"`);

    let input = "";
    while (input.toLowerCase() !== "leave") {
        await slowPrint("What will you do? (Type 'continue')");

        input = (await getUserInput()).trim();

        if (input.toLowerCase() === "continue") {
            await slowPrint("You step forward - or perhaps backward. You cannot tell.");

            await slowPrint("Each step feels heavier than the last, as though something unseen wraps around your ankles, dragging you closer to an unknown fate.");

            await slowPrint(`The voice grows louder: "Do you understand? Every step binds you. Every breath feeds me."`);

            await slowPrint("The air around you grows thick, cloying. You can no longer see, but you can feel a presence looming.");
        } else {
            await slowPrint(`"Ah... resistance," the voice sneers. "Do you think there is another way? There is only 'continue.' There is only ME."`);
        }
    }

    await slowPrint("You finally whisper, 'leave,' your voice trembling.");

    await slowPrint(`The voice laughs, deep and guttural, shaking the very core of your existence. "Leave? Oh, mortal. There is no escape."`);

    await slowPrint("The ground beneath you crumbles, revealing an abyss filled with writhing shadows. They call your name, over and over, in mockery.");

    await slowPrint("You fall, endlessly. The shadows rise around you, clawing at your form, tearing away memories, dreams, and hope itself.");

    await slowPrint(`"This is your eternity now," the voice bellows. "You are mine - forever."`);

    await slowPrint("You try to scream, but the void swallows your voice. The last of your thoughts dissolve, leaving nothing but silence.");

    await slowPrint("...You are no more.");

    await slowPrint("GAME OVER");

    await wait(20000);

    await slowPrint(`The voice chuckles. "I will give you another chance."`)

    n = 1;
    await startGame();
}

async function inspectRoom() {
    await slowPrint("You examine the room closely. The walls are warm to the touch and shudder under your hand.");
    await rngDeath(openDoor, "You notice faint carvings on the floor - a warning you cannot read.");
}

async function openDoor() {
    await slowPrint("You open the door and step into a dark corridor. Whispers echo faintly in the distance.");
    await corridorOfWhispers();
}

async function waitAndListen() {
    await slowPrint("You sit still, listening to the sobbing beyond the door. It grows louder, then stops abruptly.");
    await rngDeath(openDoor, "The room grows colder, and the walls seem to inch closer. You decide to move.");
}

async function corridorOfWhispers() {
    await slowPrint("The whispers grow louder as you move forward, though you cannot see their source.");
    await slowPrint("Do you:\n1. Follow the whispers\n2. Turn back\n3. Touch the walls");
    const userInput = await getUserInput();

    if (userInput === "1") {
        await followWhispers();
    } else if (userInput === "2") {
        await turnBack();
    } else if (userInput === "3") {
        await touchWalls();
    } else {
        await slowPrint("Invalid choice. Please choose 1, 2, or 3.");
        await corridorOfWhispers();
    }
}

async function followWhispers() {
    await rngDeath(roomOfEyes, "The whispers lead you to a circular room filled with eyes.");
}

async function turnBack() {
    await slowPrint("You decide to turn back, but the whispers seem to follow you.");
    await openDoor();
}

async function touchWalls() {
    await slowPrint("Touching the walls sends shivers through your body. They feel alive.");
    await rngDeath(roomOfEyes, "The walls seem to pulsate, almost as if they are watching you.");
}

async function roomOfEyes() {
    await slowPrint("The walls are covered with blinking eyes. A central eye glows brightly, tracking your every move.");
    await slowPrint("The glowing eye whispers: Solve this riddle to survive:\n'I have keys but no locks, space but no room. What am I?'");
    const userInput = await getUserInput();

    if (userInput === "keyboard") {
        await slowPrint("The eye closes. A hidden door opens, revealing a new path.");
        await tickingClockRoom();
    } else {
        await rngDeath(tickingClockRoom, "The eye blinks sadly, and you are teleported to another room.");
    }
}

async function tickingClockRoom() {
    await slowPrint("You enter a room with a ticking clock. A pedestal stands in the center with a puzzle:");
    await slowPrint("'Enter the numbers to form the first 10 digits of pi. (No decimal and DO NOT round)'");
    const userInput = await getUserInput();

    if (userInput === "3141592653") {
        await slowPrint("The clock stops. A passage opens ahead.");
        await endGame();
    } else {
        await rngDeath(endGame, "The clock explodes, and the Labyrinth shifts around you.");
    }
}

async function rngDeath(callback, successMessage = null) {
    const chance = Math.random();
    if (chance < 0.25) {
        await slowPrint("The Labyrinth claims you. Your vision fades as darkness consumes you.");
        await gameOver();
    } else {
        if (successMessage) await slowPrint(successMessage);
        await callback();
    }
}

async function gameOver() {
    const chance = Math.random();
    if (chance < 0.01) {
        await slowPrint("\nHehe.\nThe Labyrinth doesn't just claim you - it breaks you. Time fractures as your screams echo endlessly. You become a part of its malevolent essence, trapped in eternal torment, your very existence twisted into a haunting reminder for the next lost soul. Your very essence is torn apart, fiber by fiber, as the Labyrinth consumes not just your body but your memories and will. Screams that sound like your own echo in the distance, but you can't remember why. You exist everywhere and nowhere, a shattered soul drifting through infinite torment. The walls around you pulsate with your pain, feeding off your suffering as you fade into an eternal nightmare - a twisted echo of the person you once were.");
    } else {
        await slowPrint("\nThe air turns frigid, and your breath fails as unseen hands drag you into the abyss. A cacophony of whispers erupts around you, mocking your feeble struggle. The darkness devours your body, mind, and soul. You are lost - forever.");
    }
    await slowPrint("Would you like to replay? (yes/no)")
    const userInput = getUserInput();
    await slowPrint("You don't have a choice. The Labyrinth revives you.")
    startGame();
}

async function endGame() {
    await slowPrint("\nYou survived... for now. The Labyrinth shifts around you, preparing its next trap.");
    await slowPrint("Would you like to replay? (yes/no)");
    const userInput = (await getUserInput()).toLowerCase();
    if (userInput === "yes") {
        await slowPrint("Good luck.");
        await startGame();
    } else if (userInput === "no") {
        await slowPrint("Goodbye.");
    } else {
        await slowPrint(`Please pick "yes" or "no".`);
        await endGame();
    }
}