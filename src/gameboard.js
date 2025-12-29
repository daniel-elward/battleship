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

    create(){
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
        const ship = new createShip(3, "destroyer");
        const length = ship.length;

        gameboard[x][y].isPopulated = true;

        for(let i = 0; i < length; i++){
        gameboard[x][y + i].isPopulated = true;
        };

        return gameboard;
    };
};

module.exports = Gameboard;