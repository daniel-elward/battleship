function gridContainer(containerName){
    const wrapper = document.querySelector(".wrapper");
    const container = document.createElement("div");
    container.classList.add(containerName);
    wrapper.appendChild(container);
};

function generateGrid(cellContent, containerName, xValue, yValue){
    const div = document.createElement("div");
    const text = document.createTextNode(cellContent);
    const target = document.querySelector(`.${containerName}`)

    div.classList.add("gridCell");
    div.dataset.x = xValue;
    div.dataset.y = yValue;
    div.dataset.xy = `${xValue}${yValue}`;
    div.appendChild(text);
    target.appendChild(div);
};

function displayGrid(board, targetContainer){
    gridContainer(targetContainer);
    displayMessage(`displaying ${board.owner}'s gameboard`, targetContainer);

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid(board.grid[i][j].isPopulated, targetContainer, i, j);
        };
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

function displayMessage(message, parent){
    const target = document.querySelector(`.${parent}`)
    const p = document.createElement("p");
    const text = document.createTextNode(message);

    p.appendChild(text);
    target.appendChild(p);
};

function refreshBoard(foo, barr){
    const element = document.querySelector(`.${barr}`);
    element.remove();
    // console.log(element)
    displayGrid(foo, barr);
};

module.exports = {displayGrid, displayActivePlayer, displayMessage, refreshBoard, markCell};