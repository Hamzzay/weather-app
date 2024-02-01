import {borders, colors, fontsSize, family} from '../constants/index';

const DEFAULT_DARK_COLOR_THEME = {
  primaryColor: colors.white,
  primaryText: colors.black,
  secondaryText: colors.white,
  buttonColor: colors.blue,
  defaultColor: colors.gray,
  error: colors.red,
  backgroundColor: colors.darkBlue,
};

const FONT_SET = {
  size: {
    xSmall: fontsSize.extraSmall,
    small: fontsSize.small,
    medium: fontsSize.medium,
    large: fontsSize.large,
    xLarge: fontsSize.extraLarge,
  },
  family: {
    regular: family.regular,
    medium: family.medium,
    bold: family.bold,
    xBold: family.xBold,
  },
};

const BORDER_RADIUS = {
  radius1: borders.radius1,
  radius2: borders.radius2,
  radius3: borders.radius3,
  radius4: borders.radius4,
  radius5: borders.radius5,
  radius6: borders.radius6,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  size: FONT_SET.size,
  borders: BORDER_RADIUS,
  family: FONT_SET.family,
};
