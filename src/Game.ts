import Map from './Map.js';

export default class Game {
  private map: Map;

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
    this.canvas.width = window.innerWidth - 1;
    this.canvas.height = window.innerHeight - 4;
  }

  /**
   * Game launch
   */
  public gamelaunch(): void {
    this.map = new Map(this.canvas, this.canvasContext);

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


  public fps(): void {
    let now = Date.now();
    let dt = now - this.lastUpdate;
    this.lastUpdate = now;

    console.log(dt / 1000);

    // calculates fps
    const msec = Math.floor(Date.now() / 1000);
    if (msec !== this.currentSecond) {
      this.currentSecond = msec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    } else { this.frameCount += 1; }

    console.log(this.frameCount);
  }

  /**
   * Rendering of a frame
   */
  public renderFrame(): void {
    this.getCanvasContext();
    this.map.renderMap();
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.font = 'bold 10pt sans-serif';
    this.canvasContext.fillStyle = '#ff0000';
    this.canvasContext.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);
    this.fps();

    requestAnimationFrame(() => this.renderFrame());
  }
}
