import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme';
import {useAdaptive} from '../hooks/useAdaptive';

type PrimaryButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  tone?: 'red' | 'gold' | 'dark' | 'green' | 'coral' | 'white';
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  tone = 'red',
  disabled,
}: PrimaryButtonProps) {
  const adaptive = useAdaptive();
  const toneStyle = styles[tone];
  const isLight = tone === 'gold' || tone === 'white';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.86}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        {
          minHeight: adaptive.isTiny ? 44 : adaptive.isShort ? 50 : 56,
          borderRadius: adaptive.isTiny ? 12 : 17,
          paddingHorizontal: adaptive.isTiny ? 12 : 18,
        },
        toneStyle,
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.74}
        style={[
          styles.text,
          {fontSize: adaptive.isTiny ? 14 : 16},
          isLight && styles.darkText,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.redDark,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'center',
  },
  darkText: {
    color: colors.black,
  },
  red: {
    backgroundColor: colors.red,
  },
  gold: {
    backgroundColor: colors.gold,
    borderColor: '#a16b00',
  },
  dark: {
    backgroundColor: colors.black,
    borderColor: colors.brownDark,
  },
  green: {
    backgroundColor: colors.green,
    borderColor: '#0c8f12',
  },
  coral: {
    backgroundColor: colors.coral,
    borderColor: '#b95136',
  },
  white: {
    backgroundColor: colors.white,
    borderColor: colors.brown,
  },
  disabled: {
    opacity: 0.6,
  },
});
