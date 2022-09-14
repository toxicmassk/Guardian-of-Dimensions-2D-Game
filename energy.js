const energy1GreenImage = new Image();
energy1GreenImage.src = "energy1green.png";

const energy1PurpleImage = new Image();
energy1PurpleImage.src = "energy1purple.png";

const energy1yellowImage = new Image();
energy1yellowImage.src = "energy1yellow.png";

const energy2GreenImage = new Image();
energy2GreenImage.src = "energy2green.png";

const energy2PurpleImage = new Image();
energy2PurpleImage.src = "energy2purple.png";

const energy2yellowImage = new Image();
energy2yellowImage.src = "energy2yellow.png";

const energy3GreenImage = new Image();
energy3GreenImage.src = "energy3green.png";

const energy3PurpleImage = new Image();
energy3PurpleImage.src = "energy3purple.png";

const energy3yellowImage = new Image();
energy3yellowImage.src = "energy3yellow.png";

const energyball1Music = new Audio("./MP3/energyball1.mp3");

const energyball2Music = new Audio("./MP3/energyball2.mp3");

const energyball3Music = new Audio("./MP3/energyball3.mp3");

class Energy {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * 400;
    this.y = 0;
    this.width = 140;
    this.height = 140;
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

  checkForIntersection(item2) {
    return (
      this.x + this.width > item2.x &&
      this.x < item2.x + item2.width &&
      this.y + this.height > item2.y &&
      this.y < item2.y + item2.height
    );
  }
  disappear() {
    const index = this.game.energies.indexOf(this);
    this.game.energies.splice(index, 1);
  }
  runLogic() {
    this.y += this.speed;

    const isIntersectingWithPlayer2 = this.checkForIntersection(
      this.game.player
    );

    //console.log(isIntersectingWithPlayer2);//

    // const isIntersectingWithEdgeOfScreen = this.y > 800;

    if (isIntersectingWithPlayer2) {
      this.game.score += 1;
      this.disappear();

      //this.disappear();
      //if (isIntersectingWithEdgeOfScreen) {
      // this.disappear();
      //}
    }
    for (const shield of this.game.shields) {
      const isIntersectingWithShield2 = this.checkForIntersection(shield);
      if (isIntersectingWithShield2) {
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
      energy1GreenImage,
      192 * (Math.floor(this.game.frame / 14) % 5),
      0,
      192,
      192,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
