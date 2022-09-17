// energy Images //
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

const energyImageList = [
  energy1GreenImage,
  energy1PurpleImage,
  energy1yellowImage,
  energy2GreenImage,
  energy2PurpleImage,
  energy2yellowImage,
  energy3GreenImage,
  energy3PurpleImage,
  energy3yellowImage,
];

// energy Sounds //

const energy1Sound = new Audio("energyball1.mp3");
energy1Sound.volume = 0.5;

const energy2Sound = new Audio("energyball2.mp3");
energy2Sound.volume = 0.5;

const energy3Sound = new Audio("energyball3.mp3");
energy3Sound.volume = 0.5;

const energySoundList = [
  energy1Sound,
  energy2Sound,
  energy3Sound
];

class Energy {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * this.game.canvasElement.width - 160;
    this.y = -160;
    this.width = 160;
    this.height = 160;
    this.speed = Math.random() + 0.7 + this.game.frame / 1000;
    this.image =
    energyImageList[Math.floor(energyImageList.length * Math.random())];
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

    if (isIntersectingWithPlayer2) {
      this.game.score += 2;
      energy1Sound.play();
      this.disappear();

      if (
        this.image === energy1PurpleImage ||
        this.image === energy2PurpleImage ||
        this.image === energy3PurpleImage
      ) {
        this.game.shieldEnergy = Math.min(this.game.shieldEnergy + 1, 6);
      }
    }
  }

  draw() {
    this.game.context.drawImage(
      this.image,
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
