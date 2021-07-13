const boardGrid = document.querySelector("#board");
const message = document.querySelector("#message");
class Game {
    constructor(player1, player2) {
        this.matrix = [[null,null,null],[null,null,null],[null,null,null]];
        this.gameState = "init";
        this.player1 = player1;
        this.player2 = player2;
    }
    refreshBoard() {
        this.checkGameState();
        this.matrix.forEach(row => {
            row.forEach(i => {
                let space = document.createElement("div");
                space.className = "space";
                space.innerHTML = i;
                boardGrid.appendChild(space);
            })
        })
    }
    checkGameState() {
        switch(this.gameState) {
            case "init":
                this.gameState = "p1";
                message.innerHTML = "Welcome to tic tac toe! Player 1's turn!";
                break;
            case "p1":
                break;
            case "p2":
                break;
            case "end":
                break;
        }
    }
}

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}


let player1 = new Player("Player 1", "X");
let player2 = new Player("Player 2", "O");
let game = new Game(player1, player2);
game.refreshBoard();