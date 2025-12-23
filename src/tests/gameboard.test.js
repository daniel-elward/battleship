const Gameboard = require("../gameboard.js");

const gb = new Gameboard("dan");
const gbArr = gb.create();

const unoccupied = {
    x: 2,
    y: 2,
    isHit: false,
    isPopulated: false,
}

const occupied = {
    x: 2,
    y: 2,
    isHit: false,
    isPopulated: true,
}

test("confirm grid creation", () => {
    expect(gbArr).toHaveLength(10);
});

test("confirm cell is unoccupied", () => {
    expect(gbArr[2][2]).toMatchObject(unoccupied);
});

test("confirm cell is occupied", () => {
    expect(gbArr[2][2]).toMatchObject(occupied);
});