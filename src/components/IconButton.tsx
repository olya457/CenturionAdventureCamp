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

type IconButtonProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  active?: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  onPress,
  active,
  label,
  style,
}: IconButtonProps) {
  const adaptive = useAdaptive();
  const size = adaptive.isTiny ? 40 : 46;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      activeOpacity={0.86}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: adaptive.isTiny ? 11 : 13,
        },
        active ? styles.active : styles.idle,
        style,
      ]}>
      <Text
        style={[
          styles.icon,
          {
            fontSize: adaptive.isTiny ? 19 : 22,
            lineHeight: adaptive.isTiny ? 23 : 26,
          },
        ]}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  active: {
    backgroundColor: colors.red,
    borderColor: colors.redDark,
  },
  idle: {
    backgroundColor: colors.white,
    borderColor: colors.brown,
  },
  icon: {},
});
