const obstacleImage = new Image();
obstacleImage.src = "obstaclesDark.png"; // 384 x 256

class Obstacle {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * 400;
    this.y = 0;
    this.width = 60;
    this.height = 60;
    if (this.game.score < 10) {
      this.speed = Math.random() + 0.9;
    } else if (this.game.score < 20) {
      this.speed = Math.random() + 1.3;
    } else if (this.game.score < 30) {
      this.speed = Math.random() + 1.9;
    } else if (this.game.score < 40) {
      this.speed = Math.random() + 2.3;
    } else if (this.game.score < 50) {
      this.speed = Math.random() + 2.7;
    } else if (this.game.score < 60) {
      this.speed = Math.random() + 3.1;
    } else if (this.game.score < 70) {
      this.speed = Math.random() + 3.5;
    } else if (this.game.score < 80) {
      this.speed = Math.random() + 3.9;
    } else if (this.game.score < 90) {
      this.speed = Math.random() + 4.3;
    } else if (this.game.score < 100) {
      this.speed = Math.random() + 4.7;
    } else {
      this.speed = Math.random() + 5.1;
    }
  }

  checkForIntersection(item) {
    return (
      this.x + this.width > item.x &&
      this.x < item.x + item.width &&
      this.y + this.height > item.y &&
      this.y < item.y + item.height
    );
  }

  disappear() {
    const index = this.game.obstacles.indexOf(this);
    this.game.obstacles.splice(index, 1);
  }

  runLogic() {
    this.y += this.speed;

    const isIntersectingWithPlayer = this.checkForIntersection(
      this.game.player
    );

    const isIntersectingWithEdgeOfScreen = this.y > 800;

    if (isIntersectingWithPlayer) {
      this.game.score -= 1;
      this.disappear();

      //this.disappear();
      //if (isIntersectingWithEdgeOfScreen) {
      // this.disappear();
      //}
    }
    for (const shield of this.game.shields) {
      const isIntersectingWithShield = this.checkForIntersection(shield);
      if (isIntersectingWithShield) {
        this.disappear();
        shield.disappear();
        this.game.score += 1;
      }
    }
  }

  draw() {
    // this.game.context.fillStyle = "blue";
    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      obstacleImage,
      128 * (Math.floor(this.game.frame / 14) % 8),
      0,
      128,
      128,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
