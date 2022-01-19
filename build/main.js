import Game from './Game.js';
window.addEventListener('load', async () => {
    const game = new Game(document.getElementById('canvas'));
    await new Promise((r) => setTimeout(r, 50));
    game.gameLaunch();
    return true;
});
//# sourceMappingURL=main.js.map