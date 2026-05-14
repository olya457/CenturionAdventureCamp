import type {TabId} from '../types';

export type MainTab = {
  id: TabId;
  icon: string;
  label: string;
};

export const initialTab: TabId = 'stories';

export const mainTabs: MainTab[] = [
  {id: 'stories', icon: '📖', label: 'Stories'},
  {id: 'laughs', icon: '😄', label: 'Laughs'},
  {id: 'quizzes', icon: '❓', label: 'Quizzes'},
  {id: 'activities', icon: '🧭', label: 'Activities'},
  {id: 'saved', icon: '❤️', label: 'Saved'},
  {id: 'board', icon: '🔤', label: 'Word camp'},
];
