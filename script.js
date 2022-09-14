const introScreenElement = document.getElementById("intro-screen");
const gameScreenElement = document.getElementById("game-screen");
const gameOverScreenElement = document.getElementById("game-over-screen");
const winningScreen = document.getElementById("winning-screen");

const startButton = introScreenElement.querySelector("button");
const playAgainButton = gameOverScreenElement.querySelector("button");
const playAgainButton2 = winningScreen.querySelector("button");

const game = new Game(gameScreenElement, gameOverScreenElement, winningScreen);

startButton.addEventListener("click", () => {
  game.start();

  introScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
  winningScreen.style.display = "none";
});

playAgainButton.addEventListener("click", () => {
  game.start();

  gameOverScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
  winningScreen.style.display = "none";
});

playAgainButton2.addEventListener("click", () => {
  game.start();
  
  gameOverScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
  winningScreen.style.display = "none";
})
