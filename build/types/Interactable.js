export default class Interactable {
    tileX;
    tileY;
    questionsEN;
    questionsNL;
    doors;
    answeredQuestions;
    correctAnswers;
    isSectionClear;
    constructor(tileX, tileY, questionsEN, questionsNL, doors, answeredQuestions = 0, correctAnswers = 0, isSectionClear = false) {
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
//# sourceMappingURL=Interactable.js.map