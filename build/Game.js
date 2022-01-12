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
        this.canvas.width = Map.mapW * Map.tileW;
        this.canvas.height = Map.mapH * Map.tileH;
    }
    gameLaunch() {
        this.map = new Map(this.getCanvasContext());
        this.keyListener = new KeyListener();
        this.player = new Player(100, 100, this.keyListener);
        requestAnimationFrame(() => this.renderFrame());
    }
    renderFrame() {
        this.getCanvasContext();
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.renderMap(this.getCanvasContext());
        this.renderFps(this.calculateFps());
        this.player.processPlayerMovement(this.calculateTimeDeltaTime());
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
}
//# sourceMappingURL=Game.js.map