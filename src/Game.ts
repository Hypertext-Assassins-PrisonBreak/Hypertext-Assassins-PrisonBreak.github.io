import Level from './Level.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class Game {
  public level: Level;

  public keyListener: KeyListener;

  private player: Player;

  private canvasHTML: HTMLElement;

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  // Array of all Assets Paths (first ten reserved for Tile Textures)
  private paths: Array<string> = [
    '../Assets/tile1.jpeg',
    '../Assets/tile1.jpeg',
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
    '../Assets/spriteWalkDown2.png'];

  // Array of all Assets (first ten reserved for Tile Textures)
  private assets: Array<HTMLImageElement> = [];

  private patterns: Array<CanvasPattern> = [];

  // Array of all used key codes
  private usedKeys: Array<number> = [
    KeyListener.KEY_A,
    KeyListener.KEY_W,
    KeyListener.KEY_D,
    KeyListener.KEY_S,
    KeyListener.KEY_LEFT,
    KeyListener.KEY_UP,
    KeyListener.KEY_RIGHT,
    KeyListener.KEY_DOWN];

  // Map of all pressed keycodes
  private controls: Map<number, boolean> = new Map();

  // Array of all directions in which player moves (0 - west, 1 - north, 2 - east, 3 - south)
  private movementControls: Array<boolean> = [];

  private currentSecond = 0;

  private framesLastSecond = 0;

  private frameCount = 0;

  private lastUpdate = Date.now();

  private flag: boolean = false;

  /**
   * Constructing a new instance of this class
   *
   * @param canvasHTML The HTML Canvas Element
   */
  public constructor(canvasHTML: HTMLElement) {
    this.canvasHTML = canvasHTML;
    this.canvas = <HTMLCanvasElement>(this.canvasHTML);
    this.canvas.width = Level.levelW * Level.tileW;
    this.canvas.height = Level.levelH * Level.tileH;
    this.canvasContext = this.canvas.getContext('2d');

    for (let i = 0; i < this.paths.length; i++) {
      const image: HTMLImageElement = new Image();
      image.src = this.paths[i];
      this.assets.push(image);
    }

    for (let i = 0; i < 2; i++) {
      const pattern: CanvasPattern = this.canvasContext.createPattern(this.assets[i], 'repeat');
      this.patterns.push(pattern);
    }

    this.keyListener = new KeyListener();
    this.player = new Player(100, 100);

    for (let i = 0; i < this.usedKeys.length; i++) {
      this.controls.set(this.usedKeys[i], false);
    }
  }

  /**
   * Game Launch
   */
  public gameLaunch(): void {
    this.renderLevel();
    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Rendering Level
   */
  public renderLevel(): void {
    // runs array and displays it on level
    for (let y = 0; y < Level.levelH; y++) {
      for (let x = 0; x < Level.levelW; x++) {
        this.renderLevelTile(x, y);
      }
    }
    console.log('works');
  }

  /**
   * Rendering a Level Tile
   *
   * @param x x cordinate of Tile
   * @param y y cordinate of Tile
   */
  public renderLevelTile(x: number, y: number): void {
    // this.canvasContext.fillStyle = this.patterns[Level.gameLevel[y][x]];
    // this.canvasContext.fillRect(x * Level.tileW, y * Level.tileH, Level.tileW, Level.tileH);
    /**
     * this.canvasContext.drawImage(this.assets[Level.gameLevel[y][x]],
      x * Level.tileW, y * Level.tileH);
     */
    this.canvasContext.fillStyle = (Level.gameLevel[y][x] ? '#555555' : '#005500');
    this.canvasContext.fillRect(x * Level.tileW, y * Level.tileH, Level.tileW, Level.tileH);
  }

  /**
   * Rendering of a Frame
   */
  public renderFrame(): void {
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

  /**
   * Processing Player Input
   */
  public processPlayerInput(): void {
    for (let i = 0; i < this.usedKeys.length; i++) {
      this.controls.set(this.usedKeys[i], this.keyListener.isKeyDown(this.usedKeys[i]));
    }
    for (let i = 0; i < 4; i++) {
      const primaryMovementInput: boolean = this.controls.get(this.usedKeys[i]);
      const secondaryMovementInput: boolean = this.controls.get(this.usedKeys[i + 4]);
      this.movementControls[i] = primaryMovementInput || secondaryMovementInput;
    }
  }

  /**
   * Rendering Player
   *
   * @param player Player
   */
  public renderCharacter(player: Player): void {
    this.characterClear(player);
    let walking = new Image();

    walking.src = '../Assets/spriteWalkDown1.png';
    if (player.xvector === -1) {
      walking = (this.flag ? this.assets[10] : this.assets[10 + 1]);
    } else if (player.xvector === 1) {
      walking = (this.flag ? this.assets[14] : this.assets[14 + 1]);
    }

    if (player.yvector === -1) {
      walking = (this.flag ? this.assets[12] : this.assets[12 + 1]);
    } else if (player.yvector === 1) {
      walking = (this.flag ? this.assets[16] : this.assets[16 + 1]);
    }

    this.canvasContext.drawImage(walking, player.xcoord, player.ycoord,
      player.characterW, player.characterH);
  }

  /**
   * Clearing the Player form Canvas
   *
   * @param player Player
   */
  public characterClear(player: Player): void {
    const clearingCornerTLx: number = player.xcoord - 10;
    const clearingCornerTLy: number = player.ycoord - 10;
    const clearingW = player.characterW + 20;
    const clearingH = player.characterH + 20;
    const clearingCornerBRx: number = clearingCornerTLx + clearingW;
    const clearingCornerBRy: number = clearingCornerTLy + clearingH;

    this.canvasContext.clearRect(clearingCornerTLx, clearingCornerTLy, clearingW, clearingH);

    for (let i = Math.floor(clearingCornerTLy / Level.tileH);
      i <= Math.floor(clearingCornerBRy / Level.tileH); i++) {
      for (let j = Math.floor(clearingCornerTLx / Level.tileW);
        j <= Math.floor(clearingCornerBRx / Level.tileW); j++) {
        this.renderLevelTile(j, i);
      }
    }
  }

  /**
   * Calculating Time.DeltaTime
   *
   * @returns Time.DeltaTime
   */
  public calculateTimeDeltaTime(): number {
    const now = Date.now();
    const dt = now - this.lastUpdate;
    this.lastUpdate = now;

    console.log(dt / 1000);
    return dt / 1000;
  }

  /**
   * Calculating Frames Per Second
   *
   * @returns Frames Per Second
   */
  public calculateFps(): number {
    // calculates fps
    const msec = Math.floor(Date.now() / 1000);
    if (msec !== this.currentSecond) {
      this.currentSecond = msec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    } else { this.frameCount += 1; }

    console.log(this.framesLastSecond);
    return this.framesLastSecond;
  }

  /**
   * Rendering Frames Per Second
   *
   * @param fps Frames Per Second
   */
  public renderFps(fps: number): void {
    this.canvasContext.font = 'bold 10pt sans-serif';
    this.canvasContext.clearRect(0, 0, 100, 30);
    this.canvasContext.fillStyle = '#ff0000';
    this.canvasContext.fillText(`FPS: ${fps}`, 10, 20);
  }
}
