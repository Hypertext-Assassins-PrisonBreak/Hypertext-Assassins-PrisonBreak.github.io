import Levels from './data/Levels.js';
import Questions from './data/Questions.js';
import Interactables from './data/Interactables.js';
import KeyListener from './KeyListener.js';
import Player from './types/Player.js';
import Interactable from './types/Interactable.js';
import Question from './types/Question.js';

export default class Game {
  public keyListener: KeyListener;

  private player: Player;

  private canvasHTML: HTMLElement;

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  // Map of all Assets Paths
  private paths: Map<string, string> = new Map<string, string>([
    ['tile0', '../Assets/tile1.jpeg'],
    ['tile1', '../Assets/tile2.jpeg'],
    ['player00', '../Assets/playerWalkLeft1.png'],
    ['player01', '../Assets/playerWalkLeft2.png'],
    ['player10', '../Assets/playerWalkUp1.png'],
    ['player11', '../Assets/playerWalkUp2.png'],
    ['player20', '../Assets/playerWalkRight1.png'],
    ['player21', '../Assets/playerWalkRight2.png'],
    ['player30', '../Assets/playerWalkDown1.png'],
    ['player31', '../Assets/playerWalkDown2.png'],
    ['interactableWestAdjacent', '../Assets/pc_side_left.png'],
    ['interactableNorthAdjacent', '../Assets/pc_front1.png'],
    ['interactableEastAdjacent', '../Assets/pc_side_right.png']]);

  // Map of all Assets
  private assets: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();

  // Map of all keycodes and their states
  private controls: Map<number, boolean> = new Map<number, boolean>([
    [KeyListener.KEY_A, false],
    [KeyListener.KEY_W, false],
    [KeyListener.KEY_D, false],
    [KeyListener.KEY_S, false],
    [KeyListener.KEY_LEFT, false],
    [KeyListener.KEY_UP, false],
    [KeyListener.KEY_RIGHT, false],
    [KeyListener.KEY_DOWN, false],
    [KeyListener.KEY_SPACE, false],
    [KeyListener.KEY_ENTER, false],
    [KeyListener.KEY_ESC, false]]);

  // Array of all directions in which player moves (0 - west, 1 - north, 2 - east, 3 - south)
  private movementControls: Array<boolean> = [];

  // Interactable that player interacts with
  private interactedObject: Interactable;

  private currentSecond: number = 0;

  private framesLastSecond: number = 0;

  private frameCount: number = 0;

  private lastUpdate: number = Date.now();

  // Current Image of Player Character
  private playerCharacterImage: HTMLImageElement;

  // True if the Player Character stands on the other foot
  private flag: boolean = false;

  // Current Game state
  private gameState: number = 0;

  // The Pop-up percentage size in relation to Canvas Size
  private popupRenderProgress: number = 0;

  private popopCenterX: number;

  private popopCenterY: number;

  private popupCornerTLX: number;

  private popupCornerTLY: number;

  private popupCornerBRX: number;

  private popupCornerBRY: number;

  private popupContentRendered: boolean = false;

  // Index of the current Question
  private interactables: Interactables = new Interactables();

  // Current text display language (en for English and nl for Dutch)
  private language: string = 'en';

  /**
   * Constructing a new instance of this class
   *
   * @param canvasHTML The HTML Canvas Element
   */
  public constructor(canvasHTML: HTMLElement) {
    this.canvasHTML = canvasHTML;
    this.canvas = <HTMLCanvasElement>(this.canvasHTML);
    this.canvas.width = Levels.levelW * Levels.tileW;
    this.canvas.height = Levels.levelH * Levels.tileH;
    this.canvasContext = this.canvas.getContext('2d');

    this.paths.forEach((path: string, id: string) => {
      const image: HTMLImageElement = new Image();
      image.src = path;
      this.assets.set(id, image);
    });

    this.playerCharacterImage = this.assets.get('player30');

    this.keyListener = new KeyListener();
    this.player = new Player(100, 100);
  }

  /**
   * Game Launch
   */
  public gameLaunch(): void {
    this.gameState = 0;
    this.renderLevel();
    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Rendering Level
   */
  public renderLevel(): void {
    // runs array and displays it on level
    for (let y = 0; y < Levels.levelH; y++) {
      for (let x = 0; x < Levels.levelW; x++) {
        this.renderLevelTile(x, y);
      }
    }
  }

  /**
   * Rendering a Level Tile
   *
   * @param x x cordinate of Tile
   * @param y y cordinate of Tile
   */
  public renderLevelTile(x: number, y: number): void {
    // Rendering Tile
    const tileId: number = Levels.gameLevels.get('level0')[y][x];
    const tileImage: HTMLImageElement = this.assets.get(`tile${Number(tileId / 10 - 1)}`);
    this.canvasContext.drawImage(tileImage, x * Levels.tileW, y * Levels.tileH);

    // Checking if Tile has Interactable
    let ifIntereactableTile: boolean = false;
    this.interactables.interactables.forEach((interactable: Interactable, id: string) => {
      ifIntereactableTile ||= interactable.tileX === x && interactable.tileY === y;
    });

    // Rendering Interactable
    if (ifIntereactableTile) {
      let westAdjacent: boolean = false;
      let northAdjacent: boolean = false;
      let eastAdjacent: boolean = false;
      if (x > 0) {
        const westernTileId: number = Levels.gameLevels.get('level0')[y][x - 1];
        westAdjacent = westernTileId >= 20;
      }
      if (y > 0) {
        const northenTileId: number = Levels.gameLevels.get('level0')[y - 1][x];
        northAdjacent = northenTileId >= 20;
      }
      if (x < Levels.levelW) {
        const easternTileId: number = Levels.gameLevels.get('level0')[y][x + 1];
        eastAdjacent = easternTileId >= 20;
      }

      let interactableImage: HTMLImageElement;

      if (westAdjacent) {
        interactableImage = this.assets.get('interactableWestAdjacent');
      }
      if (northAdjacent) {
        interactableImage = this.assets.get('interactableNorthAdjacent');
      }
      if (eastAdjacent) {
        interactableImage = this.assets.get('interactableEastAdjacent');
      }

      this.canvasContext.drawImage(interactableImage, x * Levels.tileW, y * Levels.tileH);
    }
  }

  /**
   * Rendering of a Frame
   */
  public renderFrame(): void {
    if (this.gameState === 0) {
      this.processPlayerInput();
      if (this.player.processPlayerMovement(this.movementControls, this.calculateTimeDeltaTime())) {
        this.renderCharacter(this.player);
        if (this.frameCount % 20 === 0) {
          this.flag = !this.flag;
        }
      }
    }

    if (this.gameState === 1) {
      this.renderPopupOpening();
    }

    if (this.gameState === 2) {
      if (!this.popupContentRendered) {
        this.renderPopupContent();
        this.popupContentRendered = true;
      }
      this.processPlayerInput();
    }

    if (this.gameState === 3) {
      this.popupContentRendered = false;
      this.renderPopupClosing();
    }

    this.renderFps(this.calculateFps());
    this.calculateTimeDeltaTime();
    requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Processing Player Input
   */
  public processPlayerInput(): void {
    this.movementControls.fill(false);
    this.controls.forEach((state: boolean, keycode: number) => {
      this.controls.set(keycode, this.keyListener.isKeyDown(keycode));

      // Input of Regular Game State
      if (this.gameState === 0) {
        if (keycode === KeyListener.KEY_A || keycode === KeyListener.KEY_LEFT) {
          this.movementControls[0] ||= state;
        }
        if (keycode === KeyListener.KEY_W || keycode === KeyListener.KEY_UP) {
          this.movementControls[1] ||= state;
        }
        if (keycode === KeyListener.KEY_D || keycode === KeyListener.KEY_RIGHT) {
          this.movementControls[2] ||= state;
        }
        if (keycode === KeyListener.KEY_S || keycode === KeyListener.KEY_DOWN) {
          this.movementControls[3] ||= state;
        }
        // Processing Player Interaction Input
        if (state && (keycode === KeyListener.KEY_SPACE || keycode === KeyListener.KEY_ENTER)) {
          this.interact();
        }
      }
      if (this.gameState === 2) {
        if (state && keycode === KeyListener.KEY_ESC) {
          this.gameState = 3;
        }
      }
    });
  }

  /**
   * Processing Player interaction
   */
  public interact(): void {
    const interactedObjectID: string = this.player.playerInteractCheck(this.interactables);
    this.interactedObject = this.interactables.interactables.get(interactedObjectID);
    if (typeof this.interactedObject !== 'undefined') {
      this.gameState = 1;
    }
  }

  /**
   * Rendering of Popup opening
   */
  public renderPopupOpening(): void {
    this.recalculatePopupDimensions();
    this.renderPopupFrame();

    if (this.popupRenderProgress < 60) {
      this.popupRenderProgress += this.calculateTimeDeltaTime() * 80;
    } else {
      this.popupRenderProgress = 60;
      this.gameState = 2;
    }
  }

  /**
   * Rendering of Popup closing
   */
  public renderPopupClosing(): void {
    this.renderLevel();
    this.renderCharacter(this.player);

    this.recalculatePopupDimensions();
    this.renderPopupFrame();

    if (this.popupRenderProgress > 0) {
      this.popupRenderProgress -= this.calculateTimeDeltaTime() * 80;
    } else {
      this.canvasContext.clearRect(this.popopCenterX - 20, this.popopCenterY - 20, 40, 40);
      this.renderLevel();
      this.popupRenderProgress = 0;
      this.gameState = 0;
    }
  }

  /**
   * Rendering of Popup Content
   */
  public renderPopupContent(): void {
    console.log(this.interactedObject.questionsEN[0]);
    this.canvasContext.font = '20px "Lucida Console", sans-serif';
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.fillStyle = '#55ff55';
    const currentInteractable: Interactable = this.interactedObject;
    const currentAnsweredQuestions: number = currentInteractable.answeredQuestions;
    let currentQuestion: Question;
    if (this.language === 'en') {
      currentQuestion = currentInteractable.questionsEN[currentAnsweredQuestions];
    }
    if (this.language === 'nl') {
      currentQuestion = currentInteractable.questionsNL[currentAnsweredQuestions];
    }

    this.canvasContext.fillText(currentQuestion.question,
      this.popupCornerTLX + 50, this.popupCornerTLY + 50,
      this.popupCornerBRX - this.popupCornerTLX + 100);
  }

  /**
   * Recalculating the Popup dimensions
   */
  public recalculatePopupDimensions(): void {
    this.popopCenterX = this.canvas.width / 2;
    this.popopCenterY = this.canvas.height / 2;
    this.popupCornerTLX = this.popopCenterX - (this.popupRenderProgress / 100) * this.popopCenterX;
    this.popupCornerTLY = this.popopCenterY - (this.popupRenderProgress / 100) * this.popopCenterY;
    this.popupCornerBRX = (this.popupRenderProgress / 100) * this.canvas.width;
    this.popupCornerBRY = (this.popupRenderProgress / 100) * this.canvas.height;
  }

  /**
   * Rendering Popup frame
   */
  public renderPopupFrame(): void {
    this.canvasContext.fillStyle = '#000000';
    this.canvasContext.fillRect(this.popupCornerTLX, this.popupCornerTLY,
      this.popupCornerBRX, this.popupCornerBRY);

    this.canvasContext.strokeStyle = '#555555';
    this.canvasContext.lineWidth = 15;
    this.canvasContext.strokeRect(this.popupCornerTLX - 1, this.popupCornerTLY - 1,
      this.popupCornerBRX + 1, this.popupCornerBRY + 1);
  }

  /**
   * Rendering Player
   *
   * @param player Player
   */
  public renderCharacter(player: Player): void {
    this.characterClear(player);

    if (player.yvector === 1) {
      this.playerCharacterImage = this.assets.get(`player3${this.flag ? '0' : '1'}`);
    }

    if (player.xvector === -1) {
      this.playerCharacterImage = this.assets.get(`player0${this.flag ? '0' : '1'}`);
    } else if (player.xvector === 1) {
      this.playerCharacterImage = this.assets.get(`player2${this.flag ? '0' : '1'}`);
    }

    if (player.yvector === -1) {
      this.playerCharacterImage = this.assets.get(`player1${this.flag ? '0' : '1'}`);
    }

    this.canvasContext.drawImage(this.playerCharacterImage, player.xcoord, player.ycoord,
      player.characterW, player.characterH);
  }

  /**
   * Clearing the Player form Canvas
   *
   * @param player Player
   */
  public characterClear(player: Player): void {
    const clearingCornerTLx: number = player.xcoord - 10;
    const clearingCornerTLy: number = player.ycoord - 10;
    const clearingW = player.characterW + 20;
    const clearingH = player.characterH + 20;
    const clearingCornerBRx: number = clearingCornerTLx + clearingW;
    const clearingCornerBRy: number = clearingCornerTLy + clearingH;

    this.canvasContext.clearRect(clearingCornerTLx, clearingCornerTLy, clearingW, clearingH);

    for (let i = Math.floor(clearingCornerTLy / Levels.tileH);
      i <= Math.floor(clearingCornerBRy / Levels.tileH); i++) {
      for (let j = Math.floor(clearingCornerTLx / Levels.tileW);
        j <= Math.floor(clearingCornerBRx / Levels.tileW); j++) {
        this.renderLevelTile(j, i);
      }
    }
  }

  /**
   * Calculating Time.DeltaTime
   *
   * @returns Time.DeltaTime
   */
  public calculateTimeDeltaTime(): number {
    const now = Date.now();
    const dt = now - this.lastUpdate;
    this.lastUpdate = now;
    return dt / 1000;
  }

  /**
   * Calculating Frames Per Second
   *
   * @returns Frames Per Second
   */
  public calculateFps(): number {
    // calculates fps
    const msec = Math.floor(Date.now() / 1000);
    if (msec !== this.currentSecond) {
      this.currentSecond = msec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    } else { this.frameCount += 1; }
    return this.framesLastSecond;
  }

  /**
   * Rendering Frames Per Second
   *
   * @param fps Frames Per Second
   */
  public renderFps(fps: number): void {
    this.canvasContext.font = 'bold 10pt sans-serif';
    this.canvasContext.textBaseline = 'alphabetic';
    this.canvasContext.clearRect(0, 0, 75, 30);
    this.canvasContext.fillStyle = '#ff0000';
    this.canvasContext.fillText(`FPS: ${fps}`, 10, 20);
  }
}
