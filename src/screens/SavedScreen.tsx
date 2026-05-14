import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {AppShell} from '../components/AppShell';
import {Card} from '../components/Card';
import {IconButton} from '../components/IconButton';
import {PrimaryButton} from '../components/PrimaryButton';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import type {SavedItem} from '../types';
import type {MainScreenProps} from './screenProps';

type SavedScreenProps = MainScreenProps & {
  items: SavedItem[];
};

export function SavedScreen({
  activeTab,
  onTabChange,
  items,
  toggleSave,
  onShare,
}: SavedScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const adaptive = useAdaptive();
  const selected = useMemo(
    () => items.find(item => item.id === selectedId),
    [items, selectedId],
  );

  if (selected) {
    const paragraphs = selected.text.split('\n\n');

    return (
      <AppShell
        title="Saved"
        activeTab={activeTab}
        onTabChange={onTabChange}
        onBack={() => setSelectedId(null)}
        showNav={false}>
        <Card style={styles.detailCard}>
          {selected.imageKey ? (
            <Image
              source={images[selected.imageKey]}
              resizeMode={
                selected.imageKey === 'centurion' ? 'contain' : 'cover'
              }
              style={[
                selected.imageKey === 'centurion'
                  ? styles.detailPersonImage
                  : styles.detailImage,
                {
                  height: adaptive.isTiny ? 128 : adaptive.isShort ? 150 : 182,
                  marginBottom: adaptive.isTiny ? 16 : 24,
                  width:
                    selected.imageKey === 'centurion' && adaptive.isTiny
                      ? 104
                      : undefined,
                },
              ]}
            />
          ) : null}
          <View
            style={[styles.detailActions, {gap: adaptive.isTiny ? 12 : 16}]}>
            <IconButton
              icon="❤️"
              label="Remove saved item"
              active
              onPress={() => {
                toggleSave(selected);
                setSelectedId(null);
              }}
            />
            <IconButton
              icon="📤"
              label="Share saved item"
              active
              onPress={() => onShare(selected)}
            />
          </View>
          <Text
            style={[
              styles.detailTitle,
              {
                fontSize: adaptive.isTiny ? 16 : 18,
                lineHeight: adaptive.isTiny ? 20 : 22,
                marginTop: adaptive.isTiny ? 18 : 24,
              },
            ]}>
            {selected.title}
          </Text>
          {paragraphs.map((paragraph, index) => (
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
    <AppShell title="Saved" activeTab={activeTab} onTabChange={onTabChange}>
      {items.length === 0 ? (
        <>
          <Image
            source={images.centurion}
            resizeMode="contain"
            style={[
              styles.emptyHero,
              {
                height: adaptive.isTiny ? 205 : adaptive.isShort ? 260 : 340,
                marginBottom: adaptive.isTiny ? -22 : -28,
              },
            ]}
          />
          <Card
            style={[
              styles.emptyCard,
              {paddingVertical: adaptive.isTiny ? 26 : 38},
            ]}>
            <View
              style={[
                styles.emptyHeart,
                {
                  width: adaptive.isTiny ? 66 : 80,
                  height: adaptive.isTiny ? 66 : 80,
                },
              ]}>
              <Text
                style={[
                  styles.emptyHeartText,
                  {
                    fontSize: adaptive.isTiny ? 31 : 38,
                    lineHeight: adaptive.isTiny ? 37 : 44,
                  },
                ]}>
                ❤️
              </Text>
            </View>
            <Text
              style={[
                styles.emptyText,
                {
                  fontSize: adaptive.isTiny ? 15 : 17,
                  lineHeight: adaptive.isTiny ? 20 : 23,
                  marginTop: adaptive.isTiny ? 18 : 26,
                },
              ]}>
              Oops, you do not have a save, buddy! Come back after saving!
            </Text>
          </Card>
        </>
      ) : (
        items.map(item => (
          <Card
            key={item.id}
            style={[
              styles.itemCard,
              {marginBottom: adaptive.isTiny ? 18 : 24},
            ]}>
            {item.imageKey ? (
              <Image
                source={images[item.imageKey]}
                resizeMode={item.imageKey === 'centurion' ? 'contain' : 'cover'}
                style={[
                  item.imageKey === 'centurion'
                    ? styles.personImage
                    : styles.itemImage,
                  {
                    height: adaptive.isTiny
                      ? 104
                      : adaptive.isShort
                      ? 120
                      : 154,
                    width:
                      item.imageKey === 'centurion' && adaptive.isTiny
                        ? 96
                        : undefined,
                  },
                ]}
              />
            ) : null}
            <Text
              style={[
                styles.itemTitle,
                {
                  fontSize: adaptive.isTiny ? 16 : 17,
                  lineHeight: adaptive.isTiny ? 20 : 21,
                },
              ]}>
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              style={[
                styles.itemText,
                {
                  fontSize: adaptive.isTiny ? 12 : 13,
                  lineHeight: adaptive.isTiny ? 17 : 18,
                  marginTop: adaptive.isTiny ? 8 : 10,
                },
              ]}>
              {item.text}
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
                onPress={() => setSelectedId(item.id)}
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
                label="Remove saved item"
                active
                onPress={() => toggleSave(item)}
              />
              <IconButton
                icon="📤"
                label="Share saved item"
                active
                onPress={() => onShare(item)}
              />
            </View>
          </Card>
        ))
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  emptyHero: {
    width: '92%',
    marginTop: -12,
  },
  emptyCard: {
    alignItems: 'center',
  },
  emptyHeart: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderColor: colors.redDark,
    borderWidth: 1,
  },
  emptyHeartText: {},
  emptyText: {
    color: colors.black,
    fontWeight: '800',
    letterSpacing: 0,
    maxWidth: 250,
    textAlign: 'center',
  },
  itemCard: {},
  itemImage: {
    width: '100%',
    borderRadius: 14,
    marginBottom: 14,
  },
  personImage: {
    width: 118,
    alignSelf: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  itemText: {
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
  detailPersonImage: {
    width: 130,
    alignSelf: 'center',
    marginBottom: 20,
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
