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
        this.canvas.width = 24 * 50;
        this.canvas.height = 11 * 50;
    }
    gameLaunch() {
        this.map = new Map(this.canvas);
        this.keyListener = new KeyListener();
        this.player = new Player(100, 100, this.keyListener, this.map);
        this.map.renderMap(this.getCanvasContext());
        requestAnimationFrame(() => this.renderFrame());
    }
    renderFrame() {
        this.player.processPlayerMovement(this.calculateTimeDeltaTime());
        if (this.player.processPlayerMovement(this.calculateTimeDeltaTime())) {
            this.player.renderCharacter(this.getCanvasContext());
        }
        this.renderFps(this.calculateFps());
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
        console.log(this.framesLastSecond);
        return this.framesLastSecond;
    }
    renderFps(fps) {
        this.canvasContext.font = 'bold 10pt sans-serif';
        this.canvasContext.clearRect(0, 0, 100, 30);
        this.canvasContext.fillStyle = '#ff0000';
        this.canvasContext.fillText(`FPS: ${fps}`, 10, 20);
    }
}
//# sourceMappingURL=Game.js.map