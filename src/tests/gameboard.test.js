const Gameboard = require("../gameboard.js");

const gb = new Gameboard("dan");
const gbArr = gb.create();
const gbPlace = gb.placeShip(2, 2, gbArr);

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