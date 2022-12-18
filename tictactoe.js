const symbols = [ 'X', 'O' ]
const players = [ 'Player 1', 'Player 2' ]
const defaultBoards = [ '', '', '', '', '', '', '', '', '' ]
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let playerTurn = 1
let boards = defaultBoards

const validateClick = (boardIndex) => {
    return boards[boardIndex] == '' && !checkWinner()
}
const onBoardClicked = (boardIndex) => {
    if (!validateClick(boardIndex)) {
        return
    }

    setSymbol(boardIndex, symbols[playerTurn])
    if (checkWinner()) {
        return
    }

    if (isGameOver()) {
        reset()
        return
    }
    
    switchPlayer()
}
const setSymbol = (boardIndex, symbol = '') => {
    boards[boardIndex] = symbol
    document.querySelectorAll('.board')[boardIndex].textContent = boards[boardIndex]
}
const checkWinner = () => {
    let winCombinationFound = false
    for (let i = 0; i < winCombinations.length; i++) {
        const [ a, b, c ] = winCombinations[i]

        if ([boards[a], boards[b], boards[c]].includes('')) {
            continue
        }

        if (boards[a] != boards[b] || boards[b] != boards[c]) {
            continue
        }

        winCombinationFound = true
        document.querySelectorAll('.board').forEach((board, boardIndex) => {
            if (boardIndex == a || boardIndex == b || boardIndex == c) {
                board.style.color = '#EB455F'
            }
        });
        document.querySelector('.text-info').textContent = players[playerTurn] + ' is win!'
        break
    }

    return winCombinationFound
}
const switchPlayer = () => {
    playerTurn = Math.abs(playerTurn - 1)
    document.querySelector('.text-info').textContent = 'Turns: ' + players[playerTurn]
}
const isGameOver = () => {
    if (checkWinner()) {
        return
    }

    return boards.filter(v => v != '').length == 9
};
const reset = () => {
    boards = defaultBoards
    for (let i = 0; i < boards.length; i++) {
        setSymbol(i)
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    switchPlayer()
    document.querySelectorAll('.board').forEach((boardElem, boardIndex) => {
        boardElem.onclick = () => {
            onBoardClicked(boardIndex)
        }
    })
});