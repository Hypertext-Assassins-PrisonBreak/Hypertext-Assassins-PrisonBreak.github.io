import Questions from './Questions.js';
import Interactable from '../types/Interactable.js';

export default class Interactables {
// Array of all Interactable instances
  public static readonly interactables: Map<string, Interactable> = new Map<string, Interactable>([
    ['interactable0', new Interactable(1, 3, [
      Questions.questions.get('question0'),
      Questions.questions.get('question0')])],

    ['interactable1', new Interactable(2, 1, [
      Questions.questions.get('question1'),
      Questions.questions.get('question1')])],

    ['interactable2', new Interactable(4, 3, [
      Questions.questions.get('question2'),
      Questions.questions.get('question2')])]]);
}
