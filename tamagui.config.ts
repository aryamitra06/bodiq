import { createFont, createTamagui } from "tamagui";
import { themes, tokens } from "@tamagui/themes";
import { defaultConfig } from '@tamagui/config/v4'

const OutfitFont = createFont({
  family: "OutfitFont",
  size: {
    1: 12,
    2: 14,
    true: 12,
  },
  lineHeight: {
    1: 17,
    2: 22,
    true: 17,
  },
  weight: {
    4: "400",
    true: "400",
  },
  letterSpacing: {
    true: 0,
  },
  face: {
    400: {
      normal: "Outfit_400Regular",
    },
    600: {
      normal: "Outfit_600SemiBold",
    },
  },
});

export const RighteousFont = createFont({
  family: "RighteousFont",
  size: {
    1: 12,
    2: 14,
    true: 12,
  },
  lineHeight: {
    1: 17,
    2: 22,
    true: 17,
  },
  weight: {
    4: "400",
    true: "400",
  },
  letterSpacing: {
    true: 0,
  },
  face: {
    400: {
      normal: "Righteous_400Regular",
    },
  },
});

export const config = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
  fonts: {
    body: OutfitFont,
    display: RighteousFont,
  },
  defaultFont: "body",
});
