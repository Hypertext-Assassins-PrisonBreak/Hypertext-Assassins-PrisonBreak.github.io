export default class Character {
  public xcoord: number;

  public ycoord: number;

  public collisionW: number = 40;

  public collisionH: number = 40;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate
   * @param ycoord y cordinate
   */
  public constructor(xcoord: number, ycoord: number) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
  }

  /**
   * Rendering Chracter
   *
   * @param canvasContext the Canvas Context to render with
   */
  public renderCharacter(canvasContext: CanvasRenderingContext2D): void {
    canvasContext.fillRect(this.xcoord, this.ycoord, this.collisionW, this.collisionH);
  }
}
