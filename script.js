const boardGrid = document.querySelector("#board");
const message = document.querySelector("#message");
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let spaces;

class Game {
    constructor(player1, player2) {
        this.board = [null, null, null, null, null, null, null, null, null];
        this.gameState = "init";
        this.player1 = player1;
        this.player2 = player2;
    }
    refreshBoard() {
        this.board.forEach(i => {
            let space = document.createElement("div");
            space.className = "space";
            space.innerHTML = i;
            boardGrid.appendChild(space);
        })
    }
    applyOnClickToSpaces() {
        spaces = document.querySelectorAll(".space");
        spaces.forEach((space, i) => {
            space.onclick = function() {game.playerMove(space)};
            space.dataset.pos = i;
        })
    }
    playerMove(space) {
        if (!space.innerHTML) {
            switch(this.gameState) {
                case "p1":
                    space.innerHTML = this.player1.symbol;
                    space.style.backgroundColor = "darkturquoise";
                    break;
                case "p2":
                    space.innerHTML = this.player2.symbol;
                    space.style.backgroundColor = "tomato";
                    break;
                default:
                    message.innerHTML = "The game is already over!";
                    break;
            }
            this.board[space.dataset.pos] = space.innerHTML;
            this.checkGameState();
        } else {
            message.innerHTML = "This space is taken!";
        }
    }
    checkGameState() {
        this.checkWin();
        switch(this.gameState) {
            case "init":
                this.refreshBoard();
                this.applyOnClickToSpaces();
                this.gameState = "p1";
                message.innerHTML = "Welcome to tic tac toe! Player 1's turn!";
                break;
            case "p1":
                this.gameState = "p2";
                message.innerHTML = "Player 2's turn!";
                break;
            case "p2":
                this.gameState = "p1";
                message.innerHTML = "Player 1's turn!";
                break;
            case "end":
                break;
        }
    }
    checkWin() {
        let transcribe = [];
        winningPositions.forEach((pos) => {
            pos.forEach((i) => {
                transcribe.push(this.board[i]);
            });
            if (transcribe.toString() == "X,X,X") {
                this.gameState = "end";
                message.innerHTML = "Game over! X wins!";
            } else if (transcribe.toString() == "O,O,O"){
                this.gameState = "end";
                message.innerHTML = "Game over! O wins!";
            }
            transcribe = [];
        });
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
game.checkGameState();