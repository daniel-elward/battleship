class Player{
    constructor(name, Gameboard){
        this.name = name;
        this.Gameboard = Gameboard;
    };
};

function SwitchPlayer(p1, p2, activePlayer){
    const current = activePlayer;

    return activePlayer === p1 ? activePlayer = p2 : activePlayer = p1;
};

module.exports = Player, SwitchPlayer;
