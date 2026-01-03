function generateGrid(bar){
    const target = document.querySelector(".gameboard")
    
    // for(let i = 0; i < 10; i++){
        const div = document.createElement("div");
        const foo = document.createTextNode(bar);

        div.classList.add("gridCell")
            div.appendChild(foo);
                target.appendChild(div);
    // };
};

function displayGrid(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            generateGrid(gb.grid[i][j].x)
        };
    };
};

module.exports = generateGrid;