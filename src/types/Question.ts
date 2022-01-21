export default class Question {
  public question: string;

  public answers: Array<string>;

  public correctAnswer: number;

  public answerCorrect: string;

  public answerWrong: string;

  public explanation: string;

  /**
   * Constructing a new instance of this class
   *
   * @param question
   * @param answers
   * @param correctAnswer
   * @param answerCorrect
   * @param answerWrong
   * @param explanation
   */
  public constructor(question: string, answers: Array<string>, correctAnswer: number,
    answerCorrect: string, answerWrong: string, explanation: string) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.answerCorrect = answerCorrect;
    this.answerWrong = answerWrong;
    this.explanation = explanation;
  }
}
