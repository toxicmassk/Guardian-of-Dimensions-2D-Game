class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;

    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();

    this.reset();
  }

  reset() {
    this.player = new Player(this);
    this.obstacles = [];
    this.shields = [];

    this.score = 4;

    this.frame = 0;
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
        case "Space":
          this.fireShield;
          break;
      }
    });
  }

  fireShield() {
    const shield = new Shield(
      this,
      this.player.x + this.player.width,
      this.player.y + this.player.height
    );
    this.shields.push(shield);
  }

  possiblyAddObstacle() {
    // 5% probability for adding
    if (Math.random() < 0.005) {
      const obstacle = new Obstacle(this);
      this.obstacles.push(obstacle);
    }
  }

  runLogic() {
    this.possiblyAddObstacle();
    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
    }
    for (const shield of this.shields) {
      shield.runLogic();
    }
    if (this.score <= 0) {
      this.lose();
    }
  }

  drawScore() {
    this.context.font = "32px sans-terif";
    this.context.fillStyle = "black";
    this.context.fillText(this.score, 20, 30);
  }

  draw() {
    this.frame++;

    this.context.clearRect(0, 0, 1000, 800);

    this.player.draw();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    for (const shield of this.shields) {
      shield.draw();
    }
    this.drawScore();
  }

  lose() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "";
    clearInterval(this.intervalId);
  }

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / 60);
  }

  loop() {
    this.runLogic();
    this.draw();
  }
}
