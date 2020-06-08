document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;

  // the Tetrominoes
  const jTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];

  const sTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ];

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ];

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ];

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ];

  const lTetromino = [
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, width*2],
    [1, width+1, width*2+1, width*2+2],
    [2, width, width+1, width+2]
  ];

  const zTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
  ];

  const theTetrominoes = [ jTetromino, sTetromino, tTetromino, oTetromino, iTetromino, lTetromino, zTetromino ];

  let currentPosition = 4;
  let currentRotation = 0;

  // randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  // draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
    })
  };

  // undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  };

  // make the Tetromino move down every second
  timerId = setInterval(moveDown, 1000);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  };

  // freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      // start a new Tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the Tetromino left unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }



})
