const introScreenElement = document.getElementById('intro-screen');
const gameScreenElement = document.getElementById('game-screen');
const gameOverScreenElement = document.getElementById('game-over-screen');

const startButton = introScreenElement.querySelector('button');
const playAgainButton = gameOverScreenElement.querySelector('button');



const game = new Game(gameScreenElement, gameOverScreenElement);

startButton.addEventListener('click', () => {
    game.start();
  
    introScreenElement.style.display = 'none';
    gameScreenElement.style.display = '';
  });
  
  playAgainButton.addEventListener('click', () => {
    game.start();
  
    gameOverScreenElement.style.display = 'none';
    gameScreenElement.style.display = '';
  });