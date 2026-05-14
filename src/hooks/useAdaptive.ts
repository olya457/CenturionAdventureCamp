import {useWindowDimensions} from 'react-native';

export function useAdaptive() {
  const {width, height} = useWindowDimensions();
  const isTiny = width <= 340 || height <= 680;
  const isNarrow = width < 370;
  const isShort = height < 740;
  const horizontal = isTiny ? 12 : isNarrow ? 16 : 22;
  const contentWidth = Math.min(width - horizontal * 2, 420);

  return {
    width,
    height,
    isTiny,
    isNarrow,
    isShort,
    horizontal,
    contentWidth,
    headerHeight: isTiny ? 50 : isShort ? 56 : 64,
    navHeight: isTiny ? 62 : isShort ? 72 : 84,
    cardPadding: isTiny ? 12 : isNarrow ? 15 : 18,
  };
}
