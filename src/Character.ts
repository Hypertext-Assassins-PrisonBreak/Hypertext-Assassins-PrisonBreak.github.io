import Map from './Map.js';

export default class Character {
  public xcoord: number;

  public ycoord: number;

  public collisionW: number = 40;

  public collisionH: number = 40;

  public map: Map;

  /**
   * Constructing a new instance of this class
   *
   * @param xcoord x cordinate of Character
   * @param ycoord y cordinate of Character
   * @param map Map instance
   */
  public constructor(xcoord: number, ycoord: number, map: Map) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.map = map;
  }

  /**
   * Rendering Chracter
   *
   * @param canvasContext the Canvas Context to render with
   */
  public renderCharacter(canvasContext: CanvasRenderingContext2D): void {
    this.characterClear(canvasContext);
    canvasContext.fillStyle = '#ff0000';
    canvasContext.fillRect(this.xcoord, this.ycoord, this.collisionW, this.collisionH);
  }

  /**
   * Clearing the Character form Canvas
   *
   * @param canvasContext the Canvas Context to render with
   */
  public characterClear(canvasContext: CanvasRenderingContext2D): void {
    const clearingCornerTLx: number = this.xcoord - 10;
    const clearingCornerTLy: number = this.ycoord - 10;
    const clearingW = this.collisionW + 20;
    const clearingH = this.collisionH + 20;
    const clearingCornerBRx: number = this.xcoord + clearingW;
    const clearingCornerBRy: number = this.ycoord + clearingH;

    canvasContext.clearRect(clearingCornerTLx, clearingCornerTLy, clearingW, clearingH);

    // Rerendering Tiles beneath cleared Character
    /*
    this.map.renderMapTile(canvasContext,
      Math.floor(clearingCornerTLx / this.map.tileW),
      Math.floor(clearingCornerTLy / this.map.tileH));

    this.map.renderMapTile(canvasContext,
      Math.floor(clearingCornerBRx / this.map.tileW),
      Math.floor(clearingCornerTLy / this.map.tileH));

    this.map.renderMapTile(canvasContext,
      Math.floor(clearingCornerTLx / this.map.tileW),
      Math.floor(clearingCornerBRy / this.map.tileH));

    this.map.renderMapTile(canvasContext,
      Math.floor(clearingCornerBRx / this.map.tileW),
      Math.floor(clearingCornerBRy / this.map.tileH));
    */
    for (let i = Math.floor(clearingCornerTLy / this.map.tileH);
      i <= Math.floor(clearingCornerBRy / this.map.tileH); i++) {
      for (let j = Math.floor(clearingCornerTLx / this.map.tileW);
        j <= Math.floor(clearingCornerBRx / this.map.tileW); j++) {
        this.map.renderMapTile(canvasContext, j, i);
      }
    }
  }
}
