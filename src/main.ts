import Game from './Game.js';

console.log('Javascript is working!');

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', async () => {
  console.log('Handling the Load event');

  const game = new Game(document.getElementById('canvas'));
  // Create a promise within the listener for a small timeout, this will allow images to load before the rendering
  await new Promise((r) => setTimeout(r, 50));
  game.gameLaunch();
  return true;
});
