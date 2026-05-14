import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';
import {useAdaptive} from '../hooks/useAdaptive';

type HeaderBarProps = {
  title: string;
  onBack?: () => void;
};

export function HeaderBar({title, onBack}: HeaderBarProps) {
  const adaptive = useAdaptive();

  return (
    <View
      style={[
        styles.header,
        {
          width: adaptive.contentWidth,
          height: adaptive.headerHeight,
        },
      ]}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={onBack}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : null}
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.75}
        style={[
          styles.title,
          {
            paddingHorizontal: onBack
              ? adaptive.isTiny
                ? 46
                : 58
              : adaptive.isTiny
              ? 16
              : 22,
            fontSize: adaptive.isTiny ? 15 : adaptive.isNarrow ? 17 : 19,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.brown,
    borderRadius: 20,
    borderWidth: 1,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 10,
    zIndex: 2,
    elevation: 2,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.black,
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 40,
  },
  title: {
    color: colors.black,
    fontWeight: '800',
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
