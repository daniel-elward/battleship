import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import {displayGrid, updateText, markCells, setEventListeners, clickData} from "./dom";

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

// pTwoBoard.receiveAttack(4, 2, pTwoBoard.grid);
// pTwoBoard.receiveAttack(1, 5, pTwoBoard.grid);
// pTwoBoard.receiveAttack(5, 5, pTwoBoard.grid);
// pTwoBoard.receiveAttack(1, 0, pTwoBoard.grid);
// pTwoBoard.receiveAttack(1, 1, pTwoBoard.grid);
// pTwoBoard.receiveAttack(0, 1, pTwoBoard.grid);

function gameController(){
    let activePlayer = pOne;
    let activeBoard = pTwoBoard;

    console.log(activePlayer.name)
    
    //switch active player and active board
    function switchPlayer(player, p1, p2){
        activePlayer === p1 ? activePlayer = p2 : activePlayer = p1;
        activeBoard === pTwoBoard ? activeBoard = pOneBoard : activeBoard = pTwoBoard;
    
        updateText(`the current player is ${activePlayer.name}`, "activePlayer")
        updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")
        
        return [activePlayer, activeBoard];
    };

    //check and process the users click. hit, miss, invalid, etc
    function eventHandler(data){
        const x = data.x;
        const y = data.y;

        //invalid: not populated, already hit.
        if(activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated === false){
            alert("invalid! already hit!");
        };
        
        //invalid: populated, already hit.
        if(activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated != false){
            alert("invalid! already hit!");
        };

        //valid: not populated, not yet hit.
        if(!activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated === false){
            console.log("not populated and not yet hit!");
            console.log("Here we need to add to the missed shots array");

            activeBoard.receiveAttack(x, y, activeBoard.grid)
            // markCells(activeBoard)
            switchPlayer(activePlayer, pOne, pTwo);
            displayGrid(activeBoard);
            setEventListeners(eventHandler);
            checkAllSunk();
            return
        };

        //valid: populated, not yet hit.
        if(!activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated != false){
            console.log("populated and not yet hit!");
            console.log("Here we need to add to the hits array");
            console.log("We also need to add to the required ships hit counter");

            activeBoard.receiveAttack(x, y, activeBoard.grid)
            // markCells(activeBoard)
            displayGrid(activeBoard);
            setEventListeners(eventHandler);
            checkAllSunk();
            return
        };
    }; 
    
    function checkAllSunk(){
        if(activeBoard.allSunk()){
            return alert(`All of ${activeBoard.owner}'s ships have been sunk. Well done ${activePlayer.name}`);
        };
    };
    
    function startGame(){

        updateText(`the current player is ${activePlayer.name}`, "activePlayer")
        updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")
        
        displayGrid(activeBoard);

        //callback to handle the returned ser click
        setEventListeners(eventHandler);
    };

    startGame();
};

gameController();