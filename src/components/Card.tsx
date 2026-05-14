import React, {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../theme';
import {useAdaptive} from '../hooks/useAdaptive';

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({children, style}: CardProps) {
  const adaptive = useAdaptive();

  return (
    <View
      style={[
        styles.card,
        {
          width: adaptive.contentWidth,
          padding: adaptive.cardPadding,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    borderColor: colors.brown,
    borderRadius: 15,
    borderWidth: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.32,
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 0,
    elevation: 7,
  },
});
