const playerGuardianImage1 = new Image();
playerGuardianImage1.src = "guardianBlue.png"; // 896 × 64

const playerGuardianImage2 = new Image();
playerGuardianImage2.src = "guardianMagenta.png";

const playerGuardianImage3 = new Image();
playerGuardianImage3.src = "guardianRed.png";

const life0 = new Image();
life0.src = "0life.png";

const life1 = new Image();
life1.src = "1life.png";

const life2 = new Image();
life2.src = "2life.png";

const life3 = new Image();
life3.src = "3life.png";

const life4 = new Image();
life4.src = "4life.png";

// width 960
// height 576
// rows 3
// columns 5
// item width 960 / 5 = 192
// item height 576 / 3 = 192
const shieldImage = new Image();
shieldImage.src = "shield.png";

class Player {
  constructor(game) {
    this.game = game;
    this.x = 500;
    this.y = 711;
    this.width = 64;
    this.height = 64;
    this.shielded = false;
  }

  drawShield () {
    this.game.context.drawImage(
        shieldImage,
        192 * (Math.floor(this.game.frame / 3) % 5),
        0,
        192,
        192,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width * 2,
        this.height * 2
    );
  }

  draw() {
    //this.game.context.fillStyle = 'purple'
    //this.game.context.fillRect(this.x, this.y, this.width, this.height);

    if (this.shielded) {
        this.drawShield();
    }

    this.game.context.drawImage(
      playerGuardianImage1,
      64 * (Math.floor(this.game.frame / 3) % 14),
      0,
      64,
      64,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.shielded) {
        this.game.context.save();

        this.game.context.globalAlpha = 0.2;
        this.drawShield();

        this.game.context.restore();
    }
  }
}
