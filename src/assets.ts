import type {ImageSourcePropType} from 'react-native';

export const images = {
  background: require('./assets/images/camp-background.png'),
  centurion: require('./assets/images/centurion.png'),
  laughsHero: require('./assets/images/laughs-hero.png'),
  quizHero: require('./assets/images/quiz-hero.png'),
  activityCrate: require('./assets/images/activity-crate.png'),
  storyLostHelmet: require('./assets/images/story-lost-helmet.png'),
  storyHugePie: require('./assets/images/story-huge-pie.png'),
  storyNightNoise: require('./assets/images/story-night-noise.png'),
  storySandalRace: require('./assets/images/story-sandal-race.png'),
  storySmartParrot: require('./assets/images/story-smart-parrot.png'),
} satisfies Record<string, ImageSourcePropType>;

export type ImageKey = keyof typeof images;
