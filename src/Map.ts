export default class Map {
  private static readonly ballCount = 2;

  private canvas: HTMLCanvasElement;

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth - 1;
    this.canvas.height = window.innerHeight - 4;
  }

  /**
   * Draws the game to the canvas
   */
  public render(): void {
    // draw: the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
