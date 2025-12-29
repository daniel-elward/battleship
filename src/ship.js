class CreateShip {
    constructor(length, type){
        this.type = type;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    };

    hit(){
        this.hits++;
    };
    
    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        };
    };
};

module.exports = CreateShip;