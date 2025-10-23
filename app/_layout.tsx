import { Stack } from "expo-router";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const config = createTamagui(defaultConfig);

  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="dark-content" />
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
