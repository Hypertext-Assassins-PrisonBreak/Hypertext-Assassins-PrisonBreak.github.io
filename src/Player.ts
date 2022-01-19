import Character from './Character.js';
import Level from './Level.js';

export default class Player extends Character {
  public xvector: number;

  public yvector: number;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate of Player
   * @param ycoord y cordinate of Player
   */
  public constructor(xcoord: number, ycoord: number) {
    super(xcoord, ycoord);
  }

  /**
   * Handles player movement that has happened since the last call
   *
   * @param movementControls Array of all directions in which player moves
   * @param tdt Time.DeltaTime
   * @returns True if player moved in this Frame
   */
  public processPlayerMovement(movementControls: Array<boolean>, tdt: number): boolean {
    this.xvector = 0;
    this.yvector = 0;
    // Read Key Presses
    if (movementControls[0]) {
      console.log('left');
      this.xvector += -1;
    }
    if (movementControls[1]) {
      console.log('up');
      this.yvector += -1;
    }
    if (movementControls[2]) {
      console.log('right');
      this.xvector += 1;
    }
    if (movementControls[3]) {
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

    // Changing Player Character coordinates if the new location is free
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
    for (let i = xcoord; i < xcoord + this.characterW; i++) {
      for (let j = ycoord; j < ycoord + this.characterH; j++) {
        const collisionTestedTileY = Math.floor(j / Level.tileH);
        const collisionTestedTileX = Math.floor(i / Level.tileW);
        if (Level.gameLevel[collisionTestedTileY][collisionTestedTileX] === 1) {
          isOnFreeSpot = false;
        }
      }
    }
    return isOnFreeSpot;
  }
}
