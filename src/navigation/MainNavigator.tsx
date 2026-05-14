import React, {useMemo} from 'react';
import {ActivityScreen} from '../screens/ActivityScreen';
import {CampBoardScreen} from '../screens/CampBoardScreen';
import {LaughsScreen} from '../screens/LaughsScreen';
import {QuizzesScreen} from '../screens/QuizzesScreen';
import {SavedScreen} from '../screens/SavedScreen';
import {StoriesScreen} from '../screens/StoriesScreen';
import type {MainScreenProps} from '../screens/screenProps';
import type {SavedItem, TabId} from '../types';

type MainNavigatorProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  savedItems: SavedItem[];
  isSaved: (id: string) => boolean;
  toggleSave: (item: SavedItem) => void;
  onShare: (item: SavedItem) => void;
};

type ScreenContext = {
  screenProps: MainScreenProps;
  savedItems: SavedItem[];
};

const screens: Record<TabId, (context: ScreenContext) => React.JSX.Element> = {
  stories: ({screenProps}) => <StoriesScreen {...screenProps} />,
  laughs: ({screenProps}) => <LaughsScreen {...screenProps} />,
  quizzes: ({screenProps}) => <QuizzesScreen {...screenProps} />,
  activities: ({screenProps}) => <ActivityScreen {...screenProps} />,
  saved: ({screenProps, savedItems}) => (
    <SavedScreen {...screenProps} items={savedItems} />
  ),
  board: ({screenProps}) => <CampBoardScreen {...screenProps} />,
};

export function MainNavigator({
  activeTab,
  onTabChange,
  savedItems,
  isSaved,
  toggleSave,
  onShare,
}: MainNavigatorProps) {
  const screenProps = useMemo(
    () => ({
      activeTab,
      onTabChange,
      isSaved,
      toggleSave,
      onShare,
    }),
    [activeTab, isSaved, onShare, onTabChange, toggleSave],
  );

  return screens[activeTab]({screenProps, savedItems});
}
