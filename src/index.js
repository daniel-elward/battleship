require("./style.css");
const Player = require("./player.js");
const Gameboard = require("./gameboard.js");
const {displayGrid, updateText, setEventListeners} = require("./dom.js");
const aiEasy = require("./ai.js");

// ---------- Player One
const pOneBoard = new Gameboard("Player One", "pOneGameboard", "playerBoardDisplay")
const pOne = new Player("Player One", pOneBoard, "pOneGameboard");

// ---------- Player Two
const pTwoBoard = new Gameboard("aiPlayer", "pTwoGameboard", "boardDisplay");
const pTwo = new Player("aiPlayer", pTwoBoard, "pTwoGameboard");

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

        try {
            activeBoard.receiveAttack(coord.x, coord.y, activeBoard.grid);
        } catch {
            aiEasy(aiShotHandler);
        };
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

        const button = document.getElementById("startGame");

        button.addEventListener("click", () => {

            //remove start button
            button.remove();

            //random 0-9 for grid cell
            function getGridNum(){
                return Math.floor(Math.random() * 10);
            };

            //random 0 - 1 for rotation 0 = ver 1 = hor 
            function getRotateNum(){
                return Math.floor(Math.random() * 2);
            };

            //ship details
            const shipData = {
                carrier: {
                    name: "carrier",
                    id: "CAR1",
                    size: 5
                },
    
                battleship: {
                    name: "battleship",
                    id: "BAT1",
                    size: 4
                },
    
                cruiser: {
                    name: "cruiser",
                    id: "CRU1",
                    size: 3
                },
    
                submarine: {
                    name: "submarine",
                    id: "SUB1",
                    size: 3
                },
    
                destroyer: {
                    name: "destroyer",
                    id: "DES1",
                    size: 2
                }
            };
            
            pOneBoard.createGameboard();

           //place human players ships
           for(let i = 0; i < 5; i++){
                const ships = Object.entries(shipData)
    
                let valid = false;

                while(!valid){
                    const startX = getGridNum();
                    const startY = getGridNum();
                    // -1 because of array indexing of the cells
                    const endY = (startY + ships[0][1].size) - 1;

                    const coords = [startX, endY];
                    
                    if(endY <= 9){

                        if(pOneBoard.grid[startX][startY].isPopulated === false &&
                           pOneBoard.grid[startX][endY].isPopulated === false){
                            
                            pOneBoard.placeShip(startX, startY, pOneBoard.grid, ships[i][1].size, ships[i][1].name, ships[i][1].id);

                            valid = true;
                        }

                    };
                };
            };


            pTwoBoard.createGameboard();

            //place ai players ships
            for(let i = 0; i < 5; i++){
                const ships = Object.entries(shipData)
    
                let valid = false;

                while(!valid){
                    const startX = getGridNum();
                    const startY = getGridNum();
                    // -1 because of array indexing of the cells
                    const endY = (startY + ships[0][1].size) - 1;

                    const coords = [startX, endY];
                    
                    if(endY <= 9){

                        if(pTwoBoard.grid[startX][startY].isPopulated === false &&
                           pTwoBoard.grid[startX][endY].isPopulated === false){
                            
                            pTwoBoard.placeShip(startX, startY, pTwoBoard.grid, ships[i][1].size, ships[i][1].name, ships[i][1].id);

                            valid = true;
                        }
                        
                    };
                };
            };
    
            displayGrid(pTwoBoard, pOneBoard);
    
            //callback to handle the returned click
            setEventListeners(eventHandler);
        });

    };

    startGame();
};

gameController();