export default class Interactable {
    tileX;
    tileY;
    questionsEN;
    questionsNL;
    doors;
    answeredQuestions;
    isSectionClear;
    constructor(tileX, tileY, questionsEN, questionsNL, doors, answeredQuestions = 0, isSectionClear = false) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.questionsEN = questionsEN;
        this.questionsNL = questionsNL;
        this.doors = doors;
        this.answeredQuestions = answeredQuestions;
        this.isSectionClear = isSectionClear;
    }
}
//# sourceMappingURL=Interactable.js.map