import Door from '../types/Door.js';
import Question from './Question.js';

export default class Interactable {
  public tileX: number;

  public tileY: number;

  public questionsEN: Array<Question>;

  public questionsNL: Array<Question>;

  public doors: Array<Door>;

  public answeredQuestions: number;

  public correctAnswers: number;

  public isSectionClear: boolean;

  /**
   * Constructing a new instance of this class
   *
   * @param tileX
   * @param tileY
   * @param questionsEN
   * @param questionsNL
   * @param doors
   * @param answeredQuestions
   * @param correctAnswers
   * @param isSectionClear
   */
  public constructor(tileX: number, tileY: number,
    questionsEN: Array<Question>, questionsNL: Array<Question>,
    doors: Array<Door>,
    answeredQuestions: number = 0, correctAnswers: number = 0,
    isSectionClear: boolean = false) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.questionsEN = questionsEN;
    this.questionsNL = questionsNL;
    this.doors = doors;
    this.answeredQuestions = answeredQuestions;
    this.correctAnswers = correctAnswers;
    this.isSectionClear = isSectionClear;
  }
}
