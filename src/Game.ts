import Levels from './data/Levels.js';
import Questions from './data/Questions.js';
import Interactables from './data/Interactables.js';
import KeyListener from './KeyListener.js';
import Player from './types/Player.js';
import Interactable from './types/Interactable.js';
import Question from './types/Question.js';
import Door from './types/Door.js';

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
    ['interactableEastAdjacent', '../Assets/pc_side_right.png'],
    ['doorH', '../Assets/door_horizontally.png'],
    ['doorV', '../Assets/door_vertically.png'],
    ['doorHO', '../Assets/door_horizontally_open.png'],
    ['doorVO', '../Assets/door_vertically_open.png'],
    ['startScreen', '../Assets/startScreen.jpg'],
    ['endScreen', '../Assets/Endscreen.jpg']]);

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
    [KeyListener.KEY_ESC, false],
    [KeyListener.KEY_E, false]]);

  // Array of all directions in which player moves (0 - west, 1 - north, 2 - east, 3 - south)
  private movementControls: Array<boolean> = [];

  private currentSecond: number = 0;

  private framesLastSecond: number = 0;

  private frameCount: number = 0;

  private lastUpdate: number = Date.now();

  // Current Image of Player Character
  private playerCharacterImage: HTMLImageElement;

  // True if the Player Character stands on the other foot
  private flag: boolean = false;

  // Current Game state
  private gameState: number = 10;

  // The Pop-up percentage size in relation to Canvas Size
  private popupRenderProgress: number = 0;

  private popopCenterX: number;

  private popopCenterY: number;

  private popupCornerTLX: number;

  private popupCornerTLY: number;

  private popupCornerBRX: number;

  private popupCornerBRY: number;

  private popupContentRendered: boolean = false;

  // Instance containing a map of all Interactables
  private interactables: Interactables = new Interactables();

  // ID of Interactable that player interacts with in Interactables map
  private interactedObjectID: string;

  // Interactable that player interacts with
  private interactedObject: Interactable;

  // Current text display language (en for English and nl for Dutch)
  private language: string = 'en';

  private selectedMenuOption: number = 0;

  // Array of all selection menu options
  private menuOptions: Array<string> = [];

  // The time in frames the Player has to wait before changing selection
  private selectionChangeCooldown: number = 0;

  // Index of the currently rendered in Popup Question with Interactables map
  private currentlyRenderedQuestionIndex: number = 0;

  // Instance of the currently rendered Question
  private currentQuestion: Question;

  // Player score
  private score: number = 1000;

  // Section Clear time
  private sectionClearTime: number = 100;

  private firstLevelRender: boolean = false;

  private firstStartScreenRender: boolean = false;

  private firstEndScreenRender: boolean = false;

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

    // Checking if Tile has Door
    let ifTileIsDoor: boolean = false;
    let doorInTile: Door;
    this.interactables.interactables.forEach((interactable: Interactable, id: string) => {
      for (let i = 0; i < interactable.doors.length; i++) {
        const ifSameTile: boolean = interactable.doors[i].tileX === x
          && interactable.doors[i].tileY === y;
        ifTileIsDoor ||= ifSameTile;
        if (ifSameTile) {
          doorInTile = interactable.doors[i];
        }
      }
    });

    // Rendering Door
    if (ifTileIsDoor) {
      const doorImageID = `door${doorInTile.orientationIsVertical ? 'V' : 'H'}${doorInTile.isOpen ? 'O' : ''}`;
      const doorImage: HTMLImageElement = this.assets.get(doorImageID);
      this.canvasContext.drawImage(doorImage, x * Levels.tileW, y * Levels.tileH);
    }

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
    if (this.selectionChangeCooldown > 0) {
      this.selectionChangeCooldown -= 1;
    }
    if (this.score > 0 && this.gameState < 10) {
      this.score -= 0.02;
    }
    if (this.score < 0) {
      this.score = 0;
    }

    if (this.gameState === 0) {
      if (!this.firstLevelRender) {
        this.renderLevel();
        this.firstLevelRender = true;
      }
      this.processPlayerInput();
      if (this.player.processPlayerMovement(this.interactables,
        this.movementControls, this.calculateTimeDeltaTime())) {
        this.renderCharacter(this.player);
        if (this.frameCount % 20 === 0) {
          this.flag = !this.flag;
        }
      }
      if (this.player.xcoord >= 885 && this.player.ycoord >= 300) {
        this.gameState = 11;
      }
    }

    if (this.gameState === 1) {
      this.renderPopupOpening();
      this.currentlyRenderedQuestionIndex = this.interactedObject.answeredQuestions;
    }

    if (this.gameState === 2) {
      if (!this.popupContentRendered) {
        this.renderPopupContent();
        this.popupContentRendered = true;
      }
      this.processPlayerInput();
      if (this.interactedObject.isSectionClear) {
        this.sectionClearTime -= 1;
      }
      if (this.sectionClearTime <= 0) {
        this.gameState = 3;
      }
    }

    if (this.gameState === 3) {
      this.popupContentRendered = false;
      this.renderPopupClosing();
    }

    if (this.gameState === 10) {
      if (!this.firstStartScreenRender) {
        this.canvasContext.drawImage(this.assets.get('startScreen'),
          0, 0, this.canvas.width, this.canvas.height);

        this.canvasContext.font = '20px Consolas';
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.fillStyle = '#55ff55';
        const startText = (this.language === 'en' ? 'PRESS SPACE TO START' : 'DRUK SPATIEBALK OM TE STARTEN');
        const { width } = this.canvasContext.measureText(startText);
        this.canvasContext.fillText(startText,
          this.canvas.width / 2 - width / 2, this.canvas.height / 6 * 5);

        this.canvasContext.font = '15px Consolas';
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.fillStyle = '#55ff55';
        const controlsTextEN: Array<string> = [
          'CONTROLS:',
          'WASD and arrows to move and navigate,',
          'SPACEBAR to interact and confirm,',
          'E om van taal te wisselen.'];

        const controlsTextNL: Array<string> = [
          'BEDIENINGSELEMENTEN:',
          'WASD en pijlen om te bewegen en te navigeren,',
          'SPATIEBALK voor interactie en bevestiging,',
          'E to switch language.'];

        for (let i = 0; i < controlsTextEN.length; i++) {
          this.canvasContext.fillText((this.language === 'en' ? controlsTextEN[i] : controlsTextNL[i]),
            20, 400 + 20 * i);
        }

        this.canvasContext.font = 'small-caps 50px Consolas';
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.fillStyle = '#55ff55';
        const titleText = 'Prison Break';
        this.canvasContext.fillText(titleText,
          850, this.canvas.height / 6);

        this.firstStartScreenRender = true;
      }
      this.processPlayerInput();
    }

    if (this.gameState === 11) {
      if (!this.firstEndScreenRender) {
        this.canvasContext.drawImage(this.assets.get('endScreen'),
          0, 0, this.canvas.width, this.canvas.height);

        this.canvasContext.font = 'italic small-caps 50px Consolas';
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.fillStyle = '#55ff55';

        const endText = 'The End.';
        const { width } = this.canvasContext.measureText(endText);
        this.canvasContext.fillText(endText,
          this.canvas.width / 2 - width / 2, this.canvas.height / 6);

        this.canvasContext.font = 'bold 20px Consolas';
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.fillStyle = '#000000';

        const scoreTextEN: Array<string> = [
          `Your score: ${Math.floor(this.score)}.`,
          'Press SPACEBAR to play again.'];

        const scoreTextNL: Array<string> = [
          `Jouw score: ${Math.floor(this.score)}.`,
          'Druk op SPATIEBALK om opnieuw te spelen.'];

        for (let i = 0; i < scoreTextEN.length; i++) {
          this.canvasContext.fillText((this.language === 'en' ? scoreTextEN[i] : scoreTextNL[i]),
            20, 400 + 20 * i);
        }
        this.firstEndScreenRender = true;
      }
      this.processPlayerInput();
    }

    if (this.gameState < 10) {
      this.renderFps(this.calculateFps());
    }
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

      if (state && keycode === KeyListener.KEY_E && this.selectionChangeCooldown <= 0) {
        this.language = (this.language === 'en' ? 'nl' : 'en');
        this.firstStartScreenRender = false;
        this.firstEndScreenRender = false;
        if (this.gameState === 2 && !this.interactedObject.isSectionClear) {
          this.renderPopupContent();
        }
        this.selectionChangeCooldown = 40;
      }

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
      if (this.gameState === 2 && !this.interactedObject.isSectionClear) {
        if (state) {
          if (keycode === KeyListener.KEY_ESC) {
            this.gameState = 3;
          }
          if (this.selectionChangeCooldown <= 0
            && (keycode === KeyListener.KEY_SPACE || keycode === KeyListener.KEY_ENTER)) {
            this.selectionChangeCooldown = 40;
            this.selectInteractableOption();
          }
          if (this.selectionChangeCooldown <= 0
            && this.currentlyRenderedQuestionIndex === this.interactedObject.answeredQuestions) {
            if (keycode === KeyListener.KEY_A || keycode === KeyListener.KEY_LEFT) {
              this.selectedMenuOption -= 1;
              this.selectionChangeCooldown = 40;
              this.renderMenuOptions();
              this.renderMenuOptionSelector();
            }
            if (keycode === KeyListener.KEY_W || keycode === KeyListener.KEY_UP) {
              this.selectedMenuOption -= 1;
              this.selectionChangeCooldown = 40;
              this.renderMenuOptions();
              this.renderMenuOptionSelector();
            }
            if (keycode === KeyListener.KEY_D || keycode === KeyListener.KEY_RIGHT) {
              this.selectedMenuOption += 1;
              this.selectionChangeCooldown = 40;
              this.renderMenuOptions();
              this.renderMenuOptionSelector();
            }
            if (keycode === KeyListener.KEY_S || keycode === KeyListener.KEY_DOWN) {
              this.selectedMenuOption += 1;
              this.selectionChangeCooldown = 40;
              this.renderMenuOptions();
              this.renderMenuOptionSelector();
            }
          }
        }
      }
      if (this.gameState === 10) {
        if (state) {
          if (keycode === KeyListener.KEY_SPACE || keycode === KeyListener.KEY_ENTER) {
            this.gameState = 0;
          }
        }
      }
      if (this.gameState === 11) {
        if (state) {
          if (keycode === KeyListener.KEY_SPACE || keycode === KeyListener.KEY_ENTER) {
            location.reload();
          }
        }
      }
    });
  }

  /**
   * Processing Player interaction
   */
  public interact(): void {
    this.interactedObjectID = this.player.playerInteractCheck(this.interactables);
    this.interactedObject = this.interactables.interactables.get(this.interactedObjectID);
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
    this.selectedMenuOption = 0;

    if (this.popupRenderProgress < 80) {
      this.popupRenderProgress += this.calculateTimeDeltaTime() * 180;
    } else {
      this.popupRenderProgress = 80;
      this.selectionChangeCooldown = 40;
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
    this.selectedMenuOption = 0;

    if (this.popupRenderProgress > 0) {
      this.popupRenderProgress -= this.calculateTimeDeltaTime() * 180;
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
    this.canvasContext.clearRect(this.popupCornerTLX + 30, this.popupCornerTLY + 30,
      this.popupCornerBRX - this.popupCornerTLX + 50,
      this.popupCornerBRY - this.popupCornerTLY - 5);

    if (this.interactedObject.isSectionClear === true) {
      this.canvasContext.font = '20px Consolas';
      this.canvasContext.textBaseline = 'top';
      this.canvasContext.fillStyle = '#55ff55';
      const clearSectionText = (this.language === 'en' ? 'Section Completed' : 'Stage Voltooid');
      const { width } = this.canvasContext.measureText(clearSectionText);
      this.canvasContext.fillText(clearSectionText,
        this.popopCenterX - width / 2, this.popopCenterY);
      this.sectionClearTime = 100;
      return;
    }
    this.sectionClearTime = 100;

    this.canvasContext.font = '12px Consolas';
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.fillStyle = '#55ff55';

    // Rendering Question in Popup
    if (this.language === 'en') {
      this.currentQuestion = this.interactedObject.questionsEN
        [this.currentlyRenderedQuestionIndex];
    }
    if (this.language === 'nl') {
      this.currentQuestion = this.interactedObject.questionsNL
        [this.currentlyRenderedQuestionIndex];
    }
    this.renderQuestion();
    this.setMenuOptions();
    this.renderMenuOptions();
    this.renderMenuOptionSelector();
  }

  /**
   * Rendering of Question in Popup
   */
  public renderQuestion(): void {
    const lines: Array<string> = this.getLines(this.currentQuestion.question,
      this.popupCornerBRX - this.popupCornerTLX - 50);

    for (let i = 0; i < lines.length; i++) {
      this.canvasContext.fillText(lines[i],
        this.popupCornerTLX + 50, this.popupCornerTLY + 50 + i * 30,
        this.popupCornerBRX - this.popupCornerTLX - 50);
    }

    // for (let i = 0; i < this.currentQuestion.answers.length; i++) {
    //   this.canvasContext.fillText(this.currentQuestion.answers[i],
    //     this.popupCornerTLX + 50, this.popupCornerTLY + 150 + i * 50,
    //     this.popupCornerBRX - this.popupCornerTLX - 50);
    // }
  }

  /**
   * Generating lines to display in Popup
   *
   * @param text Text to display in Popup
   * @param maxWidth Maximun width of Text in Popup
   * @returns An Array of lines
   */
  public getLines(text: string, maxWidth: number): Array<string> {
    const words = text.split(' ');
    const lines: Array<string> = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const textMetric: TextMetrics = this.canvasContext.measureText(`${currentLine} ${word}`);
      const { width } = textMetric;
      if (width < maxWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  /**
   * Setting menu options
   */
  public setMenuOptions(): void {
    this.menuOptions = [];
    this.menuOptions = this.currentQuestion.answers;
  }

  /**
   * Rendering of all menu options
   */
  public renderMenuOptions(): void {
    this.canvasContext.font = '12px Consolas';
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.fillStyle = '#55ff55';

    this.canvasContext.clearRect(this.popupCornerTLX + 30, this.popupCornerTLY + 150,
      450, 280);
    for (let i = 0; i < this.menuOptions.length; i++) {
      this.canvasContext.fillText(this.menuOptions[i],
        this.popupCornerTLX + 50, this.popupCornerTLY + 150 + i * 50,
        this.popupCornerBRX - this.popupCornerTLX - 50);
    }
  }

  /**
   * Processing Player menu option commiting
   */
  public selectInteractableOption(): void {
    this.canvasContext.font = '12px Consolas';
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.fillStyle = '#55ff55';

    if (this.currentlyRenderedQuestionIndex === this.interactedObject.answeredQuestions) {
      if (this.selectedMenuOption === this.currentQuestion.correctAnswer) {
        this.score += 100;
        console.log('Correct');
        this.interactedObject.answeredQuestions += 1;
        if (this.interactedObject.answeredQuestions === this.interactedObject.questionsEN.length) {
          this.interactedObject.isSectionClear = true;
          for (let i = 0; i < this.interactedObject.doors.length; i++) {
            this.interactedObject.doors[i].isOpen = true;
          }
        }
        this.interactables.interactables.set(this.interactedObjectID, this.interactedObject);
        this.currentlyRenderedQuestionIndex += 1;
        this.renderPopupContent();
      } else {
        this.score -= 100;
        console.log('Wrong');
        // Rendering explanation
        this.canvasContext.clearRect(this.popupCornerTLX + 600, this.popupCornerTLY + 150,
          350, 280);
        const explanationLines: Array<string> = this.getLines(this.currentQuestion.explanation,
          this.popupCornerBRX - 50 - this.popupCornerTLX - 500);

        this.canvasContext.fillText(this.currentQuestion.answerWrong,
          this.popupCornerTLX + 600, this.popupCornerTLY + 150);
        for (let i = 0; i < explanationLines.length; i++) {
          this.canvasContext.fillText(explanationLines[i],
            this.popupCornerTLX + 600, this.popupCornerTLY + 200 + 20 * i,
            this.popupCornerBRX - 50 - this.popupCornerTLX - 500);
        }
      }
    }
  }

  /**
   * Rendering of menu option selector
   */
  public renderMenuOptionSelector(): void {
    this.canvasContext.font = '12px Consolas';
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.fillStyle = '#55ff55';

    if (this.selectedMenuOption < 0) {
      this.selectedMenuOption = this.menuOptions.length - 1;
    } else if (this.selectedMenuOption >= this.menuOptions.length) {
      this.selectedMenuOption = 0;
    }
    this.canvasContext.fillText('‣',
      this.popupCornerTLX + 30, this.popupCornerTLY + 150 + this.selectedMenuOption * 50);
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
