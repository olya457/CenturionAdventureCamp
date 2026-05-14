import type {SavedItem, TabId} from '../types';

export type MainScreenProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (item: SavedItem) => void;
  onShare: (item: SavedItem) => void;
};
