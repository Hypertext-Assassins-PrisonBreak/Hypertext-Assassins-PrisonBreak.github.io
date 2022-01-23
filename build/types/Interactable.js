export default class Interactable {
    tileX;
    tileY;
    questionsEN;
    questionsNL;
    doors;
    answeredQuestions;
    correctAnswers;
    constructor(tileX, tileY, questionsEN, questionsNL, doors, answeredQuestions = 0, correctAnswers = 0) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.questionsEN = questionsEN;
        this.questionsNL = questionsNL;
        this.doors = doors;
        this.answeredQuestions = answeredQuestions;
        this.correctAnswers = correctAnswers;
    }
}
//# sourceMappingURL=Interactable.js.map