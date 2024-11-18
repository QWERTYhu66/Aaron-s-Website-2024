function slowPrint(text, delay = 100) {
    let index = 0;
    function printChar() {
        if (index < text.length) {
            process.stdout.write(text[index]);
            index++;
            setTimeout(printChar, delay);
        } else {
            process.stdout.write("\n");
        }
    }
    printChar();
}

function startGame() {
    slowPrint("You awaken in a dimly lit room. The walls pulse faintly, as if alive.");
    slowPrint("A single door stands before you, marked with a strange symbol.");
    let choice = prompt("\nDo you:\n1. Inspect the room\n2. Open the door\n3. Wait and listen\n> ");
    if (choice === "1") {
        inspectRoom();
    } else if (choice === "2") {
        openDoor();
    } else if (choice === "3") {
        waitAndListen();
    } else {
        slowPrint("Invalid choice. The room seems to grow smaller as you hesitate...");
        startGame();
    }
}

function inspectRoom() {
    slowPrint("You examine the room closely. The walls are warm to the touch, and they shudder under your hand.");
    slowPrint("You notice faint carvings on the floor—a warning you cannot read.");
    openDoor();
}

function openDoor() {
    slowPrint("You open the door and step into a dark corridor. Whispers echo faintly in the distance.");
    corridorOfWhispers();
}

function waitAndListen() {
    slowPrint("You sit still, listening to the sobbing beyond the door. It grows louder, then stops abruptly.");
    slowPrint("The room grows colder, and the walls seem to inch closer. You decide to move.");
    openDoor();
}

function corridorOfWhispers() {
    slowPrint("The whispers grow louder as you move forward, though you cannot see their source.");
    let choice = prompt("\nDo you:\n1. Follow the whispers\n2. Turn back\n3. Touch the walls\n> ");
    if (choice === "1") {
        followWhispers();
    } else if (choice === "2") {
        slowPrint("Turning back, you find the door is gone. The whispers grow mocking. You must move forward.");
        corridorOfWhispers();
    } else if (choice === "3") {
        slowPrint("The walls are alive. Shadowy hands grip your arm, pulling you in.");
        slowPrint("You struggle free, but the whispers laugh. Move quickly.");
        followWhispers();
    } else {
        slowPrint("Invalid choice. The corridor seems to stretch endlessly...");
        corridorOfWhispers();
    }
}

function followWhispers() {
    slowPrint("The whispers lead you to a circular room filled with eyes.");
    roomOfEyes();
}

function roomOfEyes() {
    slowPrint("The walls are covered with blinking eyes. A central eye glows brightly, tracking your every move.");
    let choice = prompt("\nDo you:\n1. Avoid the central eye\n2. Look directly at it\n3. Close your eyes and walk\n> ");
    if (choice === "1") {
        slowPrint("You navigate carefully, avoiding the gaze of the central eye. You reach another door.");
        slowPrint("The door creaks open, leading to another horrifying chamber...");
        endGame();
    } else if (choice === "2") {
        slowPrint("The central eye pierces your soul. You are frozen in terror, unable to move.");
        slowPrint("Your consciousness fades into oblivion.");
        gameOver();
    } else if (choice === "3") {
        slowPrint("You close your eyes and move blindly. The whispers and eyes grow louder, mocking your every step.");
        slowPrint("Somehow, you reach the other side. Another door awaits.");
        endGame();
    } else {
        slowPrint("Invalid choice. The eyes grow impatient...");
        roomOfEyes();
    }
}

function gameOver() {
    slowPrint("\nYour journey ends here. The Labyrinth consumes you.");
    playAgain();
}

function endGame() {
    slowPrint("\nYou survived... for now. The Labyrinth shifts around you, preparing its next trap.");
    playAgain();
}

function playAgain() {
    let choice = prompt("\nWould you like to play again? (yes/no)\n> ");
    if (choice.toLowerCase() === "yes") {
        startGame();
    } else if (choice.toLowerCase() === "no") {
        slowPrint("Thank you for playing. The Labyrinth awaits your return...");
    } else {
        slowPrint("Invalid choice. The Labyrinth does not forgive...");
        playAgain();
    }
}

startGame();
