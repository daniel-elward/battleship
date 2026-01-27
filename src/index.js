import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import {displayGrid, updateText, markCells} from "./dom";

// ---------- Player One
const pOneBoard = new Gameboard("dan", "pOneGameboard")
const pOne = new Player("dan", pOneBoard, "pOneGameboard");

pOneBoard.createGameboard();
pOneBoard.placeShip(2, 2, pOneBoard.grid, 5, "carrier", "CAR1");
pOneBoard.placeShip(4, 1, pOneBoard.grid, 4, "battleship", "BAT1");
pOneBoard.placeShip(6, 5, pOneBoard.grid, 3, "cruiser", "CRU1");
pOneBoard.placeShip(7, 7, pOneBoard.grid, 3, "submarine", "SUB1");
pOneBoard.placeShip(0, 0, pOneBoard.grid, 2, "destroyer", "DES1");

// ---------- Player Two
const pTwoBoard = new Gameboard("nad", "pTwoGameboard");
const pTwo = new Player("nad", pTwoBoard, "pTwoGameboard");

pTwoBoard.createGameboard();
pTwoBoard.placeShip(1, 5, pTwoBoard.grid, 5, "carrier", "CAR1");
pTwoBoard.placeShip(6, 5, pTwoBoard.grid, 4, "battleship", "BAT1");
pTwoBoard.placeShip(3, 4, pTwoBoard.grid, 3, "cruiser", "CRU1");
pTwoBoard.placeShip(2, 4, pTwoBoard.grid, 3, "submarine", "SUB1");
pTwoBoard.placeShip(1, 0, pTwoBoard.grid, 2, "destroyer", "DES1");

pTwoBoard.receiveAttack(4, 2, pTwoBoard.grid);
pTwoBoard.receiveAttack(1, 5, pTwoBoard.grid);
pTwoBoard.receiveAttack(5, 5, pTwoBoard.grid);
pTwoBoard.receiveAttack(1, 0, pTwoBoard.grid);
pTwoBoard.receiveAttack(1, 1, pTwoBoard.grid);
pTwoBoard.receiveAttack(0, 1, pTwoBoard.grid);

/*
WORKING ON PLAYER SWITCHING AND RE-RENDERING THE CURRENT GAMEBOARD
*/

//switch active player and active board
function switchPlayer(player, p1, p2){
    player === p1 ? player = p2 : player = p1;
    activeBoard === pTwoBoard ? activeBoard = pOneBoard : activeBoard = pTwoBoard;

    updateText(`the current player is ${activePlayer.name}`, "activePlayer")
    updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")
    
    return [activePlayer, activeBoard];
};

function completeTurn(player, xCoord, yCoord, board){
    board.receiveAttack(xCoord, yCoord, board.grid);
    markCells(board);
    switchPlayer(player, pOne, pTwo);
};


function gameController(){
    let activePlayer = pOne;
    let activeBoard = pTwoBoard;


    updateText(`the current player is ${activePlayer.name}`, "activePlayer")
    updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")

    displayGrid(activeBoard);
};

gameController();

/*
TEMP STORAGE

function completeTurn(xCoord, yCoord, board){
    board.receiveAttack(xCoord, yCoord, board.grid);
    markCell(board);
    switchPlayer(p1, p2);
};




*/