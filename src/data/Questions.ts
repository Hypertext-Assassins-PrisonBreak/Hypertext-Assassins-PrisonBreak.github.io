import Question from '../types/Question.js';

export default class Questions {
  // Map of all Questions
  public static readonly questionsEN: Map<string, Question> = new Map<string, Question>([
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
      new Question('From whom should you accept friend requests?',
        ['Anyone.', 'A friend of a friend.', 'Only from people you definitely know.'],
        2, 'Correct', 'Wrong',
        'You should only accept a friend request from people who you definitely know. Never accept friend requests from strangers or anybody you are unsure of.')],

    ['question3',
      new Question('I am in the middle of a chat session and someone says something really mean. Should I: ',
        ['Say something mean back', 'Ask them to Apologize ', 'Do not respond and tell an adult it '],
        2, 'Correct', 'Wrong',
        'You should never respond to any messages that are mean or in any way make you feel uncomfortable. It is not your fault if you get a message like that.  If you get a message like this, tell your parents right away. ')],

    ['question4',
      new Question('I met someone in a chat room who wants to get together. They live nearby.  Can I arrange a meeting? ',
        ['Yes, I should go out without asking.', 'No, I should first ask my parents and tell them that I met this person online. '],
        1, 'Correct', 'Wrong',
        'It is very important that you never agree to get together with someone you meet online without first checking with my parents. You never truly know who this person really is and can end up very dangerous. ')],

    ['question5',
      new Question('If someone bullies you online what would be the best thing to do?',
        ['Do not respondand tell your parents. ', 'Respond with something mean too. ', 'Respond, but in a nice way.'],
        0, 'Correct', 'Wrong',
        'Stay calm and do not feed the bully. Sometimes the bullies just want you to freak out and retaliate so that they can make more fun of your reaction. Even if you say something nice, they can still find a way to be mean to you. But if you do not respond the bullies get bored.')],

    ['question6',
      new Question('When a website asks you to fill in your real name and ID number:',
        ['First find out the reliability of the website and then fill in the relevant information.', 'Ignore website reliability and fill in directly', 'Fill in other peoples information'],
        0, 'Correct', 'Wrong',
        'When we encounter a website that asks you to fill in your ID information, we should repeatedly confirm the security of the website to ensure that the website is completely harmless and reliable before filling in your personal information, otherwise it is very likely to be misused by criminals.')],

    ['question7',
      new Question('What should you do if a stranger asks you to send a picture of yourself to them?',
        ['Do not send any pictures and tell an adult straight away. ', 'Send the picture if you think you know them ', 'Send picture even though they are a stranger ', 'Ignore it'],
        0, 'Correct', 'Wrong',
        'You should never send pictures of yourself to a stranger as you do not know who they are or what they might do. If a stranger asks for a picture, refuse and tell an adult straight away. You should also never send a picture to somebody that you would not want anybody else to see. Even if you trust the person, it could still end up online or be shown to others.')],

    ['question8',
      new Question('If you post something on the internet, who may be able to see it? ',
        ['Only your friends.', 'Just yourself', 'Anyone', 'Only your family'],
        2, 'Correct', 'Wrong',
        'Anybody may be able to see what you post online. Speak to an adult and ask them to help you improve your online privacy.')],

    ['question9',
      new Question('One of your friends has posted a video of you on the internet and you do not like it. You have asked them to take it down, but they have said no because it is funny. What should you do? ',
        ['Keep asking your friend until they take it down. ', 'Speak to an adult and say why you do not like it ', 'Leave it, you can not do anything else about it ', 'Post a video of them to get revenge. '],
        1, 'Correct', 'Wrong',
        'You should speak to an adult about what has happened and tell them that you do not like it. They can then try to get the video taken down. ')],

    ['question10',
      new Question('Your friend tells you that she is talking to a boy online and she is going to meet him on the weekend. What should you do?',
        ['Volunteer to go with her ', 'Let her go on her own ', 'Tell an adult straight away ', 'Tell your other friends'],
        2, 'Correct', 'Wrong',
        'You must tell an adult straight away if somebody going to meet a person that they met online and have never met in person before. You should never meet people unless you know who they are for certain. ')],

    ['question11',
      new Question('A classmate tells you that somebody has been calling him mean names on an online game. What should you do?',
        ['Tell your teacher or another adult ', 'Tell him to call the person mean names back', 'Tell him to just ignore it and let it go away ', 'Tell him to stop playing games for a while'],
        0, 'Correct', 'Wrong',
        'Calling somebody mean names online is cyberbullying. You should tell an adult about it and not ignore it. ')],

    ['question12',
      new Question('Who can you share your passwords with? ',
        ['Your friends ', 'Nobody, you should keep them to yourself ', 'Your family ', 'Your teacher '],
        1, 'Correct', 'Wrong',
        'You should always keep your passwords to yourself. It could be dangerous if your password fell into the wrong hands ')],

    ['question13',
      new Question('You have gone on a gaming website, and it asks you to download a link before you play. What should you do? ',
        ['Show the link to an adult and ask if it is safe ', 'Download it anyway ', 'Do not download it, it must be illegal ', 'Ask your friends what to do '],
        0, 'Correct', 'Wrong',
        'You should always speak to an adult if a website asks you to download something. You never know what it could be. ')],

    ['question14',
      new Question('You need to create a password for a website. What should you use?',
        ['Your full name (e.g jacksmith) ', 'Part of your name and a number (e.g jack123) ', 'A random word, number and punctuation combination (e.g 1cer3am!) ', 'A nickname that your friends call you (e.g jumpingjacks) '],
        2, 'Correct', 'Wrong',
        'The strongest passwords have a combination of letters, numbers and punctuation. You should never use anything linked to your name because it is very easy to guess. ')],

    ['question15',
      new Question('Sometimes you will see https:// or a lock symbol in front a web address. What does that mean? ',
        ['I can not access the website ', 'The website needs a password ', 'It is not a kid friendly website', 'It means it is safer to enter personal information '],
        3, 'Correct', 'Wrong',
        'https:// or the lock symbol that is displayed sometimes in front of the web address implies that the website is safer.  It does not have to be in front of every website but if you enter personal information, you should make sure it is secured with https://.  ')],

    ['question16',
      new Question('Someone in your class has sent around an embarrassing photo of another classmate. What should you do with it? ',
        ['Show your teacher and say what has happened', 'Forward the photo onto other people', 'Save it to your phone so you can embarrass them again later', 'Laugh at the photo with your friends '],
        1, 'Correct', 'Wrong',
        'You should show your teacher the photo and tell them what has happened. Think about how you would feel if the picture was of you.')]]);

  public static readonly questionsNL: Map<string, Question> = new Map<string, Question>([
    ['question0',
      new Question('Ik zit midden in een chat gesprek/sessie, iemand zegt iets heel gemeen. Wat moet ik doen: "?',
        ['Iets vervelend terug zeggen? ', 'Hem vragen zich te verontschuldigen? ', 'Niet reageren; een volwassenen vertellen of het me dwars zit? '],
        2, 'Correct', 'Wrong',
        'Most of these sites are deceptive, and even a very reliable site with similar information is likely to make you pay extra, and you need to ignore these links when you see them.')],

    ['question1',
      new Question('Ik ben online op het internet en ik krijg een bericht van de internet provider die vraagt naar mijn wachtwoord. De internetprovider zegt dat dit nodig is om mijn account te fiksen. Moet ik mijn wachtwoord geven? ',
        ['Ja', 'Nee'],
        1, 'Correct', 'Wrong',
        'Je moet nooit je (internet) wachtwoord geven aan iemand (zelfs niet je beste vrienden), alleen je ouders. KPN en de meeste andere internet providers zullen je nooit vragen om je wachtwoord. Soms zullen mensen zich voordoen als internet provider en je op deze manier aan je wachtwoord proberen te komen. ')],

    ['question2',
      new Question('Ik heb iemand ontmoet in een chatroom, deze persoon wil afspreken. Hij/zij woont dichtbij kan ik een afspreken? ',
        ['Ja', 'Nee'],
        1, 'Correct', 'Wrong',
        'Het is heel belangrijk dat je nooit ja zegt als een persoon met je wilt afspreken als deze online hebt ontmoet. Check dit altijd eerst bij je ouders. Als je ouders de afspraak goed vinden, zorg dat deze dan plaatsvind op een drukke plek met een ouder erbij om een oogje in het zeil te houden.')],

    ['question3',
      new Question('Als iemand je online pest, hoe reageer je daar het best op?',
        ['Niet reageren', 'Reageren met iets gemeens', 'Reageer, maar op een vriendelijke manier'],
        0, 'Correct', 'Wrong',
        'Je zou niet moeten reageren. Als iemand je pest, probeer je jezelf voor te stellen dat je reactie precies is wat een pestkop wil. Het geeft hem/haar de macht over jouw. En wie wil nou de macht geven aan de pestkop?')],

    ['question4',
      new Question('Wat doe je als een vreemde vraagt of je een foto van jezelf doorstuurt?',
        ['Geen photos sturen, en meteen vertellen aan je ouders ', 'Stuur de foto zelfs als het een vreemde is', 'Negeer het bericht'],
        0, 'Correct', 'Wrong',
        'Je moet nooit photos maken van jezelf en naar vreemden sturen. J weet namelijk niet wie ze zijn en wat ze misschien van plan zijn. Als een vreemde vraagt voor een foto, weiger dit en vertel het een volwassenen dit meteen. Je moet nooit een foto sturen die niet door iemand anders gezien mag worden, zelfs als je deze persoon helemaal vertrouwt. Dit kan namelijk nog steeds bij vreemden terecht komen.')],

    ['question5',
      new Question('Van wie moet je online vriendschapsverzoeken accepteren?',
        ['Iedereen', 'Een vriend van een vriend', 'Iemand die je denkt eerder te hebben ontmoet', 'Alleen van mensen die je kent'],
        3, 'Correct', 'Wrong',
        'Accepteer alleen vriendschapsverzoeken van mensen die je kent. Accepteer nooit vriendschapsverzoeken van vreemden of iemand die je niet met zekerheid kent.')],

    ['question6',
      new Question('Als je iets op internet plaatst, wie kan het dan zien?',
        ['Alleen je vrienden', 'Alleen jij', 'Iedereeen', 'Alleen je familie'],
        2, 'Correct', 'Wrong',
        'Het kan zijn dat iedereen kan zien wat je online plaatst. Praat met een volwassene erover en vraag ze om jou te helpen met je privacyinstellingen.')],

    ['question7',
      new Question('Iemand in je klas heeft een gênante foto van een andere klasgenoot rondgestuurd. Wat moet je doen?',
        ['Laat het aan de leraar zien en vertel wat er is gebeurd', 'Stuur de foto door naar andere mensen', 'Bewaar het op je telefoon zodat je ze later voorschut kan zetten', 'Lach met je vrienden om de foto'],
        0, 'Correct', 'Wrong',
        'Je moet je leraar de foto laten zien en vertellen wat er is gebeurd. Bedenk hoe je je zou voelen als de foto van jou was.')],

    ['question8',
      new Question('Een van je vrienden heeft een video van je op internet geplaatst en je vindt het niet leuk. Je hebt ze gevraagd om het te verwijderen, maar ze willen het niet doen omdat het grappig is. Wat moet je doen?',
        ['Blijf vragen tot je vriend/vriendin de video verwijdert', 'Praat met een volwassene en vertel waarom je het niet leuk vindt', 'Gewoon laten doen- je kunt er niets anders aan doen', 'Plaats een video van hen om ze terug te krijgen.'],
        1, 'Correct', 'Wrong',
        'Je moet met een volwassene praten over wat er is gebeurd en hem vertellen dat je het niet leuk vindt. Ze kunnen dan proberen de video te verwijderen.')],

    ['question9',
      new Question('Je vriendin vertelt je dat ze online met een jongen praat en dat ze hem in het weekend gaat ontmoeten. Wat ga je doen?',
        ['Vrijwillig met haar mee gaan', 'Laat haar alleen gaan', 'Vertel het meteen aan een volwassene', 'Vertel het je andere vrienden'],
        2, 'Correct', 'Wrong',
        'Je moet het meteen aan een volwassene vertellen als iemand een persoon gaat ontmoeten die hij of zij online heeft ontmoet. Je moet nooit mensen ontmoeten, tenzij je zeker weet wie ze zijn.')],

    ['question10',
      new Question('Een klasgenoot vertelt je dat iemand hem gemene namen heeft genoemd in een online game. Wat zou je moeten doen?',
        ['Vertel het je leraar of een andere volwassene ', 'Zeg hem dat hij de persoon gemene namen terug moet bellen ', 'Zeg hem dat hij het gewoon moet negeren en het moet laten verdwijnen', 'Zeg hem om een tijdje te stoppen met het spelen van games '],
        0, 'Correct', 'Wrong',
        'Iemand online gemene namen noemen, is cyberpesten. Je moet het aan een volwassene vertellen en het niet negeren. ')],

    ['question11',
      new Question('Met wie kunt u uw wachtwoorden delen? ',
        ['Je vrienden ', 'Niemand - je moet ze voor jezelf houden ', 'Jouw familie ', 'je leraar'],
        1, 'Correct', 'Wrong',
        'U moet uw wachtwoorden altijd voor uzelf houden. Het kan gevaarlijk zijn als uw wachtwoord in verkeerde handen valt')],

    ['question12',
      new Question('Je bent op een gaming-website geweest en deze vraagt je om een link te downloaden voordat je gaat spelen. Wat zou je moeten doen? ',
        ['Laat de link zien aan een volwassene en vraag of het veilig is ', 'Download het toch ', 'Download het niet, het moet illegaal zijn', 'Vraag je vrienden wat ze moeten doen'],
        0, 'Correct', 'Wrong',
        'Praat altijd met een volwassene als een website je vraagt iets te downloaden. Je weet nooit wat het kan zijn. ')],

    ['question13',
      new Question('U moet een wachtwoord voor een website aanmaken. Wat moet je gebruiken? ',
        ['Uw volledige naam (bijv. smid) ', 'Een deel van je naam en een nummer (bijv. jack123) ', 'Een willekeurige combinatie van woord, cijfer en interpunctie (bijv. 1cer3am!) ', 'Een bijnaam die je vrienden je noemen (bijvoorbeeld springjacks) '],
        2, 'Correct', 'Wrong',
        'De sterkste wachtwoorden hebben een combinatie van letters, cijfers en leestekens. Gebruik nooit iets dat aan uw naam is gekoppeld, omdat het heel gemakkelijk te raden is. ')],

    ['question14',
      new Question('Soms ziet u https:// of een slotsymbool voor een webadres. Wat betekent dat?',
        ['Ik heb geen toegang tot de website', 'De website heeft een wachtwoord nodig', 'Het is geen kindvriendelijke website', 'Het betekent dat het veiliger is om persoonlijke informatie in te voeren'],
        3, 'Correct', 'Wrong',
        'https:// of het slotsymbool dat soms voor het webadres wordt weergegeven, geeft aan dat de website veiliger is. Het hoeft niet voor elke website te staan, maar als u persoonlijke informatie invoert, moet u ervoor zorgen dat deze is beveiligd met https://.')],

    ['question15',
      new Question('Wat te doen als een e-mail zegt dat je een prijs hebt gewonnen?',
        ['Negeer deze e-mail en blokkeer berichten van deze afzender', 'Laat haar alleen gaan', 'Vertel het meteen aan een volwassene', 'Vertel het je andere vrienden'],
        1, 'Correct', 'Wrong',
        'Je moet het meteen aan een volwassene vertellen als iemand een persoon gaat ontmoeten die hij of zij online heeft ontmoet. Je moet nooit mensen ontmoeten, tenzij je zeker weet wie ze zijn.')]]);
}
