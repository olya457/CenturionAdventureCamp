import type {ImageKey} from '../assets';

export type Story = {
  id: string;
  title: string;
  imageKey: ImageKey;
  excerpt: string;
  paragraphs: string[];
};

export type Laugh = {
  id: string;
  title: string;
  text: string;
};

export type QuizOption = {
  text: string;
  correct?: boolean;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type ActivityIdea = {
  id: string;
  text: string;
};

export const stories: Story[] = [
  {
    id: 'lost-helmet',
    title: 'The Lost Centurion Helmet',
    imageKey: 'storyLostHelmet',
    excerpt:
      'One warm morning, Centurion Marcellus woke up before anyone else in the camp...',
    paragraphs: [
      'One warm morning, Centurion Marcellus woke up before everyone else in the camp. The sun was just beginning to light up the red flags, and the small wooden towers were still covered with the morning coolness. Marcellus loved order above all else. His sandals stood straight, his cloak was neatly folded, and his shiny helmet always hung by his bed.',
      'But this morning there was no helmet.',
      '"Impossible..." muttered the centurion and looked under the bench.',
      'Then under the table.',
      'Then even into the bag of apples.',
      'The helmet disappeared.',
      'A real panic began in the camp. Young assistants began to run between the tents, the cook overturned a basket of lemons, and the guard dog Rufus suddenly began to bark loudly at a wooden barrel.',
      '"Calm down!" said Marcellus. "We will find him without panic!"',
      'Three children from the camp joined the search: Titus, Livia, and little Gaius, who always carried a wooden sword with him.',
      'First they decided to check the kitchen. It smelled of fresh bread and honey. The cook swore that he had seen the helmet at night by the fountain.',
      'Near the fountain they found only wet fish and a very angry duck.',
      '"That is suspicious," Gaius said seriously.',
      '"A duck could not have stolen the helmet," Livia laughed.',
      'But the duck suddenly hissed and ran between the tents. The whole company rushed after it. They ran across the training field, jumped over wooden shields and scared the old cat of the librarian.',
      'Finally, the duck led them to a small cart with hay.',
      "And right there, in the middle of the hay, lay Marcellus' helmet.",
      'Rufus the dog was sleeping nearby.',
      'It turned out that at night Rufus decided to "hide the treasure" so that no one would steal it.',
      'Marcellus laughed out loud.',
      '"That is the guard!" he said.',
      'After that incident, the centurion ordered a small bronze badge to be made for Rufus with the inscription "The strangest guard of the camp."',
      'And the children remembered for a long time how they chased the angry duck through the entire camp.',
      'From that day on, Marcellus always checked to see if Rufus was accidentally "guarding" his helmet.',
    ],
  },
  {
    id: 'huge-pie',
    title: 'Centurion and a Huge Pie',
    imageKey: 'storyHugePie',
    excerpt:
      'Friendship Day was approaching, and Marcellus decided to bake the largest pie in the camp...',
    paragraphs: [
      'In the camp of Centurion Marcellus, Friendship Day was approaching - a favorite holiday of all children. On this day, everyone brought something delicious, and in the evening everyone gathered around a large table under lanterns.',
      'Marcellus decided to surprise everyone and bake the largest pie in the entire camp.',
      '"How big is it?" asked Titus.',
      '"So big that it can be rolled instead of a wheel!" the centurion proudly answered.',
      'The children thought it was a joke.',
      'But no.',
      'From the very morning, Marcellus and the cook began to knead the dough in a huge wooden barrel. Livia counted the apples, Gaius carried bags of flour, and the dog Rufus constantly tried to steal the sausage from the table.',
      'After a few hours, the pie became so big that it did not fit in the oven.',
      '"That is a small problem," said the cook.',
      '"Small?!" Livia was surprised.',
      'Then Marcellus came up with a brilliant plan. They decided to bake the pie in parts, and then stack it together like a huge sweet tower.',
      'Everything was going great until Gaius accidentally tripped over a bag of berries.',
      'The berries flew straight at Marcellus.',
      'Now the centurion looked as if he were being attacked by a cloud of strawberries.',
      'The children laughed so loudly that even the guard at the gate came to see what had happened.',
      'But the real disaster awaited.',
      'When the pie was ready, Rufus jumped onto the table to get a piece of sausage. The table wobbled, and the huge pie began to slowly tilt.',
      'Everyone froze.',
      'Marcellus rushed forward and caught the pie with his bare hands.',
      'True, now he had cream on his cloak, his hair, and even his nose.',
      '"That was a very brave act," Titus said seriously.',
      '"Yes," Gaius added. "A pie hero."',
      'In the evening, the whole camp ate a huge pie and laughed at how Marcellus had "saved dinner."',
      'And the cook then spent a whole week finding berries in the most unexpected places in the camp.',
    ],
  },
  {
    id: 'night-noise',
    title: 'The Mystery of the Night Noise',
    imageKey: 'storyNightNoise',
    excerpt:
      'One night, everyone in the camp woke up to a strange rumble near the warehouse...',
    paragraphs: [
      'One night, everyone in the camp woke up to a strange rumble.',
      'BOOM.',
      'SCREAM.',
      'THUD.',
      '"It is definitely a monster!" whispered Gaius, hiding under the blanket.',
      'Marcellus quickly put on his cloak and took out a lantern.',
      '"There are no monsters in our camp," he said confidently. "But the noise is really strange."',
      'Together with the children, they set out to inspect the territory. The night was dark, only the moon illuminated the paths between the tents.',
      'Suddenly, something loudly slammed near the warehouse.',
      'Livia almost jumped.',
      '"I saw a shadow!"',
      'Marcellus carefully opened the warehouse door.',
      'And then a huge watermelon rolled out onto him.',
      'Another one followed.',
      'And more.',
      'It turned out that the old wooden rack could not withstand the weight of the fruit. The watermelons began to roll around the warehouse and crash into the boxes.',
      'But the funniest thing was ahead.',
      'In the middle of all this chaos sat Rufus.',
      'A watermelon helmet was stuck on his head.',
      'The children began to laugh so hard that even Marcellus could hardly contain himself.',
      '"Now we have a watermelon legionnaire," he said.',
      'The next day, the whole camp was still thinking about the "terrible night monster," which turned out to be ordinary watermelons.',
      'And Rufus looked at the fruit very suspiciously after that.',
    ],
  },
  {
    id: 'sandal-race',
    title: 'The Great Sandal Race',
    imageKey: 'storySandalRace',
    excerpt:
      'The rules were simple: do not fall, do not push, and do not lose your sandals...',
    paragraphs: [
      'In the Marcellus camp, they decided to hold an unusual competition - the Great Sandal Race.',
      'The rules were simple: do not fall, do not push, and do not lose your sandals along the way.',
      '"This is the most difficult rule," Titus immediately said.',
      'Both the children and Marcellus himself took part in the race.',
      'Before the start, the centurion warmed up as seriously as if he were going to the Olympic Games.',
      '"I trained for a whole five minutes!" he said proudly.',
      'Gaius brought the flag for the start.',
      '"Three, two, one!"',
      'Everyone ran ahead.',
      'At first, Marcellus confidently led. His red cloak fluttered beautifully behind him.',
      'But then one sandal suddenly flew off his foot and flew straight into the bushes.',
      '"This is sabotage!" shouted the centurion.',
      'The children laughed and ran on. Rufus also decided to take part in the race, although no one invited him.',
      'Halfway through the race, a dog stole a bun from someone and ran across the field. Everyone ran after him.',
      'As a result, the race turned into a cheerful chaos.',
      'Livia crossed the finish line.',
      'Rufus came in second.',
      'And Marcellus came last with different sandals on his feet.',
      '"The main thing is not to win," he said solemnly, breathing heavily.',
      '"And what?" asked Gaius.',
      '"The main thing is not to lose the second sandal."',
    ],
  },
  {
    id: 'smart-parrot',
    title: 'The Very Smart Parrot',
    imageKey: 'storySmartParrot',
    excerpt:
      'A traveler came to the camp with a bright green parrot that loved giving orders...',
    paragraphs: [
      'One day a traveler came to the camp with a strange parrot.',
      'The bird was bright green and kept repeating: "Where are the cookies? Where are the cookies?"',
      'Marcellus allowed them to stay for a few days.',
      'At first, everything was fine. But the next morning the parrot began to shout at the entire camp: "GET UP! WHOEVER IS NOT GETTING UP WASHES THE BOILERS!"',
      'The children laughed.',
      'And Marcellus blinked his eyes in surprise.',
      '"That is my phrase..."',
      'The parrot quickly learned to repeat almost everything.',
      'He especially liked to command.',
      '"GET READY!"',
      '"DO NOT TOUCH THE CAKES!"',
      '"RUFUS, DO NOT CHEW YOUR SANDAL!"',
      'The worst happened during lunch.',
      'The parrot suddenly shouted: "WHO ATE THE LAST SAUSAGE?!"',
      'Everyone immediately began to look at each other suspiciously.',
      'Even Rufus slowly stepped aside.',
      'Then the parrot laughed a strange creaking laugh.',
      "It turned out that the sausage had been in the traveler's pocket all along.",
      'Then the parrot sat on Marcellus\' shoulder and suddenly said very seriously: "Good camp."',
      'The centurion smiled.',
      '"Thank you, friend."',
      'The next day the traveler went on, but the parrot was still remembered in the camp for a long time.',
      'Especially his favorite phrase: "DO NOT TOUCH THE CAKES!"',
    ],
  },
];

export const laughs: Laugh[] = [
  {
    id: 'laugh-1',
    title: 'Laugh #1',
    text: 'The centurion ordered everyone to line up straight. Even the camp cat sat on a string. True, only to steal a sausage from the table.',
  },
  {
    id: 'laugh-2',
    title: 'Laugh #2',
    text: 'Marcellus, why is your cloak so red? So that the stains from the berry pie would not be visible.',
  },
  {
    id: 'laugh-3',
    title: 'Laugh #3',
    text: 'Rufus once stole the centurion sandal. Now the camp has a rule: never leave your shoes unattended.',
  },
  {
    id: 'laugh-4',
    title: 'Laugh #4',
    text: 'Who ate all the apples? Everyone is silent. Rufus quietly hides his tail under the bench.',
  },
  {
    id: 'laugh-5',
    title: 'Laugh #5',
    text: 'Marcellus commanded so loudly that the parrot began to repeat the orders for him.',
  },
  {
    id: 'laugh-6',
    title: 'Laugh #6',
    text: 'The camp wanted to spend a quiet hour. But Rufus found a saucepan.',
  },
  {
    id: 'laugh-7',
    title: 'Laugh #7',
    text: 'Centurion, we are ready for adventure! And I am not. Who hid my helmet again?',
  },
  {
    id: 'laugh-8',
    title: 'Laugh #8',
    text: 'Marcellus was very tidy. That is why his desk was always almost tidy.',
  },
  {
    id: 'laugh-9',
    title: 'Laugh #9',
    text: 'Once Gaius mistook his shield for a tray of cookies. Not all the cookies survived.',
  },
  {
    id: 'laugh-10',
    title: 'Laugh #10',
    text: 'Why is the duck following you? I think she thinks I am the bread boss.',
  },
  {
    id: 'laugh-11',
    title: 'Laugh #11',
    text: 'Rufus learned to open the door with his nose. Now no one in the camp can eat sausage in peace.',
  },
  {
    id: 'laugh-12',
    title: 'Laugh #12',
    text: 'Marcellus said the training would be easy. After that, even the bench looked tired.',
  },
  {
    id: 'laugh-13',
    title: 'Laugh #13',
    text: 'The parrot in the camp learned the phrase: DO NOT TOUCH THE CAKES! Now it screams it even in its sleep.',
  },
  {
    id: 'laugh-14',
    title: 'Laugh #14',
    text: 'Centurion, we are lost! Do not worry. I do not know where we are either, but I look confident.',
  },
  {
    id: 'laugh-15',
    title: 'Laugh #15',
    text: 'Rufus had a very important duty - to guard the camp. Especially the kitchen.',
  },
  {
    id: 'laugh-16',
    title: 'Laugh #16',
    text: 'Marcellus bought a new helmet. An hour later, Rufus was already asleep in it.',
  },
  {
    id: 'laugh-17',
    title: 'Laugh #17',
    text: 'Why are you running so fast? Because the cook goose is chasing me!',
  },
  {
    id: 'laugh-18',
    title: 'Laugh #18',
    text: 'During training, Gaius shouted HOORAY so loudly that he woke up the neighboring camp.',
  },
  {
    id: 'laugh-19',
    title: 'Laugh #19',
    text: 'Marcellus said: no accidents today. And at that moment, a watermelon rolled out of the barrel.',
  },
  {
    id: 'laugh-20',
    title: 'Laugh #20',
    text: 'Rufus, give me the bun! The dog looked very serious and started running even faster.',
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'symbols',
    title: 'Symbols of the Roman Camp',
    questions: [
      {
        question: 'Why does a centurion need a shield?',
        options: [
          {text: 'A. For soup'},
          {text: 'B. For protection', correct: true},
          {text: 'C. For drawing'},
        ],
      },
      {
        question: 'What did Roman soldiers wear on their feet?',
        options: [
          {text: 'A. Sandals', correct: true},
          {text: 'B. Skates'},
          {text: 'C. Slippers'},
        ],
      },
      {
        question: "What color was a centurion's cloak often?",
        options: [
          {text: 'A. Red', correct: true},
          {text: 'B. Green'},
          {text: 'C. Purple'},
        ],
      },
      {
        question: 'What did a camp guard usually hold?',
        options: [
          {text: 'A. Spoon'},
          {text: 'B. Torch', correct: true},
          {text: 'C. Pillow'},
        ],
      },
      {
        question: 'Where did a centurion live?',
        options: [
          {text: 'A. In space'},
          {text: 'B. In the camp', correct: true},
          {text: 'C. In the refrigerator'},
        ],
      },
      {
        question: 'What helped soldiers see at night?',
        options: [
          {text: 'A. Lantern', correct: true},
          {text: 'B. Umbrella'},
          {text: 'C. Balloon'},
        ],
      },
      {
        question: 'What did Rufus like to guard?',
        options: [
          {text: 'A. Kitchen', correct: true},
          {text: 'B. Clouds'},
          {text: 'C. Bicycle'},
        ],
      },
      {
        question: 'What could be hanging at the entrance to the camp?',
        options: [
          {text: 'A. Flag', correct: true},
          {text: 'B. Blanket'},
          {text: 'C. Backpack'},
        ],
      },
      {
        question: 'Who often gave assignments at the camp?',
        options: [
          {text: 'A. Centurion', correct: true},
          {text: 'B. Parrot'},
          {text: 'C. Duck'},
        ],
      },
      {
        question: 'What did the children do in the evening at the camp?',
        options: [
          {text: 'A. Riding the elevator'},
          {text: 'B. Listening to stories', correct: true},
          {text: 'C. Painting clouds'},
        ],
      },
    ],
  },
  {
    id: 'adventures',
    title: "The Centurion's Merry Adventures",
    questions: [
      {
        question: 'Who often hid things in the camp?',
        options: [
          {text: 'A. Rufus', correct: true},
          {text: 'B. Fish'},
          {text: 'C. Turtle'},
        ],
      },
      {
        question: 'What did Marcellus once lose?',
        options: [
          {text: 'A. Helmet', correct: true},
          {text: 'B. Bicycle'},
          {text: 'C. Umbrella'},
        ],
      },
      {
        question: 'Who repeated commands loudly?',
        options: [
          {text: 'A. Parrot', correct: true},
          {text: 'B. Cat'},
          {text: 'C. Goose'},
        ],
      },
      {
        question: 'What fell from the table during the holiday?',
        options: [
          {text: 'A. Pie', correct: true},
          {text: 'B. Book'},
          {text: 'C. Lantern'},
        ],
      },
      {
        question: 'What rolled out of the warehouse at night?',
        options: [
          {text: 'A. Watermelons', correct: true},
          {text: 'B. Balls'},
          {text: 'C. Hats'},
        ],
      },
      {
        question: 'What did Rufus sleep in once?',
        options: [
          {text: 'A. In a helmet', correct: true},
          {text: 'B. In a bucket'},
          {text: 'C. In a boat'},
        ],
      },
      {
        question: 'What did Rufus the dog like to eat?',
        options: [
          {text: 'A. Sausage', correct: true},
          {text: 'B. Ice'},
          {text: 'C. Bananas'},
        ],
      },
      {
        question: 'What happened during the race?',
        options: [
          {text: 'A. Lost a sandal', correct: true},
          {text: 'B. It snowed'},
          {text: 'C. The bridge broke'},
        ],
      },
      {
        question: 'Who won the race?',
        options: [
          {text: 'A. Livia', correct: true},
          {text: 'B. Marcellus'},
          {text: 'C. Rufus'},
        ],
      },
      {
        question: 'What did the parrot scream?',
        options: [
          {text: 'A. DO NOT TOUCH THE CAKE!', correct: true},
          {text: 'B. WHERE IS MY FISH?'},
          {text: 'C. TIME TO SLEEP!'},
        ],
      },
    ],
  },
  {
    id: 'camp-day',
    title: "Children's Day at the Camp",
    questions: [
      {
        question: 'What can you do at camp with friends?',
        options: [
          {text: 'A. Play', correct: true},
          {text: 'B. Sleep all day'},
          {text: 'C. Hide in a barrel'},
        ],
      },
      {
        question: 'What did the children often listen to in the evening?',
        options: [
          {text: 'A. Stories', correct: true},
          {text: 'B. Weather news'},
          {text: 'C. The sound of the refrigerator'},
        ],
      },
      {
        question: 'What is the best thing to take on a hike?',
        options: [
          {text: 'A. Good mood', correct: true},
          {text: 'B. TV'},
          {text: 'C. A big closet'},
        ],
      },
      {
        question: 'What do you need a team for?',
        options: [
          {text: 'A. To help each other', correct: true},
          {text: 'B. To eat more pie'},
          {text: 'C. To avoid washing dishes'},
        ],
      },
      {
        question: 'What is the most important thing in a fun game?',
        options: [
          {text: 'A. Friendship', correct: true},
          {text: 'B. Loud shoes'},
          {text: 'C. A big hat'},
        ],
      },
      {
        question: 'What can you do near the camp?',
        options: [
          {text: 'A. Seek adventure', correct: true},
          {text: 'B. Boil stones'},
          {text: 'C. Dye grass'},
        ],
      },
      {
        question: 'What did Marcellus do in the morning?',
        options: [
          {text: 'A. Checked the order', correct: true},
          {text: 'B. Danced with the duck'},
          {text: 'C. Hiding apples'},
        ],
      },
      {
        question: 'What did Rufus like?',
        options: [
          {text: 'A. Running', correct: true},
          {text: 'B. Knitting scarves'},
          {text: 'C. Drawing'},
        ],
      },
      {
        question: 'What was the mood at camp?',
        options: [
          {text: 'A. Cheerful', correct: true},
          {text: 'B. Sad'},
          {text: 'C. Sleepy'},
        ],
      },
      {
        question: 'What is the best thing after an adventure?',
        options: [
          {text: 'A. Telling a story to friends', correct: true},
          {text: 'B. Hiding sandals'},
          {text: 'C. Counting clouds'},
        ],
      },
    ],
  },
];

export const activities: ActivityIdea[] = [
  {
    id: 'activity-1',
    text: 'Grab two friends and head to the playground. Try playing hide-and-seek as if you were guards at an ancient camp.',
  },
  {
    id: 'activity-2',
    text: 'Build a small fort out of pillows and blankets at home. Add a secret entrance for your friends or toys.',
  },
  {
    id: 'activity-3',
    text: 'Take a bike or scooter and come up with your own adventure route around the house or park.',
  },
  {
    id: 'activity-4',
    text: 'Try drawing your own centurion shield. You can invent a symbol for your team or favorite game.',
  },
  {
    id: 'activity-5',
    text: 'Play silent guard with your friends. Who can walk the longest without making a sound?',
  },
  {
    id: 'activity-6',
    text: 'Arrange a little hero training: 10 jumps, 5 squats and a fun march around the room.',
  },
  {
    id: 'activity-7',
    text: 'Try building a tower out of books or boxes. The main thing is that it does not fall before its time.',
  },
  {
    id: 'activity-8',
    text: 'Ask your friends to come up with funny names for an imaginary Roman camp. The funniest one wins.',
  },
  {
    id: 'activity-9',
    text: 'Make a map of your yard or room secret area with your friends.',
  },
  {
    id: 'activity-10',
    text: 'Play Find the Treasure. Hide a small object and draw clues to help someone discover it.',
  },
  {
    id: 'activity-11',
    text: 'Try walking around the room with a book on your head, as if you were a real centurion on parade.',
  },
  {
    id: 'activity-12',
    text: 'Set up a home theater and act out a short funny skit about adventure camp.',
  },
  {
    id: 'activity-13',
    text: 'Make your own list of fun camp rules. For example: do not steal cookies from the cook.',
  },
  {
    id: 'activity-14',
    text: 'Play freeze. One player gives the order, and the others must freeze instantly.',
  },
  {
    id: 'activity-15',
    text: 'Go for a walk and try to find 5 interesting things around you: an unusual leaf, a pebble, or a funny cloud.',
  },
  {
    id: 'activity-16',
    text: 'Make an obstacle course with your friends out of pillows, boxes, or chairs.',
  },
  {
    id: 'activity-17',
    text: 'Try to come up with your own adventure team flag and paint it in bright colors.',
  },
  {
    id: 'activity-18',
    text: 'Have a day without boredom: come up with a new little game or task every hour.',
  },
  {
    id: 'activity-19',
    text: 'Play camp guards with friends, where one protects the treasure and the others try to find it.',
  },
  {
    id: 'activity-20',
    text: 'Before going to bed, come up with your own short story about the adventures of the centurion and tell it to someone in the family.',
  },
];
