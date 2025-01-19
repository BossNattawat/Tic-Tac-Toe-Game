const playerForm = document.querySelector("#playerForm")
const game = document.querySelector(".game")
const cell = document.querySelector(".cell")
const cells = document.querySelectorAll(".cell");
const result = document.querySelector(".result")
const gameResult = document.querySelector("#gameResult")

const gameTable = [["","",""],
                   ["","",""],
                   ["","",""]]

const playersArray = []

let currentPlayerIndex = 0;
let movesCount = 0;

function Player(name, mark){
    this.name = name
    this.mark = mark
}

game.style.display = "none"
result.style.display = "none"

playerForm.addEventListener("submit", (e) => {

    const playerFormWrapper = document.querySelector(".playerFormWrapper")
    const game = document.querySelector(".game")

    const playerOneName = document.querySelector("#playerOneName").value
    const playerTwoName = document.querySelector("#playerTwoName").value

    const playerTwoTurnInfo = document.querySelector("#playerTwoTurnInfo")
    const playerOneTurnInfo = document.querySelector("#playerOneTurnInfo")

    e.preventDefault()

    if(playerOneName && playerTwoName){
        playerFormWrapper.style.display = "none"
        game.style.display = "flex"
        
        playerOneTurnInfo.textContent = `${playerOneName}`
        playerTwoTurnInfo.textContent = `${playerTwoName}`

        playersArray.push(new Player(playerOneName, "X"))
        playersArray.push(new Player(playerTwoName, "O"))

        const turnInfoOne = document.querySelector("#turnInfoOne")
        turnInfoOne.textContent = `${playersArray[0].name}'s Turn`
    }
    else{
        alert("Please enter player names!")
    }
    

})

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {

        const mark = document.createElement("h1")

        const row = e.target.getAttribute("data-row");
        const col = e.target.getAttribute("data-col");

        const turnInfoOne = document.querySelector("#turnInfoOne")
        const turnInfoTwo = document.querySelector("#turnInfoTwo")

        if (gameTable[row][col] === "") {
            const currentPlayer = playersArray[currentPlayerIndex];
            
            if(playersArray[currentPlayerIndex].name == playersArray[0].name){
                turnInfoTwo.textContent = `${playersArray[1].name}'s Turn`
                turnInfoOne.textContent = ""
            }
            else{
                turnInfoOne.textContent = `${playersArray[0].name}'s Turn`
                turnInfoTwo.textContent = ""
            }

            gameTable[row][col] = currentPlayer.mark;
            
            mark.textContent = currentPlayer.mark;
            cell.appendChild(mark)
            movesCount++;

            const result = document.querySelector(".result")
            const gameResult = document.querySelector("#gameResult")

            if (checkWin(row, col, currentPlayer.mark)) {
                setTimeout(() => {
                    result.style.display = "flex"
                    gameResult.textContent = `HURRAY!! ${currentPlayer.name} WON THE MATCH! 🎉`
                }, 100);
                resetGame();
            } else if (movesCount === 9) {
                setTimeout(() => alert("It's a draw!"), 100);
                resetGame();
            } else {
                currentPlayerIndex = (currentPlayerIndex + 1) % 2;
            }
        }
    });
});

function checkWin(row, col, mark) {
    row = parseInt(row);
    col = parseInt(col);

    if (gameTable[row].every(cell => cell === mark)) return true;

    if (gameTable.every(row => row[col] === mark)) return true;

    if (row === col && gameTable.every((_, idx) => gameTable[idx][idx] === mark)) return true;

    if (row + col === 2 && gameTable.every((_, idx) => gameTable[idx][2 - idx] === mark)) return true;

    return false;
}

function resetGame() {
    gameTable.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            gameTable[rowIndex][colIndex] = "";
        });
    });
    cells.forEach(cell => {
        cell.textContent = "";
    });
    result.style.display = "none"
    currentPlayerIndex = 0;
    movesCount = 0;
}