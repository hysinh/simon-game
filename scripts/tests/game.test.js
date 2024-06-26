/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

beforeAll(() => {   // loads the index file into the Jest mock DOM
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("curretGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain the correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => { // we want to set up the game state with some fake values to see if the new game function resets them
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42"; // needs to be a string
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0); // could use .toEqual([])
    });
    // test("should clear the computer sequence array", () => {
    //     expect(game.currentGame.length).toBe(0); // could use .toEqual([
    // });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {  // beforeEach is similar to beforeAll - but beforeAll runs before all the tests, beforeEach runs before EACH test - so resetting the state each time
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttoms", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        // in the beforeEach functio of our gamePlay, we're adding one 
        // turn. So we take that turn and push it into the playerMoves 
        // array bg calling playerTurn - that way we know that we have a 
        // correct answer bc playerTurn and computersTurn match each 
        // other
        game.playerMoves.push(game.currentGame[0]); 
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = ""; // reset tp be empty
        // call click function - it should not set a value of 
        // game.lastButton - there should be no ID on there if clicks 
        // have been disabled = contents of lastButton shouldn't change
        // after we clear it if clicks are disabled
        document.getElementById("button2").click(); 
        expect(game.lastButton).toEqual("");

    });
});
