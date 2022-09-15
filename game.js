// Music Snippets //
const backgroundMusic = new Audio("backgroundSound.mp3");
backgroundMusic.volume = 0.2;

const shieldSound = new Audio("shieldSound.mp3");
shieldSound.volume = 0.5;

const energy1Sound = new Audio ("energyball1.mp3");
energy1Sound.volume = 0.5;

const energy2Sound = new Audio ("energyball2.mp3");
energy2Sound.volume = 0.5;

const energy3Sound = new Audio ("energyball3.mp3");
energy3Sound.volume = 0.5;

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
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
          this.player.y = Math.max(this.player.y - 27, 0);
          break;
        case "ArrowDown":
          this.player.y = Math.min(
            this.player.y + 27,
            this.canvasElement.height - this.player.height
          );
          break;
        case "ArrowRight":
          this.player.x = Math.min(
            this.player.x + 27,
            this.canvasElement.width - this.player.width
          );
          break;
        case "ArrowLeft":
          this.player.x = Math.max(this.player.x - 27, 0);
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
      }, 5000);
      shieldSound.play();
    }
  }

  possiblyAddObstacle() {
    // 5% probability for adding
    /*if (this.game.score < 10) {
     if (Math.random() < 0.005) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 20) {
      if (Math.random() < 0.01) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 30) {
      if (Math.random() < 0.015) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 40) {
      if (Math.random() < 0.02) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 50) {
      if (Math.random() < 0.025) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 60) {
      if (Math.random() < 0.03) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 70) {
      if (Math.random() < 0.035) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 80) {
      if (Math.random() < 0.04) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 90) {
      if (Math.random() < 0.045) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else if (this.game.score < 100) {
      if (Math.random() < 0.05) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } else {
      if (Math.random() < 0.055) {
        const obstacle = new Obstacle(this);
        this.obstacles.push(obstacle);
    } */

    const probabilityOfObstacleShowingUp = Math.min(this.frame / 150000, 0.02);

    if (Math.random() < probabilityOfObstacleShowingUp) {
      const obstacle = new Obstacle(this);
      this.obstacles.push(obstacle);
    }
  }

  // if (Math.random() < 0.005) {
  // const obstacle = new Obstacle(this);
  // this.obstacles.push(obstacle)

  possiblyAddEnergy() {
    if (Math.random() < 0.005) {
      const energy = new Energy(this);
      this.energies.push(energy);
    }
  }

  /*checkBoundariesOfScreen() {
    if ((this.x + this.width) >= this.game.canvas.width) {
      this.x = this.game.canvas.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }
  } */

  runLogic() {
    this.possiblyAddObstacle();
    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
    }
    /*
    for (const shield of this.shields) {
      shield.runLogic();
    }
    */
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
    /*
    for (const shield of this.shields) {
      shield.draw();
    }
    */
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
  }
}
