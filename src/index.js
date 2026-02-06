const style = require("./style.css");
const Player = require("./player.js");
const Gameboard = require("./gameboard.js");
const {displayGrid, updateText, setEventListeners} = require("./dom.js");
const aiEasy = require("./ai.js");

// ---------- Player One
const pOneBoard = new Gameboard("Player One", "pOneGameboard", "secondBoardDisplay")
const pOne = new Player("Player One", pOneBoard, "pOneGameboard");

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
        return [activePlayer, activeBoard];
    };

    function aiShotHandler(coord){
        activeBoard.receiveAttack(coord.x, coord.y, activeBoard.grid);
        updateText(`${pTwo.name}'s last shot was ${coord.x}, ${coord.y}`, "aiLog");
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

            activeBoard.receiveAttack(x, y, activeBoard.grid)
            
            updateText(`${pOne.name}'s last shot was ${x}, ${y}`, "playerLog");
            if(ai === true){
                switchPlayer(pOne, pTwo); //switch to AI
                const aiShot = aiEasy(aiShotHandler); //make selection 

                switchPlayer(pOne, pTwo); //switch back to player
                displayGrid(pTwoBoard, pOneBoard); // display

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
        displayGrid(pTwoBoard, pOneBoard);

        // displayGrid(activeBoard);
        // displayGridTEMP(pOneBoard); //temp to see AI shots

        //callback to handle the returned click
        setEventListeners(eventHandler);
    };

    startGame();
};

gameController();