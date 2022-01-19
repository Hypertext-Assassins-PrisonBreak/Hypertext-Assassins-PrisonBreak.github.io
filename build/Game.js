import Level from './Level.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Question from './Question';
export default class Game {
    level;
    keyListener;
    player;
    canvasHTML;
    canvas;
    canvasContext;
    paths = new Map([
        ['tile0', '../Assets/tile1.jpeg'],
        ['tile1', '../Assets/tile2.jpeg'],
        ['player00', '../Assets/playerWalkLeft1.png'],
        ['player01', '../Assets/playerWalkLeft2.png'],
        ['player10', '../Assets/playerWalkUp1.png'],
        ['player11', '../Assets/playerWalkUp2.png'],
        ['player20', '../Assets/playerWalkRight1.png'],
        ['player21', '../Assets/playerWalkRight2.png'],
        ['player30', '../Assets/playerWalkDown1.png'],
        ['player31', '../Assets/playerWalkDown2.png']
    ]);
    assets = new Map();
    questions = new Map([
        ['1,3', [new Question('What should you do when you see "click this link to get free toys"?', ['Do not click that link.', 'Click on the link to get free toys.', 'Check the authenticity of the link first and then click on the page.'], 0, 'Correct', 'Wrong', 'Most of these sites are deceptive, and even a very reliable site with similar information is likely to make you pay extra, and you need to ignore these links when you see them.')]],
        ['4,1', [new Question('I am online and I got a message from my Internet service provider asking for my password. They say they need it to fix my account. Should I give it to them?', ['Yes.', 'No.'], 1, 'Correct', 'Wrong', 'Internet service providers would never ask you for a password. You should never share your Internet password to anyone (even your best friends) other than your parents.')]],
        ['4,3', [new Question('Who should you accept friend requests from online?', ['Anyone.', 'A friend of a friend.', 'Only from people you definitely know.'], 2, 'Correct', 'Wrong', 'You should only accept a friend request from people who you definitely know. Never accept friend requests from strangers or anybody you are unsure of.')]]
    ]);
    interactables = [];
    controls = new Map([
        [KeyListener.KEY_A, false],
        [KeyListener.KEY_W, false],
        [KeyListener.KEY_D, false],
        [KeyListener.KEY_S, false],
        [KeyListener.KEY_LEFT, false],
        [KeyListener.KEY_UP, false],
        [KeyListener.KEY_RIGHT, false],
        [KeyListener.KEY_DOWN, false]
    ]);
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
        this.paths.forEach((path, id) => {
            const image = new Image();
            image.src = path;
            this.assets.set(id, image);
        });
        this.keyListener = new KeyListener();
        this.player = new Player(100, 100);
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
    }
    renderLevelTile(x, y) {
        const tileId = this.assets.get(`tile${Number(Level.gameLevel[y][x])}`);
        this.canvasContext.drawImage(tileId, x * Level.tileW, y * Level.tileH);
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
        this.movementControls.fill(false);
        let counter = 0;
        this.controls.forEach((state, keycode) => {
            this.controls.set(keycode, this.keyListener.isKeyDown(keycode));
            this.movementControls[counter] ||= state;
            counter += 1;
            if (counter >= 4) {
                counter = 0;
            }
        });
    }
    renderCharacter(player) {
        this.characterClear(player);
        let walking = new Image();
        walking = this.assets.get('player30');
        if (player.xvector === -1) {
            walking = this.assets.get(`player0${this.flag ? '0' : '1'}`);
        }
        else if (player.xvector === 1) {
            walking = this.assets.get(`player2${this.flag ? '0' : '1'}`);
        }
        if (player.yvector === -1) {
            walking = this.assets.get(`player1${this.flag ? '0' : '1'}`);
        }
        else if (player.yvector === 1) {
            walking = this.assets.get(`player3${this.flag ? '0' : '1'}`);
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