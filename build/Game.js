import Level from './Level.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
export default class Game {
    level;
    keyListener;
    player;
    canvasHTML;
    canvas;
    canvasContext;
    paths = [
        '../Assets/tile1.jpeg',
        '../Assets/tile2.jpeg',
        'https://ecrespo210.files.wordpress.com/2013/01/grass.png',
        'https://opengameart.org/sites/default/files/styles/medium/public/textureStone_0.png',
        '',
        '',
        '',
        '',
        '',
        '',
        '../Assets/spriteWalkLeft1.png',
        '../Assets/spriteWalkLeft2.png',
        '../Assets/spriteWalkUp1.png',
        '../Assets/spriteWalkUp2.png',
        '../Assets/spriteWalkRight1.png',
        '../Assets/spriteWalkRight2.png',
        '../Assets/spriteWalkDown1.png',
        '../Assets/spriteWalkDown2.png'
    ];
    assets = [];
    patterns = [];
    usedKeys = [
        KeyListener.KEY_A,
        KeyListener.KEY_W,
        KeyListener.KEY_D,
        KeyListener.KEY_S,
        KeyListener.KEY_LEFT,
        KeyListener.KEY_UP,
        KeyListener.KEY_RIGHT,
        KeyListener.KEY_DOWN
    ];
    controls = new Map();
    movementControls = [];
    currentSecond = 0;
    framesLastSecond = 0;
    frameCount = 0;
    lastUpdate = Date.now();
    flag = false;
    constructor(canvasHTML) {
        this.canvasHTML = canvasHTML;
        this.canvas = (this.canvasHTML);
        this.canvas.width = Level.levelW * Level.tileW;
        this.canvas.height = Level.levelH * Level.tileH;
        this.canvasContext = this.canvas.getContext('2d');
        for (let i = 0; i < this.paths.length; i++) {
            const image = new Image();
            image.src = this.paths[i];
            this.assets.push(image);
        }
        for (let i = 0; i < 2; i++) {
            const pattern = this.canvasContext.createPattern(this.assets[i], 'repeat');
            this.patterns.push(pattern);
        }
        this.keyListener = new KeyListener();
        this.player = new Player(100, 100);
        for (let i = 0; i < this.usedKeys.length; i++) {
            this.controls.set(this.usedKeys[i], false);
        }
    }
    gameLaunch() {
        this.renderLevel();
        requestAnimationFrame(() => this.renderFrame());
    }
    renderLevel() {
        for (let y = 0; y < Level.levelH; y++) {
            for (let x = 0; x < Level.levelW; x++) {
                this.renderLevelTile(x, y);
            }
        }
        console.log('works');
    }
    renderLevelTile(x, y) {
        this.canvasContext.drawImage(this.assets[Level.gameLevel[y][x]], x * Level.tileW, y * Level.tileH);
    }
    renderFrame() {
        this.processPlayerInput();
        if (this.player.processPlayerMovement(this.movementControls, this.calculateTimeDeltaTime())) {
            this.renderCharacter(this.player);
            if (this.frameCount % 20 === 0) {
                this.flag = !this.flag;
            }
        }
        this.renderFps(this.calculateFps());
        requestAnimationFrame(() => this.renderFrame());
    }
    processPlayerInput() {
        for (let i = 0; i < this.usedKeys.length; i++) {
            this.controls.set(this.usedKeys[i], this.keyListener.isKeyDown(this.usedKeys[i]));
        }
        for (let i = 0; i < 4; i++) {
            const primaryMovementInput = this.controls.get(this.usedKeys[i]);
            const secondaryMovementInput = this.controls.get(this.usedKeys[i + 4]);
            this.movementControls[i] = primaryMovementInput || secondaryMovementInput;
        }
    }
    renderCharacter(player) {
        this.characterClear(player);
        let walking = new Image();
        walking.src = '../Assets/spriteWalkDown1.png';
        if (player.xvector === -1) {
            walking = (this.flag ? this.assets[10] : this.assets[10 + 1]);
        }
        else if (player.xvector === 1) {
            walking = (this.flag ? this.assets[14] : this.assets[14 + 1]);
        }
        if (player.yvector === -1) {
            walking = (this.flag ? this.assets[12] : this.assets[12 + 1]);
        }
        else if (player.yvector === 1) {
            walking = (this.flag ? this.assets[16] : this.assets[16 + 1]);
        }
        this.canvasContext.drawImage(walking, player.xcoord, player.ycoord, player.characterW, player.characterH);
    }
    characterClear(player) {
        const clearingCornerTLx = player.xcoord - 10;
        const clearingCornerTLy = player.ycoord - 10;
        const clearingW = player.characterW + 20;
        const clearingH = player.characterH + 20;
        const clearingCornerBRx = clearingCornerTLx + clearingW;
        const clearingCornerBRy = clearingCornerTLy + clearingH;
        this.canvasContext.clearRect(clearingCornerTLx, clearingCornerTLy, clearingW, clearingH);
        for (let i = Math.floor(clearingCornerTLy / Level.tileH); i <= Math.floor(clearingCornerBRy / Level.tileH); i++) {
            for (let j = Math.floor(clearingCornerTLx / Level.tileW); j <= Math.floor(clearingCornerBRx / Level.tileW); j++) {
                this.renderLevelTile(j, i);
            }
        }
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