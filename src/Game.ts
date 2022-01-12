import Map from './Map.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class Game {
  public map: Map;

  public keyListener: KeyListener;

  private player : Player;

  private canvas: HTMLCanvasElement;

  private canvasContext : CanvasRenderingContext2D;

  private currentSecond = 0;

  private framesLastSecond = 0;

  private frameCount = 0;

  private lastUpdate = Date.now();

  /**
   * Constructing a new instance of this class
   *
   * @param canvas the Canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;
    this.canvas.width = 24 * 50;
    this.canvas.height = 11 * 50;
  }

  /**
   * Game Launch
   */
  public gameLaunch(): void {
    this.map = new Map(this.getCanvasContext());
    this.keyListener = new KeyListener();
    this.player = new Player(100, 100, this.keyListener, this.map);

    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Rendering of a Frame
   */
  public renderFrame(): void {
    this.getCanvasContext();
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.renderMap(this.getCanvasContext());
    this.renderFps(this.calculateFps());
    this.player.processPlayerMovement(this.calculateTimeDeltaTime());
    this.player.renderCharacter(this.getCanvasContext());
    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Getting the Canvas Context
   *
   * @returns Canvas Context
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
}
