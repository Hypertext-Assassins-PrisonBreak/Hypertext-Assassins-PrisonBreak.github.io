import Question from '../types/Question.js';

export default class Questions {
  // Map of all Questions
  public static readonly questions: Map<string, Question> = new Map<string, Question>([
    ['question0',
      new Question('What should you do when you see "click this link to get free toys"?',
        ['Do not click that link.', 'Click on the link to get free toys.', 'Check the authenticity of the link first and then click on the page.'],
        0, 'Correct', 'Wrong',
        'Most of these sites are deceptive, and even a very reliable site with similar information is likely to make you pay extra, and you need to ignore these links when you see them.')],
    ['question1',
      new Question('I am online and I got a message from my Internet service provider asking for my password. They say they need it to fix my account. Should I give it to them?',
        ['Yes.', 'No.'],
        1, 'Correct', 'Wrong',
        'Internet service providers would never ask you for a password. You should never share your Internet password to anyone (even your best friends) other than your parents.')],
    ['question2',
      new Question('Who should you accept friend requests from online?',
        ['Anyone.', 'A friend of a friend.', 'Only from people you definitely know.'],
        2, 'Correct', 'Wrong',
        'You should only accept a friend request from people who you definitely know. Never accept friend requests from strangers or anybody you are unsure of.')]]);
}
