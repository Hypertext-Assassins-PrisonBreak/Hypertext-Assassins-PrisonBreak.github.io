import Question from './Question.js';

export default class Interactable {
  public tileX: number;

  public tileY: number;

  public questions: Array<Question>;

  /**
   * Constructing a new instance of this class
   *
   * @param tileX
   * @param tileY
   * @param questions
   */
  public constructor(tileX: number, tileY: number, questions: Array<Question>) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.questions = questions;
  }
}
