document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {cells: []}
var gridSize = 4

// add cells to board.cells  
function addCells () {
  for (var i=0; i < gridSize; i++) {
    for (var j=0; j < gridSize; j++){
      board.cells.push({row: i, col: j, isMine: false, hidden: true})
    }
  }
}

//define random cells as mines to maximum 25% of the board
function initMines () {
  for (var i = 0; i < Math.floor(board.cells.length/4); i++) {
    board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true
  }
}

function startGame () {
  // Don't remove this function call: it makes the game work!  
  buildControls()
  addCells()  
  initMines()
  for (var i = 0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  
  // Add listner to perform checks with left or right click on board
  var gameBoard = document.getElementsByClassName('board')[0]
  gameBoard.addEventListener('click', checkForWin)
  gameBoard.addEventListener('click', checkIfMine)
  gameBoard.addEventListener('contextmenu', checkForWin)  
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
  new Audio('sound/cheer.mp3').play()
}

function checkIfMine () {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].hidden){      
     new Audio('sound/bomb.mp3').play()
    }
  }
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

//reset the board
function resetBoard () {
  board = {cells: []}  
  document.getElementsByClassName('board')[0].innerHTML = ''  
  startGame()
}

// Add options and listener to grid menu and reset button 
function buildControls () {
  var gridMenu = document.getElementById('gridSelect')  
  var select = ''
  gridMenu.innerHTML = '' 
  for (var i = 3; i <= 6; i++) {
    if (i == gridSize) select = 'selected'
    addGridOption (i, select, gridMenu)
    select = ''
  }
  gridMenu.addEventListener('change', changeGridSize)
  document.getElementById('resetButton').addEventListener('click', resetBoard)
}

// add option to menu
function addGridOption (size, select, gridMenu) {
  gridMenu.innerHTML += '<option value="' + size + '" ' + select + '>' + size + ' x ' + size + '</option>'
}

// Update gridSize variable from selection menu
function changeGridSize () {
  gridSize = document.getElementById('gridSelect').value
  resetBoard()
}


