export default class Character {
  public xcoord: number;

  public ycoord: number;

  public characterW: number = 40;

  public characterH: number = 40;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate of Character
   * @param ycoord y cordinate of Character
   */
  public constructor(xcoord: number, ycoord: number) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
  }
}
