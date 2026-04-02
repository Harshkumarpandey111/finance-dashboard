// Central place for all design tokens used in JS (charts, dynamic styles)
// CSS variables handle the theme; these are for Recharts and programmatic use.

export const CHART_COLORS = {
  forest:    '#3D6B50',
  terra:     '#C0694A',
  sage:      '#7A9E8A',
  sand:      '#D4906B',
  moss:      '#5A8A6A',
  peach:     '#E8B89A',
  darkForest:'#2A4F38',
};

// Ordered palette for pie/donut slices
export const DONUT_PALETTE = [
  CHART_COLORS.forest,
  CHART_COLORS.terra,
  CHART_COLORS.sage,
  CHART_COLORS.sand,
  CHART_COLORS.moss,
  CHART_COLORS.peach,
  CHART_COLORS.darkForest,
];

export const CATEGORY_COLORS = {
  Housing:       CHART_COLORS.forest,
  'Food & Dining': CHART_COLORS.terra,
  Transport:     CHART_COLORS.sage,
  Entertainment: CHART_COLORS.sand,
  Healthcare:    CHART_COLORS.moss,
  Shopping:      '#8B7355',
  Utilities:     '#9B958E',
  Salary:        CHART_COLORS.forest,
  Freelance:     CHART_COLORS.sage,
  Investment:    CHART_COLORS.moss,
};

// Grid stroke per theme — read once and pass down
export const gridStroke = (darkMode) => darkMode ? '#2E2B26' : '#E2DDD8';
