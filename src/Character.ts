export default class Character {
  public xcoord: number;

  public ycoord: number;

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
   * creates chracter
   *
   * @param canvasContext character context
   */
  public renderCharacter(canvasContext: CanvasRenderingContext2D): void {
    canvasContext.fillRect(this.xcoord, this.ycoord, 20, 20);
  }
}
