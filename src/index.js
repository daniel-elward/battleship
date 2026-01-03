import "./style.css";
import Player from "./player";
import Gameboard from "./gameboard";

const gb = new Gameboard("dan")
const pOne = new Player("dan", gb);

gb.createGameboard();
gb.placeShip(2, 2, gb.gb, 5, "carrier", "CAR1")
gb.placeShip(4, 1, gb.gb, 4, "battleship", "BAT1")
gb.placeShip(6, 5, gb.gb, 3, "cruiser", "CRU1")
gb.placeShip(7, 7, gb.gb, 3, "submarine", "SUB1")
gb.placeShip(1, 8, gb.gb, 2, "destroyer", "DES1")

console.log(gb)
console.log(pOne)

   // placeShip(x, y, gameboard, size, type, identifier)