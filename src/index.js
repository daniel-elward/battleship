import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import {displayGrid, displayActivePlayer, displayMessage, refreshBoard, markCell} from "./dom";

// ---------- Player One
const pOneBoard = new Gameboard("dan")
const pOne = new Player("dan", pOneBoard);

pOneBoard.createGameboard();
pOneBoard.placeShip(2, 2, pOneBoard.grid, 5, "carrier", "CAR1");
pOneBoard.placeShip(4, 1, pOneBoard.grid, 4, "battleship", "BAT1");
pOneBoard.placeShip(6, 5, pOneBoard.grid, 3, "cruiser", "CRU1");
pOneBoard.placeShip(7, 7, pOneBoard.grid, 3, "submarine", "SUB1");
pOneBoard.placeShip(0, 0, pOneBoard.grid, 2, "destroyer", "DES1");

//displays the game board
// displayGrid(pOneBoard, "pOneGameboard");

console.log(pOneBoard);

// ---------- Player Two
const pTwoBoard = new Gameboard("nad");
const pTwo = new Player("nad", pTwoBoard);

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

//displays the game board
// displayGrid(pTwoBoard, "pTwoGameboard");

console.log(pTwoBoard);

// ------------ 

function gameController(){
    let activePlayer = pOne;
    let activeBoard = pTwoBoard;

    function SwitchPlayer(p1, p2){
        return activePlayer === p1 ? activePlayer = p2 : activePlayer = p1;
    };


    displayActivePlayer(`current player is ${activePlayer.name}`);

    displayGrid(pTwoBoard, "pTwoGameboard");

    function clickListener(){
        let x = null;
        let y = null;
    
        const cell = document.getElementsByClassName("gridCell");
    
        for(let i = 0; i < cell.length; i++){
            cell[i].addEventListener("click", (element) => {
                x = element.target.dataset.x;
                y = element.target.dataset.y;
                pTwoBoard.receiveAttack(x, y, pTwoBoard.grid);

                // console.log(element)
                
                // refreshBoard(pTwoBoard, "pTwoGameboard");
                markCell(pTwoBoard);

                // document.querySelector(".pTwoGameboard").remove();
                // displayGrid(pTwoBoard, "pTwoGameboard");
                
                /*
                i need something here that will act as a trigger to start the game flow
                i.e a function acts on the first click, then sets all the relevent 
                hits/misses etc 

                checks for a win/all sunk

                switches play 

                etc etc
                */
            });
        };
    };
    clickListener();
};

gameController();