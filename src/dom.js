function generateGrid(cellContent, xValue, yValue){
    const div = document.createElement("div");
    const text = document.createTextNode(cellContent);
    const target = document.querySelector(".boardDisplay");

    div.classList.add("gridCell");
    div.dataset.x = xValue;
    div.dataset.y = yValue;
    div.dataset.xy = `${xValue}${yValue}`;
    div.appendChild(text);
    target.appendChild(div);
};

function displayGrid(board){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid(board.grid[i][j].isPopulated, i, j);
        };
    };

    function completeTurn(xCoord, yCoord, board){
        board.receiveAttack(xCoord, yCoord, board.grid);
        markCell(board);
        switchPlayer(pOne, pTwo);
    };

    let x = null;
    let y = null;
    
    const cell = document.getElementsByClassName("gridCell");
    
    for(let i = 0; i < cell.length; i++){
        cell[i].addEventListener("click", (element) => {
            x = element.target.dataset.x;
            y = element.target.dataset.y;
            completeTurn(x, y, board);
        });
    };


    markCell(board);
};

function markCell(board){
    //set missed class to relevent cells
    board.missedShots.forEach(element => {
        const coords = `${element[0]}${element[1]}`;
        const div = document.querySelector(`[data-xy="${coords}"]`);

        div.classList.add("emptyHit");
    });

    //set hit class to relevent cells
    board.hits.forEach(element => {
        const coords = `${element[0]}${element[1]}`;
        const div = document.querySelector(`[data-xy="${coords}"]`);

        div.classList.add("populatedHit");
    });
};

function displayActivePlayer(player){
    const target = document.querySelector(".controlPanel")
    const h1 = document.createElement("h1");
    const headerText = document.createTextNode(player);

    h1.appendChild(headerText);
    target.appendChild(h1);
};

function displayMessage(message, parent, className){
    const target = document.querySelector(`.${parent}`)
    const p = document.createElement("p");
    const text = document.createTextNode(message);

    p.classList.add(className)
    p.appendChild(text);
    target.appendChild(p);
};

function updateText(text, target){
    const element = document.querySelector(`.${target}`);

    element.innerHTML = text;
};

function refreshDisplay(current, board, target){
    const oldGrid = document.querySelector(`.${current}`);
    oldGrid.remove();

    displayGrid(board, target);

    // displayActivePlayer(`current player is ${activePlayer.name}`);
    // displayGrid(activeBoard, "pTwoGameboard");
    // clickListener();
};

module.exports = {displayGrid, displayActivePlayer, displayMessage, 
                  markCell, refreshDisplay, updateText};