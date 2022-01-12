import Game from './Game.js';
console.log('Javascript is working!');
window.addEventListener('load', () => {
    console.log('Handling the Load event');
    const game = new Game(document.getElementById('canvas'));
    game.gameLaunch();
    return true;
});
//# sourceMappingURL=main.js.map