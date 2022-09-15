const obstacleImage = new Image();
obstacleImage.src = "obstaclesDark.png"; // 384 x 256

class Obstacle {
  constructor(game) {
    this.game = game;
    /*
    if (this.game.score < 10) {
      this.x = Math.random() * 300;
    } else if (this.game.score < 20) {
      this.x = Math.random() * 400;
    } else if (this.game.score < 30) {
      this.x = Math.random() * 400;
    } else if (this.game.score < 40) {
      this.x = Math.random() * 300;
    } else if (this.game.score < 50) {
      this.x = Math.random() * 200;
    } else if (this.game.score < 60) {
      this.x = Math.random() * 200;
    } else if (this.game.score < 70) {
      this.x = Math.random() * 200;
    } else if (this.game.score < 80) {
      this.x = Math.random() * 100;
    } else if (this.game.score < 90) {
      this.x = Math.random() * 50;
    } else if (this.game.score < 100) {
      this.x = Math.random() * 40;
    } else {
      this.x = Math.random() * 30;
    }
    */
    this.x = Math.random() * this.game.canvasElement.width;
    //this.x = Math.random() * 400;
    this.y = -60;
    this.width = 60;
    this.height = 60;
    // this.speed = Math.random() + 1.5;
    // this.speed = Math.random() + 0.5 + this.game.score / 10;
    this.speed = Math.random() + 0.5 + this.game.frame / 2000;

    /*
    if (this.game.score < 10) {
      this.speed = Math.random() + 1.5;
    } else if (this.game.score < 20) {
      this.speed = Math.random() + 2.5;
    } else if (this.game.score < 30) {
      this.speed = Math.random() + 3.5;
    } else if (this.game.score < 40) {
      this.speed = Math.random() + 4.5;
    } else if (this.game.score < 50) {
      this.speed = Math.random() + 5.5;
    } else if (this.game.score < 60) {
      this.speed = Math.random() + 6.5;
    } else if (this.game.score < 70) {
      this.speed = Math.random() + 7.5;
    } else if (this.game.score < 80) {
      this.speed = Math.random() + 8.5;
    } else if (this.game.score < 90) {
      this.speed = Math.random() + 9.5;
    } else if (this.game.score < 100) {
      this.speed = Math.random() + 10.5;
    } else {
      this.speed = Math.random() + 11.5;
    }
    */
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

    const isIntersectingWithEdgeOfScreen =
      this.y > this.game.canvasElement.height;

    if (isIntersectingWithPlayer) {
      if (this.game.player.shielded === false) {
        this.game.score -= 2;
      }

      this.disappear();

      if (isIntersectingWithEdgeOfScreen) {
        this.disappear();
      }
    }

    /*
    for (const shield of this.game.shields) {
      const isIntersectingWithShield = this.checkForIntersection(shield);
      if (isIntersectingWithShield) {
        this.disappear();
        shield.disappear();
        this.game.score += 2;
      }
    }
    */
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
