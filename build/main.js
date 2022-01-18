import Game from './Game.js';
console.log('Javascript is working!');
window.addEventListener('load', async () => {
    console.log('Handling the Load event');
    const game = new Game(document.getElementById('canvas'));
    await new Promise((r) => setTimeout(r, 50));
    game.gameLaunch();
    return true;
});
//# sourceMappingURL=main.js.map