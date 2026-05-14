import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {Card} from '../components/Card';
import {AppShell} from '../components/AppShell';
import {IconButton} from '../components/IconButton';
import {PrimaryButton} from '../components/PrimaryButton';
import {stories, type Story} from '../data/content';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import type {SavedItem} from '../types';
import type {MainScreenProps} from './screenProps';

function storyToSaved(story: Story): SavedItem {
  return {
    id: `story:${story.id}`,
    type: 'story',
    title: story.title,
    text: story.paragraphs.join('\n\n'),
    imageKey: story.imageKey,
  };
}

export function StoriesScreen({
  activeTab,
  onTabChange,
  isSaved,
  toggleSave,
  onShare,
}: MainScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const adaptive = useAdaptive();
  const goBackToList = useCallback(() => {
    setSelectedId(null);
  }, []);
  const selected = useMemo(
    () => stories.find(story => story.id === selectedId),
    [selectedId],
  );

  useEffect(() => {
    if (!selected) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBackToList();
        return true;
      },
    );

    return () => subscription.remove();
  }, [goBackToList, selected]);

  if (selected) {
    const saved = storyToSaved(selected);

    return (
      <AppShell
        title="Stories Of Centurion"
        activeTab={activeTab}
        onTabChange={onTabChange}
        onBack={goBackToList}
        showNav={false}>
        <Card style={styles.detailCard}>
          <Image
            source={images[selected.imageKey]}
            resizeMode="cover"
            style={[
              styles.detailImage,
              {
                height: adaptive.isTiny ? 128 : adaptive.isShort ? 150 : 180,
                marginBottom: adaptive.isTiny ? 18 : 24,
              },
            ]}
          />
          <View
            style={[styles.detailActions, {gap: adaptive.isTiny ? 12 : 16}]}>
            <IconButton
              icon="❤️"
              label="Save story"
              active={isSaved(saved.id)}
              onPress={() => toggleSave(saved)}
            />
            <IconButton
              icon="📤"
              label="Share story"
              active
              onPress={() => onShare(saved)}
            />
          </View>
          <Text
            style={[
              styles.detailTitle,
              {
                fontSize: adaptive.isTiny ? 16 : 18,
                lineHeight: adaptive.isTiny ? 20 : 22,
                marginTop: adaptive.isTiny ? 20 : 28,
              },
            ]}>
            {selected.title}
          </Text>
          {selected.paragraphs.map((paragraph, index) => (
            <Text
              key={`${selected.id}-${index}`}
              style={[
                styles.paragraph,
                {
                  fontSize: adaptive.isTiny ? 12 : 13,
                  lineHeight: adaptive.isTiny ? 17 : 18,
                  marginTop: adaptive.isTiny ? 12 : 16,
                },
              ]}>
              {paragraph}
            </Text>
          ))}
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Stories Of Centurion"
      activeTab={activeTab}
      onTabChange={onTabChange}>
      {stories.map(story => {
        const saved = storyToSaved(story);

        return (
          <Card
            key={story.id}
            style={[
              styles.storyCard,
              {marginBottom: adaptive.isTiny ? 18 : 24},
            ]}>
            <Image
              source={images[story.imageKey]}
              resizeMode="cover"
              style={[
                styles.storyImage,
                {height: adaptive.isTiny ? 118 : adaptive.isShort ? 142 : 180},
              ]}
            />
            <Text
              style={[
                styles.cardTitle,
                {
                  fontSize: adaptive.isTiny ? 16 : 17,
                  lineHeight: adaptive.isTiny ? 20 : 21,
                },
              ]}>
              {story.title}
            </Text>
            <Text
              style={[
                styles.excerpt,
                {
                  fontSize: adaptive.isTiny ? 12 : 13,
                  lineHeight: adaptive.isTiny ? 16 : 17,
                  marginTop: adaptive.isTiny ? 8 : 10,
                },
              ]}>
              {story.excerpt}
            </Text>
            <View
              style={[
                styles.row,
                {
                  gap: adaptive.isTiny ? 10 : 14,
                  marginTop: adaptive.isTiny ? 14 : 18,
                },
              ]}>
              <PrimaryButton
                label="Open"
                onPress={() => setSelectedId(story.id)}
                style={[
                  styles.openButton,
                  {
                    minHeight: adaptive.isTiny ? 40 : 46,
                    width: adaptive.isTiny ? 84 : 98,
                  },
                ]}
              />
              <IconButton
                icon="❤️"
                label="Save story"
                active={isSaved(saved.id)}
                onPress={() => toggleSave(saved)}
              />
              <IconButton
                icon="📤"
                label="Share story"
                active
                onPress={() => onShare(saved)}
              />
            </View>
          </Card>
        );
      })}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  storyCard: {},
  storyImage: {
    width: '100%',
    borderRadius: 14,
    marginBottom: 14,
  },
  cardTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  excerpt: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openButton: {
    borderRadius: 11,
  },
  detailCard: {
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    borderRadius: 14,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  paragraph: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
});
