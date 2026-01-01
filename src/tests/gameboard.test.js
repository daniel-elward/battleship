const Gameboard = require("../gameboard.js");

const gb = new Gameboard("dan");
const ships = gb.ships;
const gbArr = gb.createGameboard();
const gbPlace = gb.placeShip(2, 2, gbArr, 3, "destroyer", "DES1");
const gbPlace2 = gb.placeShip(4, 4, gbArr, 2, "frigate", "FRIG1");

const hits = gb.receiveAttack(1, 1, gbArr);
const hits2 = gb.receiveAttack(2, 2, gbArr);
const hits3 = gb.receiveAttack(2, 3, gbArr);
const hits4 = gb.receiveAttack(2, 4, gbArr);

const hits5 = gb.receiveAttack(4, 4, gbArr);
const hits6 = gb.receiveAttack(4, 5, gbArr);

const allSunk = gb.allSunk();


test("confirm grid creation", () => {
    expect(gbArr).toHaveLength(10);
});

test("confirm cell is unoccupied", () => {
    expect(gbArr[3][3].isPopulated).toBeFalsy();
});

test("confirm cell is occupied", () => {
    expect(gbArr[2][2].isPopulated).toBeTruthy();
});

test("confirm the multiple cells occupied by ship", () => {
    expect(gbArr[2][2].isPopulated).toBeTruthy();
    expect(gbArr[2][3].isPopulated).toBeTruthy();
    expect(gbArr[2][4].isPopulated).toBeTruthy();
    
    //confirms where the occupied cells ends
    expect(gbArr[2][5].isPopulated).toBeFalsy();
    expect(gbArr[2][1].isPopulated).toBeFalsy();
});

test("log attack on empty cell as miss", () => {
    expect(gbArr[1][1].isHit).toBeTruthy();
});

test("log misses in an array", () => {
    expect(gb.missedShots[0]).toBe("1, 1");
});

test("direct hit increments ship 'hit' value", () => {
    expect(gb.ships.DES1.hits).toEqual(3);
});

test("check if all ships are 'sunk'", () => {
    expect(allSunk).toBeTruthy();
});