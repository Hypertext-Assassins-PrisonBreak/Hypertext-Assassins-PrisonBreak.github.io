import Scene from './Scene.js';

export default class Game {

  private scene: Scene;
  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.scene = new Scene(canvas);
  }
}
