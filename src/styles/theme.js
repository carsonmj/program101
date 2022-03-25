const calcRem = (size) => `${size}rem`;

const fontSizes = {
  xxs: calcRem(0.8),
  xs: calcRem(1.0),
  sm: calcRem(1.1),
  md: calcRem(1.2),
  lg: calcRem(1.4),
  xl: calcRem(1.6),
  xxl: calcRem(1.8),
  head6: calcRem(2.0),
  head5: calcRem(2.4),
  head3: calcRem(3.0),
  head2: calcRem(3.5),
  head1: calcRem(4.0),
};

const fontWeights = {
  light: 200,
  normal: 400,
  mid: 600,
  bold: 700,
};

const iconSize = {
  xxs: calcRem(1),
  xs: calcRem(1.5),
  sm: calcRem(2.0),
  md: calcRem(2.5),
  lg: calcRem(3.5),
  xl: calcRem(5),
};

const space = {
  xs: calcRem(0.2),
  sm: calcRem(0.4),
  md: calcRem(0.8),
  lg: calcRem(1.2),
  xl: calcRem(1.4),
};

const colors = {
  black_1: "#18181C",
  black_2: "#433B3B",
  darkblue_1: "#141229",
  darkblue_2: "#222033",
  darkblue_3: "#201D47",
  lightdarkblue_1: "#2b2941",
  grayblue_1: "#6F6C99",
  gray_1: "#585858",
  gray_2: "#585858",
  gray_3: "#8B8B8B",
  blue_1: "#0078FE",
  lightblue_1: "#14B7E5",
  lightblue_2: "#53B9EA",
  green_1: "#3AC090",
  yellow_1: "#F5A623",
  pink_1: "#F88080",
  white_1: "#FFFFFF",
};

const linearColors = {
  pink_1: "linear-gradient(136.67deg, #FF409A 8.34%, #C438EF 95.26%)",
};

const opacityColors = {
  gray_1: "#C4C4C45C",
  grayblue_1: "#787EAB",
  deepblue_1: "#ABCBFC",
  blue_1: "#ABD0FC",
  pink_1: "#FCABAB",
  yellow_1: "#FADD94",
  white_1: "#FFFFFFC9",
};

const theme = { fontSizes, fontWeights, space, colors, linearColors, opacityColors, iconSize };

export default theme;
