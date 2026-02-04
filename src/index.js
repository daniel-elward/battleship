import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import {displayGrid, displayGridTEMP, updateText, setEventListeners} from "./dom";
import aiEasy from "./ai";

// ---------- Player One
const pOneBoard = new Gameboard("dan", "pOneGameboard", "secondBoardDisplay")
const pOne = new Player("dan", pOneBoard, "pOneGameboard");

console.log(pOneBoard)

pOneBoard.createGameboard();
pOneBoard.placeShip(2, 2, pOneBoard.grid, 5, "carrier", "CAR1");
pOneBoard.placeShip(4, 1, pOneBoard.grid, 4, "battleship", "BAT1");
pOneBoard.placeShip(6, 5, pOneBoard.grid, 3, "cruiser", "CRU1");
pOneBoard.placeShip(7, 7, pOneBoard.grid, 3, "submarine", "SUB1");
pOneBoard.placeShip(0, 0, pOneBoard.grid, 2, "destroyer", "DES1");

// pOneBoard.receiveAttack(1,1, pOneBoard.grid);
// pOneBoard.receiveAttack(2,2, pOneBoard.grid);

// ---------- Player Two
const pTwoBoard = new Gameboard("AI - Easy", "pTwoGameboard", "boardDisplay");
const pTwo = new Player("AI - Easy", pTwoBoard, "pTwoGameboard");

pTwoBoard.createGameboard();
pTwoBoard.placeShip(1, 5, pTwoBoard.grid, 5, "carrier", "CAR1");
pTwoBoard.placeShip(6, 5, pTwoBoard.grid, 4, "battleship", "BAT1");
pTwoBoard.placeShip(3, 4, pTwoBoard.grid, 3, "cruiser", "CRU1");
pTwoBoard.placeShip(2, 4, pTwoBoard.grid, 3, "submarine", "SUB1");
pTwoBoard.placeShip(1, 0, pTwoBoard.grid, 2, "destroyer", "DES1");

function gameController(){
    let activePlayer = pOne;
    let activeBoard = pTwoBoard;
    
    //switch active player and active board
    function switchPlayer(p1, p2){
        activePlayer === p1 ? activePlayer = p2 : activePlayer = p1;
        activeBoard === pTwoBoard ? activeBoard = pOneBoard : activeBoard = pTwoBoard;
    
        updateText(`the current player is ${activePlayer.name}`, "activePlayer")
        updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")
        
        return [activePlayer, activeBoard];
    };

    function aiShotHandler(foo){
        activeBoard.receiveAttack(foo.x, foo.y, activeBoard.grid)
    };

    //check and process the users click. hit, miss, invalid, etc
    function eventHandler(data){
        const x = data.x;
        const y = data.y;
        const ai = true; //dev state: working on AI opponent logic

        //invalid: not populated, already hit.
        if(activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated === false){
            if(ai === true){
                aiEasy(aiShotHandler);
                return
            }else{
                alert("invalid! already hit!");
            };
        };
     
        //invalid: populated, already hit.
        if(activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated != false){
            if(ai === true){
                aiEasy(aiShotHandler);
                return
            }else{
                alert("invalid! already hit!");
            };
        };

        //valid: not populated, not yet hit.
        if(!activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated === false){
            console.log("not populated and not yet hit!");
            console.log("Here we need to add to the missed shots array");

            activeBoard.receiveAttack(x, y, activeBoard.grid)

            if(ai === true){
                switchPlayer(pOne, pTwo);
                aiEasy(aiShotHandler);                
                switchPlayer(pOne, pTwo);
                displayGrid(pTwoBoard, pOneBoard);
                // displayGrid(activeBoard);
                setEventListeners(eventHandler);
                checkAllSunk();
                return
            } else {
                switchPlayer(pOne, pTwo);
                // displayGrid(activeBoard);
                setEventListeners(eventHandler);
                checkAllSunk();
                return
            };
        };

        //valid: populated, not yet hit.
        if(!activeBoard.grid[x][y].isHit && activeBoard.grid[x][y].isPopulated != false){
            console.log("populated and not yet hit!");
            console.log("Here we need to add to the hits array");
            console.log("We also need to add to the required ships hit counter");

            activeBoard.receiveAttack(x, y, activeBoard.grid)

            if(ai === true){
                switchPlayer(pOne, pTwo);
                aiEasy(aiShotHandler);
                switchPlayer(pOne, pTwo);
                displayGrid(pTwoBoard, pOneBoard);
                // displayGrid(activeBoard);
                setEventListeners(eventHandler);
                checkAllSunk();
                return
            } else {
                switchPlayer(pOne, pTwo);
                // displayGrid(activeBoard);
                setEventListeners(eventHandler);
                checkAllSunk();
                return
            };
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
        
        displayGrid(pTwoBoard, pOneBoard);
        // displayGrid(activeBoard);
        // displayGridTEMP(pOneBoard); //temp to see AI shots

        //callback to handle the returned click
        setEventListeners(eventHandler);
    };

    startGame();
};

gameController();