$("#restartGame").hide();
var gameWord, hiddenWord, remainingHearts = 6, validLetters = 0;

// Creates the UI of the game for the word to be guessed.
function createGame() {
    $("#alphabet").empty();
    gameWord = document.getElementById("wordInput").value.toUpperCase(), hiddenWord = "";
    $("#wordInput").val("");
    if (gameWord.length == 0) {
        return "Please enter at least one letter!";
    } else {
        for (let i = 0; i < gameWord.length; ++i) {
            hiddenWord += "_";
        }
        displayHearts(remainingHearts);
        displayMatchingLetters(hiddenWord);
        displayAlphabet();
        return "You can pick letters from the alphabet bellow to win the game!";
    }
}

//Displays a number of six solid hearts suggesting the number of lives (tries) the player has in order to win the game.
function displayHearts(remainingHearts) {
    $("#hearts").empty();
    for (let i = 0; i < 6; ++i) {
        if (i < remainingHearts) {
            $('#hearts').append('<img height="32" width="32" style="margin-right: 10px" src="icons/suit-heart-fill.svg "/>')
        } else {
            $('#hearts').append('<img height="32" width="32" style="margin-right: 10px" src="icons/suit-heart.svg "/>')
        }
    }
    if (remainingHearts == 0) {
        $("#restartGame").show();
        $("#alphabet").hide();
        $("#inputForm").hide();
        $("#matchingLetters").hide();

        return "You lost all of your lives! Want to try again?";
    } else {
        return "You have " + remainingHearts + " lives left!";
    }
}

//Displays the updated matching letters.
function displayMatchingLetters(result) {
    return document.getElementById("matchingLetters").innerHTML = result;
}

//Displays the Alphabet in order to select the matching letters for the word that has to be guessed.
function displayAlphabet() {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 26; ++i) {
        let letter = alphabet.charAt(i);
        $('#alphabet').append('<button class="btn btn-dark" id=' + letter + ' style="margin-right: 5px; margin-bottom: 5px;" onclick="(displayMatchingLetters(searchWordLetters(id)));">' + letter + '</button>');
    }
}

//Defined a function that when triggered, replaces characters in the hiddenword at a certain index.
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//Compares if the selected letter is found in the hiddenword.
function searchWordLetters(id) {
    let validateLetter = false;
    for (let i = 0; i < gameWord.length; ++i) {
        if ((id.localeCompare(gameWord.charAt(i)) == 0) && (id.localeCompare(hiddenWord.charAt(i)) != 0)) {
            hiddenWord = hiddenWord.replaceAt(i, id);
            validateLetter = true;
            ++validLetters;
        }
    }
    if (!validateLetter) {
        printMessage(displayHearts(--remainingHearts));
        document.getElementById(id).disabled = true;
    }
    if (validLetters == gameWord.length) {
        confetti({
            particleCount: 500,
            spread: 120,
            origin: {
                y: 0.6
            }
        });
        printMessage("Congratulations, you guessed it");
        $("#restartGame").show();
    }
    return hiddenWord;
}

//Restarts the game with all the necessary elements to their default values;
function restartGame() {
    remainingHearts = 6;
    validLetters = 0;
    printMessage("");
    $("#hearts").empty();
    $("#matchingLetters").empty();
    $("#matchingLetters").show();
    $("#alphabet").empty();
    $("#alphabet").show();
    $("#inputForm").show();
    $("#restartGame").hide();
}

//Prints all messages according to parameters it receives from the other functions.
function printMessage(message) {
    return document.getElementById("message").innerHTML = message;
}
