import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
  const trackWidth = Math.min(
    adaptive.contentWidth * (adaptive.isTiny ? 0.74 : 0.78),
    adaptive.isTiny ? 230 : 286,
  );
  const trackHeight = adaptive.isTiny ? 11 : 13;
  const thumbSize = adaptive.isTiny ? 28 : 32;

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
    outputRange: [thumbSize * 0.5, trackWidth],
  });
  const thumbTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth - thumbSize],
  });
  const thumbScale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.94, 1.08, 0.94],
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
            styles.sliderWrap,
            {
              height: thumbSize,
              width: trackWidth,
            },
          ]}>
          <View
            style={[
              styles.track,
              {
                borderRadius: trackHeight,
                height: trackHeight,
              },
            ]}>
            <Animated.View style={[styles.fill, {width}]} />
          </View>
          <Animated.View
            style={[
              styles.thumb,
              {
                borderRadius: thumbSize / 2,
                height: thumbSize,
                transform: [{translateX: thumbTranslate}, {scale: thumbScale}],
                width: thumbSize,
              },
            ]}
          />
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
  sliderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.22,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 10,
    elevation: 5,
  },
  track: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 250, 240, 0.72)',
    borderColor: colors.brown,
    borderWidth: 1,
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.red,
  },
  thumb: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.gold,
    borderColor: colors.brownDark,
    borderWidth: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 6,
  },
});
