export default class Map {
  public readonly tileW = 50;

  public readonly tileH = 50;

  public readonly mapW = 24;

  public readonly mapH = 11;

  private img : HTMLImageElement;

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

  public canvasContext : CanvasRenderingContext2D;

  /**
   * Constructing a new instance of this class
   *
   * @param canvas the Canvas to render on
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvasContext = canvas.getContext('2d');
  }

  /**
   * Rendering Map
   *
   * @param canvasContext the Canvas Context to draw with
   */
  public renderMap(canvasContext: CanvasRenderingContext2D): void {
    // runs array and displays it on map
    for (let y = 0; y < this.mapH; y++) {
      for (let x = 0; x < this.mapW; x++) {
        this.renderMapTile(canvasContext, x, y);
      }
    }
    console.log('works');
  }

  /**
   * Rendering a Map Tile
   *
   * @param canvasContext the Canvas Context to draw with
   * @param x x cordinate of Tile
   * @param y y cordinate of Tile
   */
  public renderMapTile(canvasContext: CanvasRenderingContext2D, x: number, y: number): void {
    const img1 = new Image();
    img1.src = 'https://opengameart.org/sites/default/files/styles/medium/public/textureStone_0.png';
    const img2 = new Image();
    img2.src = 'https://ecrespo210.files.wordpress.com/2013/01/grass.png';
    const pattern = canvasContext.createPattern(img1, 'repeat');
    const pattern2 = canvasContext.createPattern(img2, 'repeat');

    switch (this.gameMap[y][x]) {
      case 1:
        canvasContext.fillStyle = pattern;
        break;
      default:
        canvasContext.fillStyle = pattern2;
    }
    canvasContext.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
  }
}
