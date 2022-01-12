import Map from './Map.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
export default class Game {
    map;
    keyListener;
    player;
    canvas;
    canvasContext;
    currentSecond = 0;
    framesLastSecond = 0;
    frameCount = 0;
    lastUpdate = Date.now();
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth - 1;
        this.canvas.height = window.innerHeight - 4;
    }
    gamelaunch() {
        this.map = new Map(this.canvas, this.canvasContext);
        this.keyListener = new KeyListener();
        this.player = new Player(100, 100);
        requestAnimationFrame(() => this.renderFrame());
    }
    renderFrame() {
        this.getCanvasContext();
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.renderMap(this.getCanvasContext());
        this.renderFps(this.calculateFps());
        this.calculateTimeDeltaTime();
        this.processInput();
        this.player.renderCharacter(this.getCanvasContext());
        requestAnimationFrame(() => this.renderFrame());
    }
    getCanvasContext() {
        this.canvasContext = this.canvas.getContext('2d');
        return this.canvasContext;
    }
    calculateTimeDeltaTime() {
        const now = Date.now();
        const dt = now - this.lastUpdate;
        this.lastUpdate = now;
        console.log(dt / 1000);
        return dt / 1000;
    }
    calculateFps() {
        const msec = Math.floor(Date.now() / 1000);
        if (msec !== this.currentSecond) {
            this.currentSecond = msec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        }
        else {
            this.frameCount += 1;
        }
        console.log(this.frameCount);
        return this.framesLastSecond;
    }
    renderFps(fps) {
        this.canvasContext.font = 'bold 10pt sans-serif';
        this.canvasContext.fillStyle = '#ff0000';
        this.canvasContext.fillText(`FPS: ${fps}`, 10, 20);
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && true) {
            console.log('left');
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && true) {
            console.log('up');
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && true) {
            console.log('right');
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN) && true) {
            console.log('down');
        }
    }
}
//# sourceMappingURL=Game.js.map