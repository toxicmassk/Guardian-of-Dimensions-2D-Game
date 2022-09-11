class Obsctale {
    constructor (game) {
        this.game = game;
        this.x = Math.random() * 1000;
        this.y = 0;
        this.width = 37;
        this.height = 33;
        this.speed = Math.random() + 0.5;
    }

    runLogic () {
        this.y += this.speed;
    }

    draw () {
        this.game.context.fillStyle = 'blue'
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
}