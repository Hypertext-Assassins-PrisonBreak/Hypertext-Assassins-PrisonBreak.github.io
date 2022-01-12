import Character from "./Character.js";

export default class Player extends Character {
  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate
   * @param ycoord y cordinate
   */
  public constructor(xcoord: number, ycoord: number) {
    super(xcoord, ycoord);
  }
}
