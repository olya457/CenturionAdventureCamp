import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {images} from '../assets';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';

type LoaderScreenProps = {
  onComplete: () => void;
};

const isTestEnvironment =
  (globalThis as {process?: {env?: {JEST_WORKER_ID?: string}}}).process?.env
    ?.JEST_WORKER_ID !== undefined;

export function LoaderScreen({onComplete}: LoaderScreenProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const adaptive = useAdaptive();

  useEffect(() => {
    if (isTestEnvironment) {
      progress.setValue(1);
      return;
    }

    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start();

    const timer = setTimeout(onComplete, 5000);

    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [onComplete, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['8%', '100%'],
  });

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
      <SafeAreaView
        style={[
          styles.safeArea,
          {paddingHorizontal: adaptive.isTiny ? 18 : 28},
        ]}>
        <View
          style={[
            styles.webPanel,
            {
              maxWidth: adaptive.isTiny ? 260 : 286,
              minHeight: adaptive.isTiny ? 152 : 174,
              padding: adaptive.isTiny ? 15 : 18,
            },
          ]}>
          <View style={styles.browserRow}>
            <View style={[styles.dot, styles.redDot]} />
            <View style={[styles.dot, styles.goldDot]} />
            <View style={[styles.dot, styles.greenDot]} />
          </View>
          <Text style={[styles.title, {fontSize: adaptive.isTiny ? 21 : 24}]}>
            Centurion Camp
          </Text>
          <Text
            style={[styles.subtitle, {fontSize: adaptive.isTiny ? 13 : 14}]}>
            Adventure scroll is opening
          </Text>
          <View
            style={[
              styles.track,
              {
                height: adaptive.isTiny ? 12 : 14,
                marginTop: adaptive.isTiny ? 18 : 24,
              },
            ]}>
            <Animated.View style={[styles.fill, {width}]} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webPanel: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.brown,
    backgroundColor: 'rgba(255, 250, 240, 0.94)',
    shadowColor: colors.black,
    shadowOpacity: 0.28,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 14,
    elevation: 8,
  },
  browserRow: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 20,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  redDot: {
    backgroundColor: colors.red,
  },
  goldDot: {
    backgroundColor: colors.gold,
  },
  greenDot: {
    backgroundColor: colors.green,
  },
  title: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.brownDark,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: 8,
    textAlign: 'center',
  },
  track: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#e5d4a5',
    borderColor: colors.brown,
    borderWidth: 1,
  },
  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.red,
  },
});
