import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import displayGrid from "./dom";

// ---------- Player One
const pOneBoard = new Gameboard("dan")
const pOne = new Player("dan", pOneBoard);

pOneBoard.createGameboard();
pOneBoard.placeShip(2, 2, pOneBoard.grid, 5, "carrier", "CAR1")
pOneBoard.placeShip(4, 1, pOneBoard.grid, 4, "battleship", "BAT1")
pOneBoard.placeShip(6, 5, pOneBoard.grid, 3, "cruiser", "CRU1")
pOneBoard.placeShip(7, 7, pOneBoard.grid, 3, "submarine", "SUB1")
pOneBoard.placeShip(1, 8, pOneBoard.grid, 2, "destroyer", "DES1")

pOneBoard.receiveAttack(2, 2, pOneBoard.grid) //testing
pOneBoard.receiveAttack(1, 1, pOneBoard.grid) //testing

//displays the game board
displayGrid(pOneBoard, "pOneGameboard");

console.log(pOneBoard)

// ---------- Player Two
const pTwoBoard = new Gameboard("nad");
const pTwo = new Player("nad", pTwoBoard);

pTwoBoard.createGameboard();
pTwoBoard.placeShip(1, 5, pTwoBoard.grid, 5, "carrier", "CAR1")
pTwoBoard.placeShip(6, 5, pTwoBoard.grid, 4, "battleship", "BAT1")
pTwoBoard.placeShip(3, 4, pTwoBoard.grid, 3, "cruiser", "CRU1")
pTwoBoard.placeShip(2, 4, pTwoBoard.grid, 3, "submarine", "SUB1")
pTwoBoard.placeShip(5, 4, pTwoBoard.grid, 2, "destroyer", "DES1")

pTwoBoard.receiveAttack(1, 0, pTwoBoard.grid) //testing

//displays the game board
displayGrid(pTwoBoard, "pTwoGameboard");

console.log(pTwoBoard)

