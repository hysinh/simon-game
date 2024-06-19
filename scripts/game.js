let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
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
    //call showTurns();
};

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) { // circ = ID of one of our cicles
    document.getElementById(circ).classList.add("light"); // adds light class
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

function showTurns() {};

function playerTurn() {};


module.exports = {game, newGame, showScore, addTurn, lightsOn };