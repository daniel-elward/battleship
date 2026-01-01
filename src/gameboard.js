const createShip = require("./ship.js");

class Node {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.isHit = false;
        this.isPopulated = false;
    };
};

class Gameboard {
    constructor(owner){
        this.owner = owner
    };
    
    ships = {};
    missedShots = [];

    createGameboard(){
        const gb = [[],[],[],[],[],[],[],[],[],[]];

        //x axis
        for(let x = 0; x < 10; x++){ 
            //y axis
            for(let y = 0; y < 10; y++){ 
                gb[[x],[y]].push(new Node(x, y));
            };
        };

        return gb;
    };

    placeShip(x, y, gameboard){

        //change hardcode later
        const newShip = new createShip(3, "destroyer", "DES1");
        const id = newShip.id;
        const length = newShip.length;

        gameboard[x][y].isPopulated = newShip.id;

        for(let i = 0; i < length; i++){
        gameboard[x][y + i].isPopulated = newShip.id;
        };

        this.ships[id] = newShip;

        return gameboard;
    };

    receiveAttack(x, y, gameboard){
        if(!gameboard[x][y].isPopulated && !gameboard[x][y].isHit){
            gameboard[x][y].isHit = true;
            this.missedShots.push(`${x}, ${y}`)
        };

        if(gameboard[x][y].isPopulated && !gameboard[x][y].isHit){
            const key = gameboard[x][y].isPopulated;
            this.ships[key].hits += 1;
        };
    };
};

module.exports = Gameboard;