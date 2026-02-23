//renders grid to DOM and assigns event listeners to the cells
function displayGrid(aiBoard, playerBoard){
    cleanDom();
        
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid("", i, j);
            // generateGrid(aiBoard.grid[i][j].isPopulated, i, j);
        };
    };

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            // console.log(playerBoard)
            
            if(playerBoard.grid[i][j].isPopulated === false){
                generateGridTEMP("", i, j);
            } else {
                generateGridTEMP("X", i, j);
                // generateGridTEMP(playerBoard.grid[i][j].isPopulated, i, j); 
            };
        };
    };
    
    markCells(aiBoard);
    markCells(playerBoard);
};

//TEMPOARY FOR AI 
//renders grid to DOM and assigns event listeners to the cells
function displayGridTEMP(board){
    cleanDom();
        
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGridTEMP(board.grid[i][j].isPopulated, i, j);
        };
    };
    
    markCells(board);
};

function cleanDom(){
    const aiCells = document.querySelectorAll(".gridCell");
    const playerCells = document.querySelectorAll(".gridCellPlayer");

    aiCells.forEach((element) => {
        element.remove();
    });

    playerCells.forEach((element) => {
        element.remove();
    });
};

function setEventListeners(handler){
    let clickData = {};
    const cell = document.getElementsByClassName("gridCell");


    for(let i = 0; i < cell.length; i++){
        cell[i].addEventListener("click", (element) => {
            clickData = {
                x: element.target.dataset.x, 
                y: element.target.dataset.y
            }

            handler(clickData);
        });
    };  
};

//generate the cells of the grid and assign their x/y values
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

//TEMPORARY TO SEE MY OWN GRID WHEN PLAYING AI
//generate the cells of the grid and assign their x/y values
function generateGridTEMP(cellContent, xValue, yValue){
    const div = document.createElement("div");
    const text = document.createTextNode(cellContent);
    const target = document.querySelector(".playerBoardDisplay");

    div.classList.add("gridCellPlayer");
    div.dataset.x = xValue;
    div.dataset.y = yValue;
    div.dataset.xy = `${xValue}${yValue}`;
    div.appendChild(text);
    target.appendChild(div);
};

//applies required css to each cell i.e hit, miss etc
function markCells(board){
    const gameBoard = document.querySelector(`.${board.display}`);

    board.missedShots.forEach(element => {
        const coords = `${element[0]}${element[1]}`;
        const div = gameBoard.querySelector(`[data-xy="${coords}"]`);
        const circleDiv = document.createElement("div");

        div.appendChild(circleDiv);

        circleDiv.classList.add("emptyHit");
    });

    //set hit class to relevent cells
    board.hits.forEach(element => {
        const coords = `${element[0]}${element[1]}`;
        const div = gameBoard.querySelector(`[data-xy="${coords}"]`);
        const circleDiv = document.createElement("div");
        
        if(board.owner === "aiPlayer"){
            div.appendChild(circleDiv);
            circleDiv.classList.add("populatedHit");
        } else {
            div.style.color = "#b90f0f";
        };
    });
};

//displays a messages in the DOM
function updateText(text, target){
    const element = document.querySelector(`.${target}`);

    element.innerHTML = text;
};

module.exports = {displayGrid, displayGridTEMP, updateText, markCells, setEventListeners, cleanDom};