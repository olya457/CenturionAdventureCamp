import React, {useCallback, useEffect, useState} from 'react';
import {Share, Vibration} from 'react-native';
import {initialTab} from './src/navigation/mainTabs';
import {MainNavigator} from './src/navigation/MainNavigator';
import {LoaderScreen} from './src/screens/LoaderScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {persistentStorage} from './src/storage/persistentStorage';
import type {SavedItem, TabId} from './src/types';

const savedKey = 'centurion.savedItems';

function vibrateOnSave() {
  try {
    Vibration.vibrate(35);
  } catch (error) {
    void error;
  }
}

function App(): React.JSX.Element {
  const [phase, setPhase] = useState<'loading' | 'onboarding' | 'app'>(
    'loading',
  );
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    persistentStorage.getJSON<SavedItem[]>(savedKey, []).then(setSavedItems);
  }, []);

  const isSaved = useCallback(
    (id: string) => savedItems.some(item => item.id === id),
    [savedItems],
  );

  const toggleSave = useCallback((item: SavedItem) => {
    setSavedItems(current => {
      const exists = current.some(saved => saved.id === item.id);
      const next = exists
        ? current.filter(saved => saved.id !== item.id)
        : [item, ...current];

      persistentStorage.setJSON(savedKey, next);

      if (!exists) {
        vibrateOnSave();
      }

      return next;
    });
  }, []);

  const shareItem = useCallback((item: SavedItem) => {
    Share.share({
      title: item.title,
      message: `${item.title}\n\n${item.text}`,
    }).catch(() => {});
  }, []);

  if (phase === 'loading') {
    return <LoaderScreen onComplete={() => setPhase('onboarding')} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onDone={() => setPhase('app')} />;
  }

  return (
    <MainNavigator
      activeTab={activeTab}
      isSaved={isSaved}
      onShare={shareItem}
      onTabChange={setActiveTab}
      savedItems={savedItems}
      toggleSave={toggleSave}
    />
  );
}

export default App;
