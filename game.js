class Game {
  constructor() {
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.player = new Player(this);

    this.obstacles = [
      new Obsctale(this),
      new Obsctale(this),
      new Obsctale(this),
    ];

    this.enableControls();
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
          this.player.y -= 10;
          break;
        case "ArrowDown":
          this.player.y += 10;
          break;
        case "ArrowRight":
          this.player.x += 10;
          break;
        case "ArrowLeft":
          this.player.x -= 10;
          break;
      }
    });
  }

  possiblyAddObstacles() {
    // 5% probability for adding
    if (Math.random() < 0.05) {
      const obstacle = new Obstacle(this);
      this.obstacle.push(obstacle);
    }
  }

  runLogic() {
    this.possiblyAddObstacles();

    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
    }
  }

  draw() {
    this.context.clearRect(0, 0, 1000, 800);

    this.player.draw();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
  }

  loop() {
    setInterval(() => {
      this.runLogic();
      this.draw();
    }, 1000 / 60);
  }
}
