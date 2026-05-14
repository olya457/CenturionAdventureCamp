import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {AppShell} from '../components/AppShell';
import {Card} from '../components/Card';
import {IconButton} from '../components/IconButton';
import {laughs, type Laugh} from '../data/content';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import type {SavedItem} from '../types';
import type {MainScreenProps} from './screenProps';

function laughToSaved(laugh: Laugh): SavedItem {
  return {
    id: `laugh:${laugh.id}`,
    type: 'laugh',
    title: laugh.title,
    text: laugh.text,
    imageKey: 'centurion',
  };
}

export function LaughsScreen({
  activeTab,
  onTabChange,
  onShare,
}: MainScreenProps) {
  const adaptive = useAdaptive();

  return (
    <AppShell
      title="Centurion Laughs"
      activeTab={activeTab}
      onTabChange={onTabChange}>
      {laughs.map(laugh => {
        const saved = laughToSaved(laugh);

        return (
          <Card
            key={laugh.id}
            style={[styles.card, {marginBottom: adaptive.isTiny ? 16 : 22}]}>
            <View style={[styles.laughRow, {gap: adaptive.isTiny ? 8 : 16}]}>
              <Image
                source={images.centurion}
                resizeMode="contain"
                style={[
                  styles.image,
                  {
                    width: adaptive.isTiny ? 82 : adaptive.isNarrow ? 104 : 124,
                    height: adaptive.isTiny
                      ? 132
                      : adaptive.isNarrow
                      ? 168
                      : 196,
                  },
                ]}
              />
              <View style={styles.copy}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: adaptive.isTiny ? 15 : 17,
                      marginBottom: adaptive.isTiny ? 8 : 12,
                    },
                  ]}>
                  {laugh.title}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: adaptive.isTiny ? 12 : 14,
                      lineHeight: adaptive.isTiny ? 17 : 19,
                    },
                  ]}>
                  {laugh.text}
                </Text>
                <View
                  style={[
                    styles.buttons,
                    {
                      gap: adaptive.isTiny ? 10 : 14,
                      marginTop: adaptive.isTiny ? 14 : 18,
                    },
                  ]}>
                  <IconButton
                    icon="📤"
                    label="Share laugh"
                    active
                    onPress={() => onShare(saved)}
                  />
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  card: {},
  laughRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginLeft: -8,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  text: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
  },
  buttons: {
    flexDirection: 'row',
  },
});
