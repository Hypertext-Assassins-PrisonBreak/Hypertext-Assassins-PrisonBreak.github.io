import Questions from './Questions.js';
import Interactable from '../types/Interactable.js';
export default class Interactables {
    interactables = new Map([
        ['interactable0', new Interactable(1, 3, [
                Questions.questionsEN.get('question0'),
                Questions.questionsEN.get('question0')
            ], [
                Questions.questionsNL.get('question0'),
                Questions.questionsNL.get('question0')
            ])],
        ['interactable1', new Interactable(2, 1, [
                Questions.questionsEN.get('question1'),
                Questions.questionsEN.get('question1')
            ], [
                Questions.questionsNL.get('question1'),
                Questions.questionsNL.get('question1')
            ])],
        ['interactable2', new Interactable(4, 3, [
                Questions.questionsEN.get('question2'),
                Questions.questionsEN.get('question2')
            ], [
                Questions.questionsNL.get('question2'),
                Questions.questionsNL.get('question2')
            ])]
    ]);
}
//# sourceMappingURL=Interactables.js.map