class Shield {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.radius = 70;
  }

  disappear() {
    const index = this.game.shields.indexOf(this);
    this.game.shields.splice(index, 1);
  }

  // runLogic() {}

  draw() {
    this.game.context.fillStyle = "clue";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
