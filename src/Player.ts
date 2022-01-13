import Character from './Character.js';
import KeyListener from './KeyListener.js';
import Map from './Map.js';

export default class Player extends Character {
  public keyListener: KeyListener;

  private xvector: number;

  private yvector: number;

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
    this.xvector = 0;
    this.yvector = 0;
    // Read Key Presses
    if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
      || this.keyListener.isKeyDown(KeyListener.KEY_A))
      && true) {
      console.log('left');
      this.xvector += -1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_UP)
      || this.keyListener.isKeyDown(KeyListener.KEY_W))
      && true) {
      console.log('up');
      this.yvector += -1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
      || this.keyListener.isKeyDown(KeyListener.KEY_D))
      && true) {
      console.log('right');
      this.xvector += 1;
    }
    if ((this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
      || this.keyListener.isKeyDown(KeyListener.KEY_S))
      && true) {
      console.log('down');
      this.yvector += 1;
    }
    let dx: number = this.xvector;
    let dy: number = this.yvector;

    if (this.xvector !== 0 && this.yvector !== 0) {
      dx /= Math.sqrt(2);
      dy /= Math.sqrt(2);
    }
    const newxcoord: number = this.xcoord + dx * tdt * 250;
    const newycoord: number = this.ycoord + dy * tdt * 250;
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

  /**
   * Rendering Player
   *
   * @param canvasContext the Canvas Context to render with
   */
  public renderCharacter(canvasContext: CanvasRenderingContext2D, flag: boolean): void {
    this.characterClear(canvasContext);
    const walking = new Image();

    walking.src = '../Assets/spriteWalkDown1.png';
    if (this.xvector === -1) {
      walking.src = '../Assets/spriteWalkLeft1.png';
      if (flag) {
        walking.src = '../Assets/spriteWalkLeft2.png';
      }
    } else if (this.xvector === 1) {
      walking.src = '../Assets/spriteWalkRight1.png';
      if (flag) {
        walking.src = '../Assets/spriteWalkRight2.png';
      }
    }

    if (this.yvector === -1) {
      walking.src = '../Assets/spriteWalkUp1.png';
      if (flag) {
        walking.src = '../Assets/spriteWalkUp2.png';
      }
    } else if (this.yvector === 1) {
      walking.src = '../Assets/spriteWalkDown1.png';
      if (flag) {
        walking.src = '../Assets/spriteWalkDown2.png';
      }
    }

    canvasContext.drawImage(walking, this.xcoord, this.ycoord,
      this.collisionW, this.collisionH);
  }
}
