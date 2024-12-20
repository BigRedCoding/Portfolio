import { canvas, ctx } from "../utils/constants.js";

let projectileSpeed = 10;

export default class Projectile {
  constructor(x, y, angle, damage) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = projectileSpeed;
    this.angle = angle;
    this.damage = damage;
    this.dx = Math.cos(this.angle) * this.speed;
    this.dy = Math.sin(this.angle) * this.speed;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  checkCollisionWithEnemy(enemy) {
    // Check if the projectile collides with the enemy
    const dx = this.x - (enemy.x + enemy.width / 2); // Enemy's center
    const dy = this.y - (enemy.y + enemy.height / 2); // Enemy's center
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + enemy.width / 2) {
      // Simplified collision check
      enemy.takeDamage(this.damage);
      return true; // Collision detected
    }
    return false; // No collision
  }
  checkCollisionWithPlayer(player) {
    return (
      this.x + this.radius > player.x &&
      this.x - this.radius < player.x + player.width &&
      this.y + this.radius > player.y &&
      this.y - this.radius < player.y + player.height
    );
  }
}
