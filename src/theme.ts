import {Platform} from 'react-native';

export const colors = {
  red: '#e4072f',
  redDark: '#971023',
  yellow: '#ffe67d',
  gold: '#ffce2e',
  brown: '#664317',
  brownDark: '#3f280c',
  cream: '#fffaf0',
  white: '#ffffff',
  green: '#04db05',
  coral: '#f17451',
  black: '#060606',
};

export const platformSpacing = {
  top: Platform.OS === 'android' ? 30 : 0,
  navBottom: Platform.OS === 'android' ? 30 : 20,
};
