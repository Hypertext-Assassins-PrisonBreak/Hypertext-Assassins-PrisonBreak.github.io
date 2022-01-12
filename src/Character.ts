export default class Character {
  private xcoord: number;

  private ycoord: number;



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
