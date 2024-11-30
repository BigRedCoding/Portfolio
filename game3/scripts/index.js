const mainCanvas = document.querySelector(".main__canvas");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastTime = 0;
let gameOver = false;

class Player {
  constructor() {
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    this.width = 100;
    this.height = 100;
    this.x = canvas.width * 0.5;
    this.y = canvas.height * 0.5 - this.height;
    this.image = new Image();
    this.image.src = "./images/raven.png";
    this.frame = 0;
    this.maxFrame = 4;
  }
}

class Enemy {
  constructor() {
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    this.width = 100;
    this.height = 100;
    this.x = canvas.width * 0.5;
    this.y = canvas.height * 0.5 - this.height;
    this.image = new Image();
    this.image.src = "./images/raven.png";
    this.frame = 0;
    this.maxFrame = 4;
  }
}

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  console.log(deltaTime);
  let deltaTime1;
  deltaTime1 += deltaTime;

  if (!gameOver) requestAnimationFrame(animate);
}

animate(0);
