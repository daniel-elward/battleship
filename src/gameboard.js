const createShip = require("./ship.js");

class Node {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xy = `X is ${x}, Y is ${y}`;
        this.isHit = false;
        this.isPopulated = false;
    };
};

class Gameboard {
    constructor(owner, gameboardID){
        this.owner = owner
        this.gameboardID = gameboardID;
    };
    
    ships = [];
    missedShots = [];
    hits = [];
    grid = [[],[],[],[],[],[],[],[],[],[]];

    createGameboard(){
        //x axis
        for(let x = 0; x < 10; x++){ 
            //y axis
            for(let y = 0; y < 10; y++){ 
                this.grid[[x],[y]].push(new Node(x, y));
            };
        };

        return this.grid;
    };

    placeShip(x, y, gameboard, size, type, identifier){
        const newShip = new createShip(size, type, identifier);
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
        if(gameboard[x][y].isHit){
            return console.error("cell already hit");
        };

        if(!gameboard[x][y].isPopulated && !gameboard[x][y].isHit){
            gameboard[x][y].isHit = true;
            const array = new Array(x, y);
            this.missedShots.push(array);
        };

        if(gameboard[x][y].isPopulated && !gameboard[x][y].isHit){
            const key = gameboard[x][y].isPopulated;
            const array = new Array(x, y);
            this.hits.push(array);
            this.ships[key].hits += 1;
            gameboard[x][y].isHit = true;
            this.ships[key].isSunk();
        };
    };

    allSunk(){
        let result = false;
        let counter = 0;
        const keys = Object.keys(this.ships);
        
        for(let i = 0 ; i < keys.length; i++){
            if(this.ships[keys[i]].sunk === true){
                counter++
            };
        };

        if(counter === keys.length){
            result = true;
        };
        
        return result;
    };
};

module.exports = Gameboard;