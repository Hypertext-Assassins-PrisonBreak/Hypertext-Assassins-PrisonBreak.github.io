import Map from './Map.js';

export default class Game {
  private map: Map;

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.map = new Map(canvas);
  }
}
