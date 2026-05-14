import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {AppShell} from '../components/AppShell';
import {Card} from '../components/Card';
import {IconButton} from '../components/IconButton';
import {PrimaryButton} from '../components/PrimaryButton';
import {activities, type ActivityIdea} from '../data/content';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import type {SavedItem} from '../types';
import type {MainScreenProps} from './screenProps';

function activityToSaved(activity: ActivityIdea): SavedItem {
  return {
    id: `activity:${activity.id}`,
    type: 'activity',
    title: 'What to do today?',
    text: activity.text,
    imageKey: 'activityCrate',
  };
}

export function ActivityScreen({
  activeTab,
  onTabChange,
  isSaved,
  toggleSave,
  onShare,
}: MainScreenProps) {
  const [index, setIndex] = useState(0);
  const adaptive = useAdaptive();
  const activity = activities[index];
  const saved = useMemo(() => activityToSaved(activity), [activity]);

  const next = () => {
    setIndex(current => {
      const nextIndex = Math.floor(Math.random() * activities.length);
      return nextIndex === current
        ? (current + 1) % activities.length
        : nextIndex;
    });
  };

  return (
    <AppShell
      title="Activity Generator"
      activeTab={activeTab}
      onTabChange={onTabChange}>
      <Card
        style={[
          styles.heroCard,
          {
            marginBottom: adaptive.isTiny ? 18 : 30,
            minHeight: adaptive.isTiny ? 138 : 172,
          },
        ]}>
        <Image
          source={images.centurion}
          resizeMode="contain"
          style={[
            styles.centurion,
            {
              marginLeft: adaptive.isTiny ? -18 : -26,
              width: adaptive.isTiny ? 92 : adaptive.isNarrow ? 122 : 148,
              height: adaptive.isTiny ? 146 : adaptive.isNarrow ? 178 : 204,
            },
          ]}
        />
        <View
          style={[
            styles.heroCopy,
            {paddingVertical: adaptive.isTiny ? 16 : 26},
          ]}>
          <Text
            style={[
              styles.heroTitle,
              {
                fontSize: adaptive.isTiny ? 16 : 18,
                lineHeight: adaptive.isTiny ? 20 : 23,
              },
            ]}>
            Today is the time for a new adventure!
          </Text>
          <Text
            style={[
              styles.heroText,
              {
                fontSize: adaptive.isTiny ? 12 : 13,
                lineHeight: adaptive.isTiny ? 16 : 17,
                marginTop: adaptive.isTiny ? 8 : 12,
              },
            ]}>
            I have prepared for you random ideas for games, fun activities and
            little missions. Gather your friends, move, explore and make up your
            own stories with our camp.
          </Text>
        </View>
      </Card>
      <Card
        style={[
          styles.ideaCard,
          {
            paddingBottom: adaptive.isTiny ? 22 : 30,
            paddingTop: adaptive.isTiny ? 24 : 36,
          },
        ]}>
        <Text
          style={[
            styles.ideaTitle,
            {
              fontSize: adaptive.isTiny ? 19 : 22,
              lineHeight: adaptive.isTiny ? 24 : 27,
            },
          ]}>
          What to do today?
        </Text>
        <Text
          style={[
            styles.ideaText,
            {
              fontSize: adaptive.isTiny ? 12 : 13,
              lineHeight: adaptive.isTiny ? 17 : 18,
              marginTop: adaptive.isTiny ? 10 : 14,
              maxWidth: adaptive.isTiny ? 220 : 240,
            },
          ]}>
          {activity.text}
        </Text>
        <View
          style={[
            styles.actions,
            {
              gap: adaptive.isTiny ? 9 : 12,
              marginTop: adaptive.isTiny ? 20 : 28,
            },
          ]}>
          <PrimaryButton
            label="Next propose"
            onPress={next}
            style={[
              styles.nextButton,
              {
                minHeight: adaptive.isTiny ? 42 : 46,
                width: adaptive.isTiny ? 128 : 150,
              },
            ]}
          />
          <IconButton
            icon="❤️"
            label="Save activity"
            active={isSaved(saved.id)}
            onPress={() => toggleSave(saved)}
          />
          <IconButton
            icon="📤"
            label="Share activity"
            active
            onPress={() => onShare(saved)}
          />
        </View>
      </Card>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 0,
  },
  centurion: {
    alignSelf: 'flex-end',
  },
  heroCopy: {
    flex: 1,
    minWidth: 0,
  },
  heroTitle: {
    color: colors.black,
    fontWeight: '800',
    letterSpacing: 0,
  },
  heroText: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
  },
  ideaCard: {
    alignItems: 'center',
  },
  ideaTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  ideaText: {
    color: colors.black,
    fontWeight: '600',
    letterSpacing: 0,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 11,
  },
});
