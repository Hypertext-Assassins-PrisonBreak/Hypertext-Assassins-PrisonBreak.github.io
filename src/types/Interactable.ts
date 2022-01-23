import Question from './Question.js';

export default class Interactable {
  public tileX: number;

  public tileY: number;

  public questionsEN: Array<Question>;

  public questionsNL: Array<Question>;

  public answeredQuestions: number;

  public correctAnswers: number;

  /**
   * Constructing a new instance of this class
   *
   * @param tileX
   * @param tileY
   * @param questionsEN
   * @param questionsNL
   * @param answeredQuestions
   * @param correctAnswers
   */
  public constructor(tileX: number, tileY: number,
    questionsEN: Array<Question>, questionsNL: Array<Question>,
    answeredQuestions: number = 0, correctAnswers: number = 0) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.questionsEN = questionsEN;
    this.questionsNL = questionsNL;
    this.answeredQuestions = answeredQuestions;
    this.correctAnswers = correctAnswers;
  }
}
