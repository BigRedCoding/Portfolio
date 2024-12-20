import Character from "../scripts/player.js";
import Projectile from "../scripts/projectiles/projectiles.js";

let backgroundOffset = { x: 0, y: 0 };
const backgroundWidth = 3000; // Width of the background image
const backgroundHeight = 3000;

let player = Character;

export default class Enemy extends Character {
  constructor(name, isPlayer, mapSizeX, mapSizeY) {
    //super(name, false);
    this.name = name;
    this.isPlayer = isPlayer;
    this._mapSizeX = mapSizeX;
    this._mapSizeY = mapSizeY;
    this._velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }; // Random velocity
    this._projectileDelay = Math.random() * 2000 + 1000; // Random firing interval (1-3 seconds)
    this._lastProjectileTime = 0;
    this._sizeModifier = Math.random() * 0.6 + 0.4;
  }

  update(deltaTime) {
    const previousX = this.x;
    const previousY = this.y;

    // Update position based on background offset
    this.x += this.velocity.x - backgroundOffset.x;
    this.y += this.velocity.y - backgroundOffset.y;

    if (
      this.x <= 0 ||
      this.x + this.width >= backgroundWidth - backgroundOffset.x
    ) {
      this.velocity.x *= -1; // Change direction horizontally
    }

    if (
      this.y <= 0 ||
      this.y + this.height >= backgroundHeight - backgroundOffset.y
    ) {
      this.velocity.y *= -1; // Change direction vertically
    }

    // If the enemy moves, update animation frame
    if (this.x !== previousX || this.y !== previousY) {
      this.animate();
    }

    // Fire projectiles toward the player
    this.lastProjectileTime += deltaTime;
    if (this.lastProjectileTime > this.projectileDelay) {
      this.fireProjectile();
      this.lastProjectileTime = 0; // Reset timer
    }
  }

  spawn() {
    const spawnX = Math.random() * (backgroundWidth - this.width);
    const spawnY = Math.random() * (backgroundHeight - this.height);

    this.draw();

    this.x = spawnX;
    this.y = spawnY;
  }

  _movement() {
    const previousX = this.x;
    const previousY = this.y;

    if (this.isPlayer === false) {
      this.x += this.velocity.x - backgroundOffset.x;
      this.y += this.velocity.y - backgroundOffset.y;

      if (
        this.x <= 0 ||
        this.x + this.width >= backgroundWidth - backgroundOffset.x
      ) {
        this.velocity.x *= -1; // Change direction horizontally
      }

      if (
        this.y <= 0 ||
        this.y + this.height >= backgroundHeight - backgroundOffset.y
      ) {
        this.velocity.y *= -1; // Change direction vertically
      }

      // If the enemy moves, update animation frame
      if (this.x !== previousX || this.y !== previousY) {
        super.animate();
      }
    }
  }

  offsetMovement(mapMovement, mapSizeX, mapSizeY) {}

  fireProjectile() {
    const angle = Math.atan2(player.y - this.y, player.x - this.x); // Angle to the player
    const projectile = new Projectile(
      this.x + this.width / 2,
      this.y + this.height / 2,
      angle
    );
    enemyProjectiles.push(projectile); // Add to enemy projectile array
  }

  die() {
    // Chance to drop an item (e.g., 30%)
    if (Math.random() < 0.9) {
      const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const item = new Item(
        this.x + this.width / 2,
        this.y + this.height / 2,
        itemType
      );
      droppedItems.push(item);
      console.log(`${itemType} item dropped!`);
    }
    console.log(`${this.name} has been defeated.`);
  }

  /*chasePlayer (){
    enemy.direction.x = Math.sign(playerPosition.x - enemy.x);
    enemy.direction.y = Math.sign(playerPosition.y - enemy.y);}*/
}
