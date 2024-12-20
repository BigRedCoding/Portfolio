import { canvas, ctx, profileVariables } from "../scripts/utils/constants.js";
import Maps from "../scripts/maps.js";
import Character from "./characters/player.js";

export let lastTime = 0;
let gameOver = false;
let deltaTime;

export let enemies = [];

export let player = new Character(profileVariables.characterName, "true");

export let currentMap = new Maps(profileVariables.currentMap, enemies);

function spawnMap() {
  currentMap.drawToCanvas();
  currentMap._eventHandlers();
}

function spawnPlayer() {
  player.draw();
}

function spawnEnemies() {}

function checkEnemyPositions() {}

function updateStats() {}

function triggerTickProcesses() {
  updateStats();
  checkEnemyPositions();
}

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (!gameOver) requestAnimationFrame(animate);
  triggerTickProcesses();
}

function configStart() {
  animate(0);
  spawnMap();
  spawnPlayer();
  spawnEnemies();
}

configStart();
