const CreateShip = require("../ship.js");

const ship = new CreateShip(5);


test("setting ship type (length)", () => {
    expect(ship.length).toBe(5);
});

test("checking hits register", () => {
    for(let i = 0; i < 5; i++) {ship.hit();};
    expect(ship.hits).toBe(5);
});

test("registering when ship is sunk", () => {
    ship.isSunk();
    expect(ship.sunk).toBeTruthy();
});