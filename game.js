const backgroundMusic = new Audio("./MP3/backgroundSound.mp3");

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

const endGameImage1 = new Image (); // Image 1 Endgame
endGameImage1.src = "endGame1.png";

const endGameImage2 = new Image (); // Image 2 Endgame
endGameImage2.src = "endGame2.png";

const endGameImage3 = new Image (); // Image 3 Endgame
endGameImage3.src = "endGame3.png";

const endGameImage4 = new Image (); // Image 4 Endgame
endGameImage4.src = "endGame4.png";

class Game {
  constructor(gameScreenElement, gameOverScreenElement, winningScreen) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    this.winningScreen = winningScreen;

    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();

    this.reset();
  }

  levelMusic() {
    // ### Play level music theme ###
    backgroundMusic.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
    backgroundMusic.play();
  }

  reset() {
    this.player = new Player(this);
    this.obstacles = [];
    this.shields = [];
    this.energies = [];

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

  possiblyAddEnergy() {
    if (Math.random() < 0.005) {
      const energy = new Energy(this);
      this.energies.push(energy);
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
    this.possiblyAddEnergy();
    for (const energy of this.energies) {
      energy.runLogic();
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
    } else if (this.score === 100) {
      this.endGame();
    }
    this.player.draw();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    for (const shield of this.shields) {
      shield.draw();
    }
    for (const energy of this.energies) {
      energy.draw();
    }
    this.drawScore();
  }

  lose() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "";
    this.winningScreen.style.display = "none";
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

  endGame() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "none";
    this.winningScreen.style.display = "";
    clearInterval(this.intervalId);
  }
}
