document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {cells: []}

// add cells to board.cells  
var gridSize = 3;
for (var i=0; i < gridSize; i++) {
  for (var j=0; j < gridSize; j++){
    board.cells.push({row: i, col: j, isMine: false, hidden: true})
  }
}

// define cells as mines
board.cells[3].isMine = true
board.cells[8].isMine = true
console.log(board.cells)

function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i = 0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {  
  for (i = 0; i < board.cells.length; i++) {
    //if cell is mine and not marked exit function
    if (board.cells[i].isMine && !board.cells[i].isMarked) return
    //if cell is not mine and still hidden exit function
    if (!board.cells[i].isMine && board.cells[i].hidden) return
  } 
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) count++
  }
  return count
}

