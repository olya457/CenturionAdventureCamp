import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {AppShell} from '../components/AppShell';
import {Card} from '../components/Card';
import {PrimaryButton} from '../components/PrimaryButton';
import {quizzes} from '../data/content';
import {useAdaptive} from '../hooks/useAdaptive';
import {colors} from '../theme';
import type {MainScreenProps} from './screenProps';

export function QuizzesScreen({activeTab, onTabChange}: MainScreenProps) {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const adaptive = useAdaptive();
  const quiz = useMemo(
    () => quizzes.find(item => item.id === quizId),
    [quizId],
  );

  const openQuiz = (id: string) => {
    setQuizId(id);
    setQuestionIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  };

  const goBack = () => {
    setQuizId(null);
    setQuestionIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  };

  if (quiz) {
    const question = quiz.questions[questionIndex];
    const reveal = selectedIndex !== null;
    const count = quiz.questions.length;

    const nextQuestion = () => {
      if (questionIndex === count - 1) {
        setFinished(true);
        return;
      }

      setQuestionIndex(current => current + 1);
      setSelectedIndex(null);
    };

    const chooseAnswer = (index: number) => {
      if (reveal || finished) {
        return;
      }

      setSelectedIndex(index);

      if (question.options[index].correct) {
        setScore(current => current + 1);
      }
    };

    return (
      <AppShell
        title={quiz.title}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onBack={goBack}
        showNav={false}>
        {finished ? (
          <Card
            style={[
              styles.finishCard,
              {
                paddingBottom: adaptive.isTiny ? 26 : 34,
                paddingTop: adaptive.isTiny ? 26 : 34,
              },
            ]}>
            <Text
              style={[
                styles.finishEmoji,
                {
                  fontSize: adaptive.isTiny ? 52 : 64,
                  lineHeight: adaptive.isTiny ? 60 : 72,
                },
              ]}>
              🏆
            </Text>
            <Text
              style={[
                styles.finishTitle,
                {
                  fontSize: adaptive.isTiny ? 19 : 22,
                  marginTop: adaptive.isTiny ? 4 : 8,
                },
              ]}>
              Quiz Completed
            </Text>
            <Text
              style={[
                styles.finishScore,
                {
                  fontSize: adaptive.isTiny ? 16 : 18,
                  marginTop: adaptive.isTiny ? 8 : 12,
                },
              ]}>
              You scored {score} of {count}
            </Text>
            <Text
              style={[
                styles.finishText,
                {
                  fontSize: adaptive.isTiny ? 13 : 14,
                  lineHeight: adaptive.isTiny ? 18 : 20,
                },
              ]}>
              Marcellus adds one bright ribbon to your camp banner.
            </Text>
            <PrimaryButton
              label="Try Again"
              onPress={() => openQuiz(quiz.id)}
              style={styles.finishButton}
            />
            <PrimaryButton
              label="Choose Quiz"
              onPress={goBack}
              tone="gold"
              style={styles.finishButton}
            />
          </Card>
        ) : (
          <>
            <Card
              style={[
                styles.quizCard,
                {marginBottom: adaptive.isTiny ? 22 : 32},
              ]}>
              <View
                style={[
                  styles.banner,
                  {
                    height: adaptive.isTiny ? 88 : 112,
                    paddingRight: adaptive.isTiny ? 16 : 26,
                  },
                ]}>
                <Image
                  source={images.quizHero}
                  resizeMode="contain"
                  style={[
                    styles.bannerImage,
                    {
                      height: adaptive.isTiny ? 104 : 132,
                      width: adaptive.isTiny ? 124 : 156,
                    },
                  ]}
                />
                <View style={styles.counter}>
                  <Text
                    style={[
                      styles.counterLabel,
                      {fontSize: adaptive.isTiny ? 12 : 14},
                    ]}>
                    Question:
                  </Text>
                  <Text
                    style={[
                      styles.counterNumber,
                      {fontSize: adaptive.isTiny ? 20 : 24},
                    ]}>
                    {questionIndex + 1}/{count}
                  </Text>
                </View>
              </View>
              <Text
                adjustsFontSizeToFit
                numberOfLines={2}
                minimumFontScale={0.78}
                style={[
                  styles.question,
                  {
                    fontSize: adaptive.isTiny
                      ? 16
                      : adaptive.isNarrow
                      ? 18
                      : 20,
                    lineHeight: adaptive.isTiny ? 21 : 25,
                    marginTop: adaptive.isTiny ? 22 : 34,
                    paddingHorizontal: adaptive.isTiny ? 8 : 18,
                  },
                ]}>
                {question.question}
              </Text>
              <View
                style={[
                  styles.answers,
                  {
                    gap: adaptive.isTiny ? 10 : 14,
                    marginTop: adaptive.isTiny ? 22 : 34,
                  },
                ]}>
                {question.options.map((option, index) => {
                  const chosen = selectedIndex === index;
                  const correct = option.correct === true;
                  const tone = !reveal
                    ? 'red'
                    : correct
                    ? 'green'
                    : chosen
                    ? 'dark'
                    : 'coral';
                  const label =
                    reveal && chosen && !correct
                      ? `✕ ${option.text}`
                      : option.text;

                  return (
                    <PrimaryButton
                      key={`${question.question}-${option.text}`}
                      label={label}
                      onPress={() => chooseAnswer(index)}
                      tone={tone}
                      style={[
                        styles.answer,
                        {
                          borderRadius: adaptive.isTiny ? 16 : 20,
                          minHeight: adaptive.isTiny ? 52 : 66,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            </Card>
            <PrimaryButton
              label={reveal ? 'NEXT QUESTION' : 'SKIP QUESTION'}
              tone="gold"
              onPress={nextQuestion}
              style={[
                styles.skip,
                {
                  borderRadius: adaptive.isTiny ? 14 : 17,
                  minHeight: adaptive.isTiny ? 52 : 66,
                  width: adaptive.contentWidth - (adaptive.isTiny ? 8 : 18),
                },
              ]}
            />
          </>
        )}
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Roman Mini Quizzes"
      activeTab={activeTab}
      onTabChange={onTabChange}>
      <Card
        style={[
          styles.chooseCard,
          {
            paddingTop: adaptive.isTiny ? 24 : 34,
          },
        ]}>
        <Text
          style={[
            styles.chooseTitle,
            {
              fontSize: adaptive.isTiny ? 16 : 18,
              marginBottom: adaptive.isTiny ? 16 : 22,
            },
          ]}>
          CHOOSE A QUIZ:
        </Text>
        {quizzes.map(item => (
          <PrimaryButton
            key={item.id}
            label={item.title}
            onPress={() => openQuiz(item.id)}
            style={[
              styles.quizButton,
              {marginBottom: adaptive.isTiny ? 10 : 14},
            ]}
          />
        ))}
        <Image
          source={images.quizHero}
          resizeMode="contain"
          style={[
            styles.chooseImage,
            {
              height: adaptive.isTiny ? 150 : adaptive.isShort ? 192 : 230,
              marginTop: adaptive.isTiny ? 0 : 8,
            },
          ]}
        />
      </Card>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  chooseCard: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 0,
  },
  chooseTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  quizButton: {
    alignSelf: 'stretch',
  },
  chooseImage: {
    width: '86%',
    marginBottom: -18,
  },
  quizCard: {
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.brown,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerImage: {
    marginLeft: 8,
    marginTop: 10,
  },
  counter: {
    alignItems: 'flex-end',
  },
  counterLabel: {
    color: colors.white,
    fontWeight: '500',
    letterSpacing: 0,
  },
  counterNumber: {
    color: colors.white,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 2,
  },
  question: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  answers: {
    alignSelf: 'stretch',
  },
  answer: {},
  skip: {
    alignSelf: 'center',
  },
  finishCard: {
    alignItems: 'center',
  },
  finishEmoji: {},
  finishTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  finishScore: {
    color: colors.black,
    fontWeight: '800',
    letterSpacing: 0,
  },
  finishText: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 10,
    textAlign: 'center',
  },
  finishButton: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
});
