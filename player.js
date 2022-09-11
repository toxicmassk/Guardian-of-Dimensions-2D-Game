class Player {
    constructor (game) {
        this.game = game;
        this.x = 500;
        this.y = 742;
        this.width = 63;
        this.height = 58;
    }

    draw () {
        this.game.context.fillStyle = 'purple'
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
}