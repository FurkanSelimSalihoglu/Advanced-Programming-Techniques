var config = {
  width: 300,
  height: 600,
  rows: 8,
  cols: 8,
  speed: 5,
  interval: 20,
};
config.height = window.innerHeight - 2;
config.defaultSpeed = config.speed;
var startGameElement, endGameElement;
var gameLoop;
var tileRows = [];
var gameCanvas;
var gameContext;
var isGameStarted = false;
var list = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0];

var i = 0;
document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Script Loaded");
    gameCanvas = document.getElementById("gameCanvas");
    startGameElement = document.getElementById("gameStart");
    endGameElement = document.getElementById("gameEnd");
    gameContext = gameCanvas.getContext("2d");
    gameCanvas.style.width = config.width + "px";
    gameCanvas.style.height = config.height + "px";
    gameCanvas.setAttribute("width", config.width);
    gameCanvas.setAttribute("height", config.height);
    gameContext.lineWidth = 0.5;
    initGame();
  },
  null
);

function pushRow() {
  
  //var black_index = Math.floor(list[i]);
  var black_index = Math.floor(Math.random() * config.cols);
  i++;
  var tile_width = config.width / config.cols;
  var tile_height = config.height / config.rows;
  var y = config.height;
  if (tileRows.length > 0) {
    var lastRow = tileRows[tileRows.length - 1];
    y = lastRow.y + lastRow.height;
  }
 
  var row = {
    x: 0,
    y: y,
    width: config.width,
    height: config.height / config.rows,
    tileWidth: tile_width,
    tileHeight: tile_height,
    color: "#FFFFFF",
    black: {
      index: black_index,
      color: "#000000",
    },
    increament: function () {
      if (this.y <= 0) {
        console.log(this.isValid);
        if (!this.isValid) {
          console.log("Game Over");
          stopGameLoop();
          this.y -= config.speed;
          return;
        }
      }
      this.y = this.y - config.speed;
    },
    decreament: function () {
      this.y = this.y + config.speed;
    },
    isValid: false,
  };
  tileRows.push(row);
  
}

function displayRow(row) {
  gameContext.fillStyle = row.color;
  gameContext.fillRect(0, row.y, row.width, row.height);
  for (var i = 0; i < config.cols; i++) {
    gameContext.strokeRect(
      i * row.tileWidth,
      row.y,
      row.tileWidth,
      row.tileHeight
    );

    if (row.black.index == i  ) {
      gameContext.fillStyle = row.black.color;
      gameContext.fillRect(
        i * row.tileWidth,
        row.y,
        row.tileWidth,
        row.tileHeight
      );
    }
   
  }
  row.increament();
}
function startGameLoop() {
  gameLoop = setInterval(function () {
    displayAllRow();
  }, config.interval);
}
function displayAllRow() {
  gameContext.clearRect(0, 0, config.width, config.height);
  for (var i = 0; i < tileRows.length; i++) {
    displayRow(tileRows[i]);
  }
}

function stopGameLoop() {
  clearInterval(gameLoop);
  gameCanvas.removeEventListener("click", handleGameUserInput);
  endGameElement.style.display = "block";
}

function handleGameUserInput(e) {
  if (!isGameStarted) {
    isGameStarted = true;
    startGameLoop();
  }
  var tile_width = config.width / config.cols;
  var tile_height = config.height / config.rows;
  var x = e.clientX - gameCanvas.offsetLeft;
  var y = e.clientY - gameCanvas.offsetTop;
  var clicked_row = Math.ceil(y / tile_height) - 1;
  var clicked_col = Math.ceil(x / tile_width) - 1;
  for (var i = 0; i < tileRows.length; i++) {
    var row = tileRows[i];
    if (row.y < y && row.y + row.height > y) {
      if (clicked_col === row.black.index) {
        if (!row.isValid) {
          row.isValid = true;
          row.black.color = "#AAAAAA";
          pushRow();
        } else {
          stopGameLoop();
        }
      } else {
        stopGameLoop();
      }
      break;
    }
  }
}



function initGame() {
  gameContext.clearRect(0, 0, config.width, config.height);
  for (var i = 0; i < config.rows; i++) {
    pushRow();
  }
}

function startGame() {
  endGameElement.style.display = "none";
  startGameElement.style.display = "none";
  gameCanvas.addEventListener("click", handleGameUserInput);
}
function restartGame() {
  tileRows = [];
  isGameStarted = false;
  config.speed = config.defaultSpeed;
  endGameElement.style.display = "none";
  initGame();
  startGame();
}
