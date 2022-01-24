import Questions from './Questions.js';
import Interactable from '../types/Interactable.js';
import Door from '../types/Door.js';
export default class Interactables {
    interactables = new Map([
        ['interactable0', new Interactable(1, 7, [
                Questions.questionsEN.get('question0'),
                Questions.questionsEN.get('question1')
            ], [
                Questions.questionsNL.get('question0'),
                Questions.questionsNL.get('question1')
            ], [new Door(4, 8, true)])],
        ['interactable1', new Interactable(2, 1, [
                Questions.questionsEN.get('question2'),
                Questions.questionsEN.get('question3')
            ], [
                Questions.questionsNL.get('question2'),
                Questions.questionsNL.get('question3')
            ], [new Door(3, 6, false)])],
        ['interactable2', new Interactable(6, 3, [
                Questions.questionsEN.get('question4'),
                Questions.questionsEN.get('question5')
            ], [
                Questions.questionsNL.get('question4'),
                Questions.questionsNL.get('question5')
            ], [new Door(15, 6, false)])],
        ['interactable3', new Interactable(7, 7, [
                Questions.questionsEN.get('question6'),
                Questions.questionsEN.get('question7')
            ], [
                Questions.questionsNL.get('question6'),
                Questions.questionsNL.get('question7')
            ], [new Door(9, 8, true)])],
        ['interactable4', new Interactable(11, 1, [
                Questions.questionsEN.get('question8'),
                Questions.questionsEN.get('question9')
            ], [
                Questions.questionsNL.get('question8'),
                Questions.questionsNL.get('question9')
            ], [new Door(9, 3, true), new Door(13, 3, true)])],
        ['interactable5', new Interactable(12, 7, [
                Questions.questionsEN.get('question10'),
                Questions.questionsEN.get('question11')
            ], [
                Questions.questionsNL.get('question10'),
                Questions.questionsNL.get('question11')
            ], [new Door(11, 4, false)])],
        ['interactable6', new Interactable(15, 2, [
                Questions.questionsEN.get('question12'),
                Questions.questionsEN.get('question13')
            ], [
                Questions.questionsNL.get('question12'),
                Questions.questionsNL.get('question13')
            ], [new Door(18, 2, true)])],
        ['interactable7', new Interactable(22, 2, [
                Questions.questionsEN.get('question14'),
                Questions.questionsEN.get('question15')
            ], [
                Questions.questionsNL.get('question14'),
                Questions.questionsNL.get('question15')
            ], [new Door(20, 4, false)])]
    ]);
}
//# sourceMappingURL=Interactables.js.map