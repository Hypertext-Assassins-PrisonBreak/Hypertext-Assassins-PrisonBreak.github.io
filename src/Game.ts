import Map from './Map.js';
import KeyListener from './KeyListener.js';
import Character from './Character.js';
import Player from './Player.js';

export default class Game {
  private map: Map;

  private keyListener: KeyListener;

  private player : Player;

  private canvas: HTMLCanvasElement;

  private canvasContext : CanvasRenderingContext2D;

  private currentSecond = 0;

  private framesLastSecond = 0;

  private frameCount = 0;

  private lastUpdate = Date.now();

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;
    this.canvas.width = Map.mapW * Map.tileW;
    this.canvas.height = Map.mapH * Map.tileH;
  }

  /**
   * Game launch
   */
  public gamelaunch(): void {
    this.map = new Map(this.getCanvasContext());
    this.keyListener = new KeyListener();
    this.player = new Player(100, 100);

    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Rendering of a frame
   */
  public renderFrame(): void {
    this.getCanvasContext();
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.renderMap(this.getCanvasContext());
    this.renderFps(this.calculateFps());
    this.processPlayerInput();
    this.player.renderCharacter(this.getCanvasContext());
    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * get canvas context
   *
   * @returns Context of the Canvas
   */
  public getCanvasContext(): CanvasRenderingContext2D {
    this.canvasContext = this.canvas.getContext('2d');
    return this.canvasContext;
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

    console.log(this.frameCount);
    return this.framesLastSecond;
  }

  /**
   * Rendering Frames Per Second
   *
   * @param fps Frames Per Second
   */
  public renderFps(fps: number): void {
    this.canvasContext.font = 'bold 10pt sans-serif';
    this.canvasContext.fillStyle = '#ff0000';
    this.canvasContext.fillText(`FPS: ${fps}`, 10, 20);
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processPlayerInput(): void {
    let xvector: number = 0;
    let yvector: number = 0;
    // Read Key Presses
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && true) {
      console.log('left');
      xvector += -1;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && true) {
      console.log('up');
      yvector += -1;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && true) {
      console.log('right');
      xvector += 1;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN) && true) {
      console.log('down');
      yvector += 1;
    }
    const tdt: number = this.calculateTimeDeltaTime();
    this.player.xcoord += xvector * tdt * 100;
    this.player.ycoord += yvector * tdt * 100;
  }
}
