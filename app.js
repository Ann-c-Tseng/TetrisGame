document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.getElementById('#score')
  const StartBtn = document.getElementById('#start-button')
  const width = 10 //width for one side of a single square that makes up the tetrominoes.

  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //Random selection of a tetromino (l, z, t, o, i) in it's first rotation position.
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //Function: draw a tetromino onto the grid
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino') //Access css stylesheet: using classList function to draw each tetromino with a given css colour.
    })
  }

  //Function: undraw the tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  //Make tetromino automove down the grid every second
  timerId = setInterval(moveDown, 500)


  //Function: move down blocks
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //Function: freeze the block from moving past the bottom of the grid and stay.
  //Also produces the next tetromino
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //Produce next tetromino
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

  //Function: move left function -> move the tetromino left, unless there's an edge or blockage
  function moveLeft() {
    //if one of the tetromino squares is in a square that has an index of 0, 10, 20... etc,
    //we know that 0/10, 10/10, 20/10, etc... all give is 0 remainder. Index 0, 10, 20...
    //are all squares on the base grid that represent the LEFT most square.
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -= 1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }





})
