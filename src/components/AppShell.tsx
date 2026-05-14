import React, {PropsWithChildren} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {images} from '../assets';
import {useAdaptive} from '../hooks/useAdaptive';
import {platformSpacing} from '../theme';
import type {TabId} from '../types';
import {FloatingNav} from './FloatingNav';
import {HeaderBar} from './HeaderBar';

type AppShellProps = PropsWithChildren<{
  title: string;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack?: () => void;
  showNav?: boolean;
  scrollEnabled?: boolean;
}>;

export function AppShell({
  title,
  activeTab,
  onTabChange,
  onBack,
  showNav = true,
  scrollEnabled = true,
  children,
}: AppShellProps) {
  const adaptive = useAdaptive();
  const bottomPadding = showNav
    ? adaptive.navHeight +
      platformSpacing.navBottom +
      (adaptive.isTiny ? 14 : 26)
    : platformSpacing.navBottom + (adaptive.isTiny ? 10 : 18);

  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.inner, {paddingTop: platformSpacing.top}]}>
          <HeaderBar title={title} onBack={onBack} />
          <ScrollView
            bounces={false}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.content,
              {
                paddingTop: adaptive.isTiny ? 14 : adaptive.isShort ? 20 : 28,
                paddingBottom: bottomPadding,
                paddingHorizontal: adaptive.horizontal,
              },
            ]}>
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
      {showNav ? (
        <FloatingNav activeTab={activeTab} onTabChange={onTabChange} />
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
});
