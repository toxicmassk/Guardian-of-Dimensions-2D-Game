// Music Snippets //
const backgroundMusic = new Audio("Background_new.mp3");
backgroundMusic.volume = 0.5;

const shieldSound = new Audio("Shield.mp3");
shieldSound.volume = 0.5;

const winningScreenSound = new Audio("WinningScreen.mp3");
winningScreenSound.volume = 0.2;

const gameOverSound = new Audio("startScreen.pm3");
gameOverSound.volume = 0.5;

// Images Dimensions//
const backgroundImageGreen1 = new Image(); // starting Image
backgroundImageGreen1.src = "GreenNebula1.png";

const backgroundImageGreen2 = new Image(); // Image after 20 points
backgroundImageGreen2.src = "GreenNebula2.png";

const backgroundImageGreen3 = new Image(); // Image after 40 points
backgroundImageGreen3.src = "GreenNebula3.png";

const backgroundImageBlue1 = new Image(); // Image after 60 points
backgroundImageBlue1.src = "BlueNebula1.png";

const backgroundImageBlue2 = new Image(); // Image after 80 points
backgroundImageBlue2.src = "BlueNebula2.png";

const backgroundImageBlue3 = new Image(); // Image after 100 points
backgroundImageBlue3.src = "BlueNebula3.png";

const backgroundImagePurple1 = new Image(); // Image after 120 points
backgroundImagePurple1.src = "PurpleNebula1.png";

const backgroundImagePurple2 = new Image(); // Image after 140 points
backgroundImagePurple2.src = "PurpleNebula2.png";

const backgroundImagePurple3 = new Image(); // Image after 160 points
backgroundImagePurple3.src = "PurpleNebula3.png";

class Game {
  constructor(gameScreenElement, gameOverScreenElement, winningScreen) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    this.winningScreen = winningScreen;

    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();
  }

  // play music //
  playLevelMusic() {
    backgroundMusic.play();
    backgroundMusic.addEventListener(
      "ended",
      () => {
        this.currentTime = 0;
        backgroundMusic.play();
      },
      false
    );
  }

  reset() {
    this.player = new Player(this);
    this.obstacles = [];
    this.energies = [];

    this.score = 4;
    this.shieldEnergy = 0;

    this.frame = 0;

    this.playLevelMusic();
    winningScreenSound.pause();
    gameOverSound.pause();
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
          this.player.y = Math.max(this.player.y - 45, 0);
          break;
        case "ArrowDown":
          this.player.y = Math.min(
            this.player.y + 45,
            this.canvasElement.height - this.player.height
          );
          break;
        case "ArrowRight":
          this.player.x = Math.min(
            this.player.x + 45,
            this.canvasElement.width - this.player.width
          );
          break;
        case "ArrowLeft":
          this.player.x = Math.max(this.player.x - 45, 0);
          break;
        case "Space":
          this.fireShield();
          break;
      }
    });
  }

  fireShield() {
    if (this.shieldEnergy >= 5) {
      this.shieldEnergy = 0;
      this.player.shielded = true;
      setTimeout(() => {
        this.player.shielded = false;
        shieldSound.pause();
      }, 7000);
      shieldSound.play();
    }
  }

  possiblyAddObstacle() {
    const probabilityOfObstacleShowingUp = Math.min(this.frame / 150000, 0.01);

    if (Math.random() < probabilityOfObstacleShowingUp) {
      const obstacle = new Obstacle(this);
      this.obstacles.push(obstacle);
    }
  }

  possiblyAddEnergy() {
    const probabilityOfEnergyShowingUp = Math.min(this.frame / 150000, 0.01);
    if (Math.random() < probabilityOfEnergyShowingUp) {
      const energy = new Energy(this);
      this.energies.push(energy);
    }
  }

  runLogic() {
    this.possiblyAddObstacle();
    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
    }
    this.possiblyAddEnergy();
    for (const energy of this.energies) {
      energy.runLogic();
    }
    if (this.score <= 0) {
      this.lose();
    }
    if (this.score >= 100) {
      this.endGame();
    }
  }

  drawScore() {
    this.context.font = "32px Arial, Helvetica, sans-serif";
    this.context.fillStyle = "white";
    this.context.fillText("Score: " + this.score, 50, 70);
  }

  drawShieldEnergy() {
    this.context.font = "32px Arial, Helvetica, sans-serif";
    this.context.fillStyle = "white";
    this.context.fillText("Shield Energy: " + this.shieldEnergy, 50, 110);
  }

  draw() {
    // update frame //
    this.frame++;

    // clear canvas //
    this.context.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    // update background image //
    if (this.score > 0 && this.score < 10) {
      this.context.drawImage(backgroundImageGreen1, 0, 0);
    } else if (this.score >= 10 && this.score < 20) {
      this.context.drawImage(backgroundImageGreen2, 0, 0);
    } else if (this.score >= 20 && this.score < 30) {
      this.context.drawImage(backgroundImageGreen3, 0, 0);
    } else if (this.score >= 30 && this.score < 40) {
      this.context.drawImage(backgroundImageBlue1, 0, 0);
    } else if (this.score >= 40 && this.score < 50) {
      this.context.drawImage(backgroundImageBlue2, 0, 0);
    } else if (this.score >= 50 && this.score < 60) {
      this.context.drawImage(backgroundImageBlue3, 0, 0);
    } else if (this.score >= 60 && this.score < 70) {
      this.context.drawImage(backgroundImagePurple1, 0, 0);
    } else if (this.score >= 70 && this.score < 80) {
      this.context.drawImage(backgroundImagePurple1, 0, 0);
    } else if (this.score >= 80 && this.score < 90) {
      this.context.drawImage(backgroundImagePurple2, 0, 0);
    } else if (this.score >= 90 && this.score < 100) {
      this.context.drawImage(backgroundImagePurple3, 0, 0);
    }
    this.player.draw();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    for (const energy of this.energies) {
      energy.draw();
    }
    this.drawScore();
    this.drawShieldEnergy();
  }

  lose() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "";
    this.winningScreen.style.display = "none";
    clearInterval(this.intervalId);
    backgroundMusic.pause();
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

  endGame() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "none";
    this.winningScreen.style.display = "";
    clearInterval(this.intervalId);

    backgroundMusic.pause();
    winningScreenSound.play();
  }
}
