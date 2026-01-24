class Player{
    constructor(name, Gameboard, gameboardID){
        this.name = name;
        this.Gameboard = Gameboard;
        this.gameboardID = gameboardID;
    };
};

//switch active player and active board
function switchPlayer(p1, p2){
    activePlayer === p1 ? activePlayer = p2 : activePlayer = p1;
    activeBoard === pTwoBoard ? activeBoard = pOneBoard : activeBoard = pTwoBoard;

    updateText(`the current player is ${activePlayer.name}`, "activePlayer")
    updateText(`the current board is ${activeBoard.owner}'s`, "activeBoard")
    
    return [activePlayer, activeBoard];
};

module.exports = Player;

