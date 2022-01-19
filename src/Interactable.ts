import Question from './Question.js';

export default class Interactable {
  public tileX: number;

  public tileY: number;

  public questions: Array<Question>;

  /**
   * Constructing a new instance of this class
   */
  public constructor(tileX: number, tileY: number) {
    this.tileX = tileX;
    this.tileY = tileX;
  }
}
