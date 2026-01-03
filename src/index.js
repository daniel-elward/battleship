import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";
import generateGrid from "./dom";

const gb = new Gameboard("dan")
const pOne = new Player("dan", gb);

gb.createGameboard();
gb.placeShip(2, 2, gb.grid, 5, "carrier", "CAR1")
gb.placeShip(4, 1, gb.grid, 4, "battleship", "BAT1")
gb.placeShip(6, 5, gb.grid, 3, "cruiser", "CRU1")
gb.placeShip(7, 7, gb.grid, 3, "submarine", "SUB1")
gb.placeShip(1, 8, gb.grid, 2, "destroyer", "DES1")

gb.receiveAttack(2, 2, gb.grid) //testing
gb.receiveAttack(1, 1, gb.grid) //testing

// displayGrid();

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        generateGrid(gb.grid[i][j].xy)
    };
};

console.log(gb)
console.log(pOne)

   // placeShip(x, y, gameboard, size, type, identifier)