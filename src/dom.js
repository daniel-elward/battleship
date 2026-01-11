function gridContainer(containerName){
    const wrapper = document.querySelector(".wrapper");
    const container = document.createElement("div");
    container.classList.add(containerName);
    wrapper.appendChild(container);
};

function generateGrid(cellContent, containerName){
    const div = document.createElement("div");
    const text = document.createTextNode(cellContent);
    const target = document.querySelector(`.${containerName}`)

    div.classList.add("gridCell");
    div.appendChild(text);
    target.appendChild(div);
};

function displayGrid(board, targetContainer){

    gridContainer(targetContainer);

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid(board.grid[i][j].isPopulated, targetContainer);
        };
    };
};

module.exports = displayGrid;


/*
function generateGrid(cellContent){
    const target = document.querySelector(".gameboard")

    const div = document.createElement("div");
    const text = document.createTextNode(cellContent);

    div.classList.add("gridCell")
        div.appendChild(text);
            target.appendChild(div);
};
*/