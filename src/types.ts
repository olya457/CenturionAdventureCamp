import type {ImageKey} from './assets';

export type TabId =
  | 'stories'
  | 'laughs'
  | 'quizzes'
  | 'activities'
  | 'saved'
  | 'board';

export type SavedType = 'story' | 'laugh' | 'activity';

export type SavedItem = {
  id: string;
  type: SavedType;
  title: string;
  text: string;
  imageKey?: ImageKey;
};
