/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#54426B';
const tintColorDark = '#E9F1F7';

export const Colors = {
  light: {
    color: '#623CEA', // brand color
    background: '#E9F1F7',
    tint: tintColorLight,
    icon: '#623CEA',
    tabIconDefault: '#623CEA',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#E9F1F7',
    background: '#54426B',
    tint: tintColorDark,
    icon: '#DBD5B2',
    tabIconDefault: '#DBD5B2',
    tabIconSelected: tintColorDark,
  },
};
