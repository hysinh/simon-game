let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
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
                let move = e.target.getAttribute("id");
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
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
    game.turnNumber = 0; // we're going to use that as the array index number for our game's currentGame array
    // why are we setting this on the state? why don't we just use a simple local variable
    let turns = setInterval(() => {  // helpful to set this as state so that we can test it
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

function playerTurn() {};


module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns };