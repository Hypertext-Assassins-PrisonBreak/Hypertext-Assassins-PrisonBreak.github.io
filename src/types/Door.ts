export default class Door {
  public tileX: number;

  public tileY: number;

  public orientationIsVertical: boolean;

  public isOpen: boolean;

  /**
   * Constructing a new instance of this class
   *
   * @param tileX
   * @param tileY
   * @param orientationIsVertical
   * @param isOpen
   */
  public constructor(tileX: number, tileY: number,
    orientationIsVertical: boolean, isOpen: boolean = false) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.orientationIsVertical = orientationIsVertical;
    this.isOpen = isOpen;
  }
}
