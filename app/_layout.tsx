import { Stack } from "expo-router";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";

export default function RootLayout() {
  const config = createTamagui(defaultConfig);

  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </TamaguiProvider>
  );
}
