import Projectile from "../projectiles/projectiles.js";
import { lastTime, enemies } from "../index.js";
import {
  characterVariables,
  healthLabel,
  manaLabel,
  xpLabel,
  displayLevel,
  healthBar,
  manaBar,
  xpBar,
} from "../utils/constants.js";

export const canvas = document.getElementById("map-canvas");
export const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;

export default class Character {
  constructor(name, isPlayer) {
    this.lastTime = lastTime;
    this.name = name;
    this.isPlayer = isPlayer;
    this.stats = { ...characterVariables };
    this.image = new Image();
    this.image.src = "./images/raven.png";
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.spriteWidth = 200;
    this.spriteHeight = 179;

    this.width = 100;
    this.height = 100;
    this._isAutoFiring = false;
    this.ctx = ctx;

    this._cooldownTime = 500; // Delay between shots in milliseconds
    this._lastFireTime = 0; // Time of last projectile fired

    if (isPlayer) {
      this.x = 450 - this.width / 2; // Centered horizontally
      this.y = 450 - this.height / 2; // Centered vertically
    } else {
      // Set enemy position to a random location within the canvas, but not too close to edges
      this.x = Math.random() * (1200 - this.width);
      this.y = Math.random() * (900 - this.height);
      this.sizeModifier = Math.random() * 0.6 + 0.4;
      this.width = this.spriteWidth * this.sizeModifier;
      /* multiplication is faster than division in code*/
      this.height = this.spriteHeight * this.sizeModifier;
    }
    this.frame = 0;
    this.maxFrame = 4;
    this.frameDelay = 10; // Controls animation speed
    this.frameCounter = 0; // Keeps track of updates for frame switching
  }

  /*_eventHandlers() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "f" && isPlayer) {
        this._isAutoFiring = !this._isAutoFiring; //Auto firing
      }
    });
    console.log("player event handler");
  }

  displayStats() {
    console.log(`${this.name} Stats:`);
    console.log(`Health: ${this.stats.health}/${this.stats.maxHealth}`);
    console.log(`Attack: ${this.stats.attack}`);
    console.log(`Defense: ${this.stats.defense}`);
    console.log(`Speed: ${this.stats.speed}`);
    console.log(`Gold: ${this.stats.gold}`);
    console.log(`Level: ${this.stats.level}`);
    console.log(`Experience: ${this.stats.experience}`);
  }

  updateBars() {
    // Update widths
    healthBar.style.width = `${player.stats.health}%`;
    manaBar.style.width = `${player.stats.mana}%`;
    xpBar.style.width = `${player.stats.experience}%`;

    // Update labels
    healthLabel.textContent = `Health: ${player.stats.health}%`;
    manaLabel.textContent = `Mana: ${player.stats.mana}%`;
    xpLabel.textContent = `XP: ${player.stats.experience}%`;
    displayLevel.textContent = `LV: ${player.stats.level}`;
  }

  attack(target, mouseX, mouseY) {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle = Math.atan2(dy, dx); // Angle to the mouse position
    let distance = Math.sqrt(dx * dx + dy * dy);
    let damage = Math.max(0, this.stats.attack - target.stats.defense);

    if (distance < 50) {
      // Assuming the attack can hit within a 50px range
      console.log(`${this.name} hits ${target.name} for ${damage} damage.`);
      target.stats.health -= damage;

      if (target.stats.health <= 0) {
        target.stats.health = 0;
        console.log(`${target.name} has been defeated.`);
      }
    }

    target.stats.health -= damage;
    if (target.stats.health <= 0) {
      target.stats.health = 0;
      console.log(`${target.name} has been defeated.`);
    }
  }

  autoFiring() {
    if (
      this._isAutoFiring &&
      this.lastTime - this._lastFireTime >= this._cooldownTime
    ) {
      enemies.forEach((enemy) => {
        this.fireProjectile();
        lastFireTime = lastTime; // Update the time of last fire
      });
      enemies.forEach((enemy) => {
        enemy.update(deltaTime); // Update enemy position and firing
        enemy.draw();
      });
    }
  }*/

  draw() {
    const playerX = canvas.width / 2 - this.width / 2; // Center horizontally
    const playerY = canvas.height / 2 - this.height / 2; // Center vertically

    if (this.imageLoaded) {
      ctx.drawImage(this.image, playerX, playerY, this.width, this.height);
      this.drawHealthBar(playerX, playerY); // Pass the position for health bar
    }
  }

  drawHealthBar(x, y) {
    const barWidth = this.width;
    const barHeight = 5;
    const healthRatio = this.stats.health / this.stats.maxHealth;

    // Draw health bar background
    ctx.fillStyle = "red";
    ctx.fillRect(x, y - 10, barWidth, barHeight);

    // Draw health bar foreground (based on health ratio)
    ctx.fillStyle = "green";
    ctx.fillRect(x, y - 10, barWidth * healthRatio, barHeight);

    // Draw a black border around the health bar
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y - 10, barWidth, barHeight);
  }

  /*gainExperience(amount) {
    this.stats.experience += amount;
    console.log(`${this.name} gains ${amount} experience!`);

    if (this.stats.experience >= 100) {
      this.levelUp();
    }
  }

  levelUp() {
    this.stats.level++;
    this.stats.experience = 0;
    this.stats.maxHealth += 10;
    this.stats.attack += 5;
    this.stats.defense += 2;
    console.log(`${this.name} has leveled up to level ${this.stats.level}!`);
  }

  heal(amount) {
    this.stats.health = Math.min(
      this.stats.maxHealth,
      this.stats.health + amount
    );
    console.log(
      `${this.name} heals for ${amount} health. Current health: ${this.stats.health}/${this.stats.maxHealth}`
    );
  }

  spendGold(amount) {
    if (this.stats.gold >= amount) {
      this.stats.gold -= amount;
      console.log(`${this.name} spends ${amount} gold.`);
    } else {
      console.log(`${this.name} doesn't have enough gold.`);
    }
  }

  animate() {
    this.frameCounter++;
    if (this.frameCounter >= this.frameDelay) {
      this.frame = (this.frame + 1) % this.maxFrame; // Loop back to the first frame
      this.frameCounter = 0; // Reset the counter
    }
  }

  takeDamage(amount) {
    this.stats.health -= amount;
    if (this.stats.health <= 0 && this.isPlayer === true) {
      this.stats.health = 0;
      console.log(`${this.name} has been defeated!`);
      alert("Try Again!");
      location.reload();
    } else if (this.stats.health <= 0) {
      this.stats.health = 0;
      console.log(`${this.name} has been defeated!`);
    }
  }

  fireProjectile() {
    const dx = mouseX - (player.x + player.width / 2); // Adjust for player's center
    const dy = mouseY - (player.y + player.height / 2); // Adjust for player's center
    const angle = Math.atan2(dy, dx); // Calculate angle
    const damage = 20; // Projectile damage

    // Spawn projectile from the center of the player
    projectiles.push(
      new Projectile(
        player.x + player.width / 2, // Center X
        player.y + player.height / 2, // Center Y
        angle,
        damage
      )
    );
  }

  handleItemCollection(item, index) {
    droppedItems.forEach((item, index) => {
      if (
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y
      ) {
        item.applyEffect(player); // Apply item effect
        droppedItems.splice(index, 1); // Remove the item after collection
      }
    });
  }

  collisionDetection() {}*/
}
