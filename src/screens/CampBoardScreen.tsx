import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppShell} from '../components/AppShell';
import {Card} from '../components/Card';
import {useAdaptive} from '../hooks/useAdaptive';
import {persistentStorage} from '../storage/persistentStorage';
import {colors} from '../theme';
import type {MainScreenProps} from './screenProps';

type WordPuzzle = {
  id: string;
  clue: string;
  answer: string;
  missing: number[];
};

type WordProgress = {
  solvedIds: string[];
  currentIndex: number;
};

const progressKey = 'centurion.wordCampProgress';
const emptyProgress: WordProgress = {
  solvedIds: [],
  currentIndex: 0,
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const puzzles: WordPuzzle[] = [
  {
    id: 'helmet',
    clue: 'Marcellus lost this shiny thing in the first story.',
    answer: 'HELMET',
    missing: [1, 4],
  },
  {
    id: 'rufus',
    clue: 'The dog who liked guarding treasures and kitchens.',
    answer: 'RUFUS',
    missing: [2],
  },
  {
    id: 'duck',
    clue: 'An angry bird led everyone through the camp.',
    answer: 'DUCK',
    missing: [1],
  },
  {
    id: 'fountain',
    clue: 'The cook said the helmet was seen near this place.',
    answer: 'FOUNTAIN',
    missing: [2, 6],
  },
  {
    id: 'kitchen',
    clue: 'It smelled of fresh bread and honey here.',
    answer: 'KITCHEN',
    missing: [1, 5],
  },
  {
    id: 'apples',
    clue: 'Marcellus even looked inside this fruit bag.',
    answer: 'APPLES',
    missing: [0, 4],
  },
  {
    id: 'sausage',
    clue: 'Rufus often tried to steal this from the table.',
    answer: 'SAUSAGE',
    missing: [2, 5],
  },
  {
    id: 'pie',
    clue: 'The huge sweet tower made for Friendship Day.',
    answer: 'PIE',
    missing: [1],
  },
  {
    id: 'berries',
    clue: 'Gaius tripped and sent these flying at Marcellus.',
    answer: 'BERRIES',
    missing: [1, 4],
  },
  {
    id: 'cream',
    clue: 'After saving dinner, Marcellus had this on his cloak.',
    answer: 'CREAM',
    missing: [2],
  },
  {
    id: 'watermelon',
    clue: 'This fruit rolled out of the warehouse at night.',
    answer: 'WATERMELON',
    missing: [1, 7],
  },
  {
    id: 'warehouse',
    clue: 'The strange night noise came from this building.',
    answer: 'WAREHOUSE',
    missing: [3, 8],
  },
  {
    id: 'lantern',
    clue: 'Marcellus carried this while checking the dark camp.',
    answer: 'LANTERN',
    missing: [1, 5],
  },
  {
    id: 'monster',
    clue: 'Gaius thought the night noise was this scary thing.',
    answer: 'MONSTER',
    missing: [2, 6],
  },
  {
    id: 'sandal',
    clue: 'One flew into the bushes during the great race.',
    answer: 'SANDAL',
    missing: [1, 4],
  },
  {
    id: 'race',
    clue: 'The camp held the Great Sandal version of this.',
    answer: 'RACE',
    missing: [2],
  },
  {
    id: 'cloak',
    clue: 'Marcellus wore a red one that fluttered behind him.',
    answer: 'CLOAK',
    missing: [1, 3],
  },
  {
    id: 'bun',
    clue: 'Rufus stole this and everyone ran after him.',
    answer: 'BUN',
    missing: [1],
  },
  {
    id: 'parrot',
    clue: 'This bright green bird repeated camp commands.',
    answer: 'PARROT',
    missing: [2, 5],
  },
  {
    id: 'cookies',
    clue: 'The parrot kept asking where these were.',
    answer: 'COOKIES',
    missing: [1, 4],
  },
  {
    id: 'cakes',
    clue: 'The parrot shouted not to touch these treats.',
    answer: 'CAKES',
    missing: [1],
  },
  {
    id: 'command',
    clue: 'The parrot learned to repeat this kind of order.',
    answer: 'COMMAND',
    missing: [2, 5],
  },
  {
    id: 'shield',
    clue: 'Roman soldiers used this for protection.',
    answer: 'SHIELD',
    missing: [1, 4],
  },
  {
    id: 'torch',
    clue: 'A camp guard could hold this at night.',
    answer: 'TORCH',
    missing: [2],
  },
  {
    id: 'flag',
    clue: 'This could hang at the camp entrance.',
    answer: 'FLAG',
    missing: [1],
  },
  {
    id: 'camp',
    clue: 'The place where Marcellus, Rufus and the children live.',
    answer: 'CAMP',
    missing: [2],
  },
  {
    id: 'titus',
    clue: 'One of the children who joined the search.',
    answer: 'TITUS',
    missing: [1, 4],
  },
  {
    id: 'livia',
    clue: 'The child who laughed that a duck could not steal a helmet.',
    answer: 'LIVIA',
    missing: [2],
  },
  {
    id: 'gaius',
    clue: 'The little child who carried a wooden sword.',
    answer: 'GAIUS',
    missing: [1, 3],
  },
  {
    id: 'adventure',
    clue: 'The big thing everyone keeps finding in the camp.',
    answer: 'ADVENTURE',
    missing: [3, 7],
  },
];

function getSeed(text: string) {
  return text.split('').reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
}

function sortLetters(letters: string[], seed: number) {
  return [...letters].sort((a, b) => {
    const aValue = (a.charCodeAt(0) * 17 + seed) % 97;
    const bValue = (b.charCodeAt(0) * 17 + seed) % 97;

    return aValue - bValue;
  });
}

function createKeyboard(puzzle: WordPuzzle) {
  const seed = getSeed(puzzle.id);
  const correctLetters = Array.from(
    new Set(puzzle.missing.map(index => puzzle.answer[index])),
  );
  const extraLetters = sortLetters(
    alphabet.filter(letter => !correctLetters.includes(letter)),
    seed,
  ).slice(0, 12 - correctLetters.length);

  return sortLetters([...correctLetters, ...extraLetters], seed + 13);
}

function normalizeIndex(index: number) {
  if (index < 0) {
    return puzzles.length - 1;
  }

  if (index >= puzzles.length) {
    return 0;
  }

  return index;
}

export function CampBoardScreen({activeTab, onTabChange}: MainScreenProps) {
  const adaptive = useAdaptive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [activeSlot, setActiveSlot] = useState(0);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');

  const puzzle = puzzles[currentIndex];
  const solved = solvedIds.includes(puzzle.id);
  const keyboard = useMemo(() => createKeyboard(puzzle), [puzzle]);
  const correctMissing = useMemo(
    () => puzzle.missing.map(index => puzzle.answer[index]),
    [puzzle],
  );

  useEffect(() => {
    persistentStorage
      .getJSON<WordProgress>(progressKey, emptyProgress)
      .then(progress => {
        const validIds = progress.solvedIds.filter(id =>
          puzzles.some(puzzleItem => puzzleItem.id === id),
        );

        setSolvedIds(validIds);
        setCurrentIndex(normalizeIndex(progress.currentIndex));
      });
  }, []);

  useEffect(() => {
    setLetters([]);
    setActiveSlot(0);
    setStatus(solvedIds.includes(puzzle.id) ? 'correct' : 'idle');
  }, [currentIndex, puzzle.id, solvedIds]);

  const saveProgress = (nextSolvedIds: string[], nextIndex: number) => {
    persistentStorage.setJSON<WordProgress>(progressKey, {
      solvedIds: nextSolvedIds,
      currentIndex: nextIndex,
    });
  };

  const goToPuzzle = (index: number) => {
    const nextIndex = normalizeIndex(index);
    setCurrentIndex(nextIndex);
    saveProgress(solvedIds, nextIndex);
  };

  const chooseLetter = (letter: string) => {
    if (solved) {
      return;
    }

    setLetters(current => {
      const next = [...current];
      next[activeSlot] = letter;
      const nextEmpty = puzzle.missing.findIndex((_, index) => !next[index]);
      const complete =
        next.length === puzzle.missing.length && next.every(Boolean);
      const correct =
        complete &&
        next.every((value, index) => value === correctMissing[index]);

      if (correct) {
        const nextSolvedIds = solvedIds.includes(puzzle.id)
          ? solvedIds
          : [...solvedIds, puzzle.id];

        setSolvedIds(nextSolvedIds);
        setStatus('correct');
        saveProgress(nextSolvedIds, currentIndex);
      } else {
        setStatus(complete ? 'wrong' : 'idle');
      }

      if (!complete) {
        setActiveSlot(nextEmpty === -1 ? activeSlot : nextEmpty);
      }

      return next;
    });
  };

  const eraseLetter = () => {
    if (solved) {
      return;
    }

    setLetters(current => {
      const next = [...current];
      const filledSlot = next[activeSlot]
        ? activeSlot
        : Math.max(0, next.map(Boolean).lastIndexOf(true));

      next[filledSlot] = '';
      setActiveSlot(filledSlot);
      setStatus('idle');

      return next;
    });
  };

  const resetCurrent = () => {
    setLetters([]);
    setActiveSlot(0);
    setStatus('idle');
  };

  const resetProgress = () => {
    setSolvedIds([]);
    setLetters([]);
    setActiveSlot(0);
    setStatus('idle');
    saveProgress([], currentIndex);
  };

  return (
    <AppShell title="Word Camp" activeTab={activeTab} onTabChange={onTabChange}>
      <Card
        style={[
          styles.heroCard,
          {
            gap: adaptive.isTiny ? 10 : 14,
            marginBottom: adaptive.isTiny ? 16 : 22,
          },
        ]}>
        <Text
          style={[
            styles.heroIcon,
            {
              fontSize: adaptive.isTiny ? 42 : 54,
              lineHeight: adaptive.isTiny ? 50 : 62,
            },
          ]}>
          🔤
        </Text>
        <View style={styles.heroCopy}>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: adaptive.isTiny ? 16 : 18,
                lineHeight: adaptive.isTiny ? 20 : 23,
              },
            ]}>
            Story Word Puzzle
          </Text>
          <Text
            style={[
              styles.cardText,
              {
                fontSize: adaptive.isTiny ? 12 : 13,
                lineHeight: adaptive.isTiny ? 17 : 18,
                marginTop: adaptive.isTiny ? 6 : 8,
              },
            ]}>
            Solve words from Marcellus stories. Tap an empty letter and use the
            camp keyboard below.
          </Text>
        </View>
      </Card>

      <Card
        style={[styles.gameCard, {marginBottom: adaptive.isTiny ? 16 : 20}]}>
        <View style={styles.progressRow}>
          <Text
            style={[
              styles.progressText,
              {fontSize: adaptive.isTiny ? 12 : 13},
            ]}>
            Word {currentIndex + 1}/30
          </Text>
          <Text
            style={[
              styles.progressText,
              {fontSize: adaptive.isTiny ? 12 : 13},
            ]}>
            Solved {solvedIds.length}/30
          </Text>
        </View>

        <Text
          style={[
            styles.clue,
            {
              fontSize: adaptive.isTiny ? 16 : 18,
              lineHeight: adaptive.isTiny ? 21 : 23,
              marginTop: adaptive.isTiny ? 18 : 24,
            },
          ]}>
          {puzzle.clue}
        </Text>

        <View
          style={[
            styles.wordRow,
            {
              gap: adaptive.isTiny ? 5 : 7,
              marginTop: adaptive.isTiny ? 18 : 24,
            },
          ]}>
          {puzzle.answer.split('').map((letter, index) => {
            const missingIndex = puzzle.missing.indexOf(index);
            const hidden = missingIndex !== -1;
            const visibleLetter = hidden
              ? solved
                ? letter
                : letters[missingIndex] || ''
              : letter;
            const active = hidden && activeSlot === missingIndex && !solved;

            return (
              <Pressable
                accessibilityRole={hidden ? 'button' : 'text'}
                disabled={!hidden || solved}
                key={`${puzzle.id}-${index}`}
                onPress={() => {
                  setActiveSlot(missingIndex);
                  setStatus('idle');
                }}
                style={[
                  styles.letterBox,
                  {
                    height: adaptive.isTiny ? 36 : 43,
                    width: adaptive.isTiny ? 29 : 35,
                  },
                  hidden && styles.missingBox,
                  active && styles.activeBox,
                  status === 'wrong' && hidden && styles.wrongBox,
                  solved && hidden && styles.correctBox,
                ]}>
                <Text
                  style={[
                    styles.letterText,
                    {
                      fontSize: adaptive.isTiny ? 16 : 19,
                      lineHeight: adaptive.isTiny ? 20 : 23,
                    },
                  ]}>
                  {visibleLetter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={[
            styles.statusText,
            {
              fontSize: adaptive.isTiny ? 13 : 14,
              lineHeight: adaptive.isTiny ? 17 : 18,
              marginTop: adaptive.isTiny ? 16 : 22,
            },
            status === 'wrong' && styles.wrongText,
          ]}>
          {status === 'correct'
            ? 'Correct! The camp remembers this word.'
            : status === 'wrong'
            ? 'Try another letter.'
            : 'Fill the empty camp tiles.'}
        </Text>
      </Card>

      <Card
        style={[
          styles.keyboardCard,
          {marginBottom: adaptive.isTiny ? 14 : 18},
        ]}>
        <View style={[styles.keyboard, {gap: adaptive.isTiny ? 7 : 9}]}>
          {keyboard.map(letter => (
            <Pressable
              accessibilityRole="keyboardkey"
              disabled={solved}
              key={letter}
              onPress={() => chooseLetter(letter)}
              style={[
                styles.key,
                {
                  borderRadius: adaptive.isTiny ? 10 : 12,
                  height: adaptive.isTiny ? 40 : 48,
                  width: adaptive.isTiny ? 40 : 48,
                },
                solved && styles.disabledKey,
              ]}>
              <Text
                style={[
                  styles.keyText,
                  {
                    fontSize: adaptive.isTiny ? 14 : 16,
                    lineHeight: adaptive.isTiny ? 18 : 20,
                  },
                ]}>
                {letter}
              </Text>
            </Pressable>
          ))}
          <Pressable
            accessibilityRole="button"
            disabled={solved}
            onPress={eraseLetter}
            style={[
              styles.key,
              styles.wideKey,
              {
                borderRadius: adaptive.isTiny ? 10 : 12,
                height: adaptive.isTiny ? 40 : 48,
                width: adaptive.isTiny ? 86 : 105,
              },
              solved && styles.disabledKey,
            ]}>
            <Text
              style={[
                styles.keyText,
                {
                  fontSize: adaptive.isTiny ? 14 : 16,
                  lineHeight: adaptive.isTiny ? 18 : 20,
                },
              ]}>
              DEL
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={resetCurrent}
            style={[
              styles.key,
              styles.wideKey,
              {
                borderRadius: adaptive.isTiny ? 10 : 12,
                height: adaptive.isTiny ? 40 : 48,
                width: adaptive.isTiny ? 86 : 105,
              },
            ]}>
            <Text
              style={[
                styles.keyText,
                {
                  fontSize: adaptive.isTiny ? 14 : 16,
                  lineHeight: adaptive.isTiny ? 18 : 20,
                },
              ]}>
              CLEAR
            </Text>
          </Pressable>
        </View>
      </Card>

      <View
        style={[
          styles.controls,
          {
            gap: adaptive.isTiny ? 10 : 14,
            marginBottom: adaptive.isTiny ? 12 : 16,
          },
        ]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => goToPuzzle(currentIndex - 1)}
          style={[
            styles.controlButton,
            {
              minHeight: adaptive.isTiny ? 46 : 54,
            },
          ]}>
          <Text
            style={[
              styles.controlText,
              {
                fontSize: adaptive.isTiny ? 14 : 15,
                lineHeight: adaptive.isTiny ? 18 : 19,
              },
            ]}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => goToPuzzle(currentIndex + 1)}
          style={[
            styles.controlButton,
            {
              minHeight: adaptive.isTiny ? 46 : 54,
            },
          ]}>
          <Text
            style={[
              styles.controlText,
              {
                fontSize: adaptive.isTiny ? 14 : 15,
                lineHeight: adaptive.isTiny ? 18 : 19,
              },
            ]}>
            Next
          </Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={resetProgress}
        style={[
          styles.resetButton,
          {
            marginBottom: adaptive.isTiny ? 10 : 18,
            minHeight: adaptive.isTiny ? 40 : 44,
            paddingHorizontal: adaptive.isTiny ? 16 : 20,
          },
        ]}>
        <Text
          style={[
            styles.resetText,
            {
              fontSize: adaptive.isTiny ? 13 : 14,
              lineHeight: adaptive.isTiny ? 17 : 18,
            },
          ]}>
          Reset progress
        </Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIcon: {},
  heroCopy: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  cardText: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 0,
  },
  gameCard: {
    alignItems: 'center',
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: colors.brownDark,
    fontWeight: '900',
    letterSpacing: 0,
  },
  clue: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  wordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterBox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    borderColor: colors.brown,
    borderWidth: 1,
  },
  missingBox: {
    backgroundColor: colors.white,
    borderColor: colors.red,
    borderWidth: 2,
  },
  activeBox: {
    backgroundColor: colors.gold,
    borderColor: colors.brownDark,
  },
  wrongBox: {
    backgroundColor: colors.coral,
    borderColor: colors.redDark,
  },
  correctBox: {
    backgroundColor: colors.green,
    borderColor: colors.brownDark,
  },
  letterText: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  statusText: {
    color: colors.brownDark,
    fontWeight: '800',
    letterSpacing: 0,
    textAlign: 'center',
  },
  wrongText: {
    color: colors.redDark,
  },
  keyboardCard: {},
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderColor: colors.redDark,
    borderWidth: 1,
  },
  disabledKey: {
    opacity: 0.48,
  },
  wideKey: {},
  keyText: {
    color: colors.white,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
  },
  controlButton: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    borderColor: colors.brown,
    borderWidth: 1,
  },
  controlText: {
    color: colors.black,
    fontWeight: '900',
    letterSpacing: 0,
  },
  resetButton: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.brown,
    borderWidth: 1,
  },
  resetText: {
    color: colors.brownDark,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
