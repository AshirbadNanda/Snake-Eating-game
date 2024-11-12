let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Load high score from localStorage
let movesound = new Audio("sound.mp3");
let gameover = new Audio("gameover.mp3");
let inputDir = { x: 0, y: 0 };
let board = document.querySelector(".board");
let scoreelement = document.querySelector(".score");
let Hscoreelement = document.querySelector(".Hscore");
let speedtime = 5; // 100ms interval -> 10 frames per second
let lastpainttime = 0;
let snakearr = [
  {
    x: 13,
    y: 15,
  },
];
let food = { x: 6, y: 8 };
Hscoreelement.innerHTML = `Highscore: ${highScore}`;
scoreelement.innerHTML = `Score: ${score}`;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpainttime) / 1000 < 1 / speedtime) {
    return;
  }
  lastpainttime = ctime;
  gameengine();
}

function iscollide(snakearr) {
  if (
    snakearr[0].x <= 0 ||
    snakearr[0].x > 18 ||
    snakearr[0].y <= 0 ||
    snakearr[0].y > 18
  ) {
    return true;
  }
  for (let i = 1; i < snakearr.length; i++) {
    if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
      return true;
    }
  }
  return false;
}

function gameengine() {
  //
  if (iscollide(snakearr)) {
    gameover.play();
    inputDir = { x: 0, y: 0 };
    // Update high score if necessary
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore); // Save high score to localStorage
      Hscoreelement.innerHTML = `Highscore: ${highScore}`;
    }
    alert("game over press any key to start");
    snakearr = [{ x: 13, y: 15 }];
    score = 0;
    scoreelement.innerHTML = `Score: ${score}`;
  }
  //
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    });
    do {
      food = {
        x: Math.floor(1 + 17 * Math.random()),
        y: Math.floor(1 + 17 * Math.random()),
      };
    } while (
      snakearr.some((segment) => segment.x === food.x && segment.y === food.y)
    );
    score++;

    scoreelement.innerHTML = `Score: ${score}`;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore); // Save high score to localStorage
      Hscoreelement.innerHTML = `Highscore: ${highScore}`;
    }
  }
  //moving
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  //part1;display the snake
  board.innerHTML = "";
  snakearr.forEach((ele, index) => {
    let snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = ele.y;
    snakeelement.style.gridColumnStart = ele.x;
    if (index === 0) {
      snakeelement.classList.add("head");
    } else {
      snakeelement.classList.add("fullbody");
    }
    board.appendChild(snakeelement);
  });

  //part2:dispaly food
  let foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      console.log("ArrowDown");
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      console.log("ArrowLeft");
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      console.log("ArrowRight");
      break;
    default:
      break;
  }
});
