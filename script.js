const boardGrid = document.querySelector("#board");
const message = document.querySelector("#message");
const player1Name = document.querySelector("#player1");
const player2Name = document.querySelector("#player2");
const player1Counter = document.querySelector("#player1-counter");
const player2Counter = document.querySelector("#player2-counter");
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

let game;
let player1;
let player2;

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
        let spaces = document.querySelectorAll(".space");
        spaces.forEach((space, i) => {
            space.onclick = function() {game.playerMove(space)};
            space.dataset.pos = i;
        })
    }
    playerMove(space) {
        if (this.gameState != "end") {
            if (!space.innerHTML) {
                switch(this.gameState) {
                    case "p1":
                        space.innerHTML = this.player1.symbol;
                        space.style.backgroundColor = "#7B9E89";
                        break;
                    case "p2":
                        space.innerHTML = this.player2.symbol;
                        space.style.backgroundColor = "#D95D39";
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
    }
    checkGameState() {
        this.checkDraw();
        this.checkWin();
        switch(this.gameState) {
            case "init":
                this.refreshBoard();
                this.applyOnClickToSpaces();
                this.gameState = "p1";
                message.innerHTML = "Welcome to tic tac toe! " + player1.name + "'s turn!";
                break;
            case "p1":
                this.gameState = "p2";
                message.innerHTML = player2.name + "'s turn!";
                break;
            case "p2":
                this.gameState = "p1";
                message.innerHTML = player1.name + "'s turn!";
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
                message.innerHTML = "Game over! " + player1.name + " wins!";
                player1Counter.innerHTML = parseInt(player1Counter.innerHTML) + 1; 
            } else if (transcribe.toString() == "O,O,O"){
                this.gameState = "end";
                message.innerHTML = "Game over! " + player2.name + " wins!";
                player2Counter.innerHTML = parseInt(player2Counter.innerHTML) + 1; 
            }
            transcribe = [];
        });
    }
    checkDraw() {
        let filteredBoard = this.board.filter(Boolean);
        if (filteredBoard.length == 9) {
            this.gameState = "end";
            message.innerHTML = "Draw!";
        }
    }
}

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

function startNewGame() {
    boardGrid.innerHTML = "";
    player1 = new Player(player1Name.value, "X");
    player2 = new Player(player2Name.value, "O");
    game = new Game(player1, player2);
    game.checkGameState();
}

startNewGame();