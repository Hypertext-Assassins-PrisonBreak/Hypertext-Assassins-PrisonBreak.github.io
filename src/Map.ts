export default class Map {
  public readonly tileW = 50;

  public readonly tileH = 50;

  public readonly mapW = 24;

  public readonly mapH = 11;

  public readonly gameMap:Array<Array<number>> = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  private canvasContext : CanvasRenderingContext2D;

  /**
   * Constructing a new instance of this class
   *
   * @param canvasContext the Canvas Context to render with
   */
  public constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
  }

  /**
   * Draws the game to the canvas
   *
   * @param canvasContext the Canvas Context to draw with
   */
  public renderMap(canvasContext: CanvasRenderingContext2D): void {
    // runs array and displays it on map
    for (let x = 0; x < this.mapW; x++) {
      for (let y = 0; y < this.mapH; y++) {
        switch (this.gameMap[y][x]) {
          case 1:
            canvasContext.fillStyle = '#999999';
            break;
          default:
            canvasContext.fillStyle = '#EEEEEE';
        }
        canvasContext.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
      }
    }
    console.log('works');
  }
}
