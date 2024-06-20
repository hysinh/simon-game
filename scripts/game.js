let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: [
        "button1",
        "button2",
        "button3",
        "button4",
    ],
}


// game functions
function newGame() {
    game.score = 0;
    game.playerMoves.length = 0;
    game.currentGame.length = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) { // > 0 so we know that a game is in progress
                    let move = e.target.getAttribute("id"); // checks to see if a circle is clicked and then is stored as the game.lastButoon
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    // 3 tasks
    // clear playermoves array, 
    // randomly add a button ID to the currentGame array fomr game.choices, 
    // push that button ID into the computer sequence array\
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) { // circ = ID of one of our cicles
    document.getElementById(circ).classList.add("light"); // adds light class
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnInProgress = true; // true bc player turns have started
    game.turnNumber = 0; // we're going to use that as the array index number for our game's currentGame array
    // why are we setting this on the state? why don't we just use a simple local variable
    let turns = setInterval(() => {  // helpful to set this as state so that we can test it
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function playerTurn() {
    //get the index of the last element from our playerMoves array
    // then compare that with the same index in the current game array
    // if the player's answer is correct, then these two should match
    // we should be able to compare elements at the same index number
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
};


module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };