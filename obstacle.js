const obstacleImage = new Image();
obstacleImage.src = "obstaclesDark.png";

const obstacleImageLight = new Image();
obstacleImageLight.src = "obstaclesLight.png"; // 384 x 256

const obstacleImageList = [
  obstacleImage,
  obstacleImageLight
];

class Obstacle {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * this.game.canvasElement.width -70;
    this.y = -70;
    this.width = 70;
    this.height = 70;
    this.speed = Math.random() + 0.5 + this.game.frame / 2000;
    this.image =
    obstacleImageList[Math.floor(obstacleImageList.length * Math.random())];
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
  }

  draw() {
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
