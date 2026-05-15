import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {images} from '../assets';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import {PrimaryButton} from '../components/PrimaryButton';

const slides = [
  {
    title: 'Welcome To The Adventure Camp',
    text: 'Centurion Marcellus has prepared for you funny stories, funny adventures and unusual characters from the Roman camp.',
    button: 'OKAY',
    image: images.centurion,
    imageStyle: 'centurion',
  },
  {
    title: 'Laugh With The Centurion',
    text: 'Discover funny jokes, strange situations and funny moments from the life of the camp. Some of them will definitely surprise you.',
    button: 'CONTINUE',
    image: images.laughsHero,
    imageStyle: 'wide',
  },
  {
    title: 'Test Yourself With Quizzes',
    text: 'Answer thematic questions, learn interesting things and pass small tests together with the heroes of the camp.',
    button: 'NEXT',
    image: images.quizHero,
    imageStyle: 'quiz',
  },
  {
    title: 'Find New Ideas For Games',
    text: 'Receive random suggestions for activities, games and fun adventures with friends at home or on the street.',
    button: 'START',
    image: images.activityCrate,
    imageStyle: 'crate',
  },
] as const;

type OnboardingScreenProps = {
  onDone: () => void;
};

export function OnboardingScreen({onDone}: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);
  const adaptive = useAdaptive();
  const slide = slides[index];
  const heroHeight = adaptive.isTiny ? 210 : adaptive.isShort ? 270 : 340;
  const cardMinHeight = adaptive.isTiny ? 248 : adaptive.isShort ? 292 : 326;

  const next = () => {
    if (index === slides.length - 1) {
      onDone();
      return;
    }

    setIndex(current => current + 1);
  };

  return (
    <ImageBackground
      source={images.background}
      blurRadius={index === 0 ? 0 : 3}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.wrap,
            {
              paddingBottom: adaptive.isTiny ? 24 : 44,
              paddingHorizontal: adaptive.horizontal,
            },
          ]}>
          <View
            style={[
              styles.heroWrap,
              {
                height: heroHeight,
                marginBottom: adaptive.isTiny ? -42 : -54,
              },
            ]}>
            <Image
              source={slide.image}
              resizeMode="contain"
              style={[
                styles.hero,
                slide.imageStyle === 'centurion' && {
                  width: adaptive.contentWidth * (adaptive.isTiny ? 0.7 : 0.78),
                  height: heroHeight + (adaptive.isTiny ? 28 : 42),
                },
                slide.imageStyle === 'wide' && {
                  width: adaptive.contentWidth * 0.95,
                  height: heroHeight * (adaptive.isTiny ? 0.68 : 0.78),
                  marginTop: adaptive.isShort ? 12 : 34,
                },
                slide.imageStyle === 'quiz' && {
                  width: adaptive.contentWidth * 0.88,
                  height: heroHeight * (adaptive.isTiny ? 0.92 : 1),
                  marginTop: adaptive.isShort ? 4 : 18,
                },
                slide.imageStyle === 'crate' && {
                  width: adaptive.contentWidth * 0.9,
                  height: heroHeight,
                  marginTop: adaptive.isShort ? 0 : 8,
                },
                Platform.OS === 'android' && styles.androidHeroLift,
              ]}
            />
          </View>
          <View
            style={[
              styles.card,
              {
                width: adaptive.contentWidth,
                minHeight: cardMinHeight,
                paddingBottom: adaptive.isTiny ? 22 : 32,
                paddingHorizontal: adaptive.isTiny
                  ? 16
                  : adaptive.isNarrow
                  ? 22
                  : 30,
                paddingTop: adaptive.isTiny ? 54 : 72,
              },
            ]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              minimumFontScale={0.78}
              style={[
                styles.title,
                {
                  fontSize: adaptive.isTiny ? 18 : adaptive.isNarrow ? 20 : 21,
                  lineHeight: adaptive.isTiny ? 23 : 26,
                },
              ]}>
              {slide.title}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: adaptive.isTiny ? 13 : adaptive.isNarrow ? 14 : 16,
                  lineHeight: adaptive.isTiny ? 18 : 21,
                  marginTop: adaptive.isTiny ? 10 : 16,
                },
              ]}>
              {slide.text}
            </Text>
            <PrimaryButton
              label={slide.button}
              onPress={next}
              style={[
                styles.button,
                {
                  marginTop: adaptive.isTiny ? 22 : 36,
                  width: adaptive.isTiny ? 164 : 188,
                },
              ]}
            />
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
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heroWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  hero: {
    maxWidth: '100%',
  },
  androidHeroLift: {
    transform: [{translateY: -50}],
  },
  card: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.yellow,
    borderColor: colors.brown,
    borderRadius: 11,
    borderWidth: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 0,
    elevation: 7,
  },
  title: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  button: {},
});
