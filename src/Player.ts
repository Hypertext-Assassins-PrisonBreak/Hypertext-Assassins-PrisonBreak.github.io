import Character from './Character.js';
import KeyListener from './KeyListener.js';

export default class Player extends Character {
  public keyListener: KeyListener;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate
   * @param ycoord y cordinate
   * @param keyListener KeyListener instance
   */
  public constructor(xcoord: number, ycoord: number, keyListener: KeyListener) {
    super(xcoord, ycoord);
    this.keyListener = keyListener;
  }

  /**
   * Handles player movement input that has happened since the last call
   *
   * @param tdt Time.DeltaTime
   */
  public processPlayerMovement(tdt: number): void {
    let xvector: number = 0;
    let yvector: number = 0;
    // Read Key Presses
    if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
      || this.keyListener.isKeyDown(KeyListener.KEY_A))
      && true) {
      console.log('left');
      xvector += -1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_UP)
      || this.keyListener.isKeyDown(KeyListener.KEY_W))
      && true) {
      console.log('up');
      yvector += -1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
      || this.keyListener.isKeyDown(KeyListener.KEY_D))
      && true) {
      console.log('right');
      xvector += 1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
      || this.keyListener.isKeyDown(KeyListener.KEY_S))
      && true) {
      console.log('down');
      yvector += 1;
    }
    this.xcoord += xvector * tdt * 250;
    this.ycoord += yvector * tdt * 250;
  }
}
