export default class Question {
    question;
    answers;
    correctAnswer;
    answerCorrect;
    answerWrong;
    explanation;
    constructor(question, answers, correctAnswer, answerCorrect, answerWrong, explanation) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.answerCorrect = answerCorrect;
        this.answerWrong = answerWrong;
        this.explanation = explanation;
    }
}
//# sourceMappingURL=Question.js.map