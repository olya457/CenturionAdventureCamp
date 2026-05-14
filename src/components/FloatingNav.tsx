import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAdaptive} from '../hooks/useAdaptive';
import {mainTabs} from '../navigation/mainTabs';
import {colors, platformSpacing} from '../theme';
import type {TabId} from '../types';

type FloatingNavProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function FloatingNav({activeTab, onTabChange}: FloatingNavProps) {
  const adaptive = useAdaptive();
  const width = Math.min(
    adaptive.width - (adaptive.isTiny ? 34 : 68),
    adaptive.isTiny ? 286 : 304,
  );
  const itemSize = adaptive.isTiny ? 34 : 38;

  return (
    <View
      style={[
        styles.wrap,
        {
          bottom: platformSpacing.navBottom,
          width,
          height: adaptive.navHeight,
        },
      ]}>
      {mainTabs.map(tab => {
        const active = tab.id === activeTab;

        return (
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{selected: active}}
            activeOpacity={0.86}
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[
              styles.item,
              {width: itemSize, height: itemSize},
              active && styles.activeItem,
            ]}>
            <Text
              style={[
                styles.icon,
                {fontSize: adaptive.isTiny ? 18 : 20},
                active && styles.activeIcon,
              ]}>
              {tab.icon}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: colors.brown,
    borderColor: 'rgba(255,255,255,0.62)',
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    elevation: 10,
  },
  item: {
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: colors.white,
  },
  icon: {
    fontSize: 20,
    lineHeight: 24,
    opacity: 0.7,
  },
  activeIcon: {
    opacity: 1,
  },
});
