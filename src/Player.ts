import Character from './Character.js';
import KeyListener from './KeyListener.js';
import Map from './Map.js';

export default class Player extends Character {
  public keyListener: KeyListener;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate of Player
   * @param ycoord y cordinate of Player
   * @param keyListener KeyListener instance
   * @param map Map instance
   */
  public constructor(xcoord: number, ycoord: number, keyListener: KeyListener, map: Map) {
    super(xcoord, ycoord, map);
    this.keyListener = keyListener;
  }

  /**
   * Handles player movement input that has happened since the last call
   *
   * @param tdt Time.DeltaTime
   * @returns True if player moved in this Frame
   */
  public processPlayerMovement(tdt: number): boolean {
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
    if (xvector !== 0 && yvector !== 0) {
      xvector /= Math.sqrt(2);
      yvector /= Math.sqrt(2);
    }
    const newxcoord: number = this.xcoord + xvector * tdt * 250;
    const newycoord: number = this.ycoord + yvector * tdt * 250;
    if (this.playerCollisionCheck(newxcoord, newycoord)) {
      this.xcoord = newxcoord;
      this.ycoord = newycoord;
      return true;
    }
    if (this.playerCollisionCheck(newxcoord, this.ycoord)) {
      this.xcoord = newxcoord;
      return true;
    }
    if (this.playerCollisionCheck(this.xcoord, newycoord)) {
      this.ycoord = newycoord;
      return true;
    }
    return false;
  }

  /**
   * Collision check for Player Collision Box
   *
   * @param xcoord x cordinate of Player
   * @param ycoord y cordinate of Player
   * @returns True is Player stands on free spot
   */
  public playerCollisionCheck(xcoord: number, ycoord: number): boolean {
    let isOnFreeSpot: boolean = true;
    for (let i = xcoord; i < xcoord + this.collisionW; i++) {
      for (let j = ycoord; j < ycoord + this.collisionH; j++) {
        if (this.map.gameMap[Math.floor(j / this.map.tileH)][Math.floor(i / this.map.tileW)]
          === 1) {
          isOnFreeSpot = false;
        }
      }
    }
    return isOnFreeSpot;
  }
}
