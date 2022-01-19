import Game from './Game.js';

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', async () => {
  const game = new Game(document.getElementById('canvas'));
  // Creating a promise within the listener for loading images before rendering
  await new Promise((r) => setTimeout(r, 50));
  game.gameLaunch();
  return true;
});
