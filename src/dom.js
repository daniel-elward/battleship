//renders grid to DOM and assigns event listeners to the cells
function displayGrid(board){
    let x = null;
    let y = null;
    
    const cell = document.getElementsByClassName("gridCell");

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid(board.grid[i][j].isPopulated, i, j);
        };
    };
    
    for(let i = 0; i < cell.length; i++){
        cell[i].addEventListener("click", (element) => {
            x = element.target.dataset.x;
            y = element.target.dataset.y;

            // player clicks and invalid clicks need to be registered here 
            // but the processing of hits/misses should not be processed here. 
            // this data should be passed somewhere in index 
            // to be processed as it is not DOM related.

            // completeTurn(x, y, board);
        });
    };

    markCells(board);
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

//applies required css to each cell i.e hit, miss etc
function markCells(board){
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

//displays a messages in the DOM
function updateText(text, target){
    const element = document.querySelector(`.${target}`);

    element.innerHTML = text;
};

module.exports = {displayGrid, updateText, markCells};