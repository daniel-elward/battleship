class CreateShip {
    constructor(length, type, id){
        this.type = type;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.id = id; //manually set a unique ID each time 
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