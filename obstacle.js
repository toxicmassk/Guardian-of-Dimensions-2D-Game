class Obstacle {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * 400;
    this.y = 0;
    this.width = 37;
    this.height = 33;
    this.speed = Math.random() + 0.5;
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

    console.log(isIntersectingWithPlayer);

    const isIntersectingWithEdgeOfScreen = this.y > 800;

    if (isIntersectingWithPlayer) {
      this.game.player.x += 50;
      this.game.score -= 1;

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
    this.game.context.fillStyle = "blue";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
