import { Stack } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";
import { ActivityIndicator, StatusBar, View } from "react-native";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_600SemiBold,
} from "@expo-google-fonts/outfit";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { config } from "../tamagui.config";
import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { Provider } from "react-redux";
import { store } from "@/utils/store";

export default function RootLayout() {
  function AppLayout() {
    const { user, loading } = useAuth();
    const [fontsLoaded] = useFonts({
      Outfit_400Regular,
      Outfit_600SemiBold,
      Righteous_400Regular,
    });

    if (!fontsLoaded) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    console.log("user", user);

    if (loading)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </Stack>
    );
  }

  return (
    <AuthProvider>
      <Provider store={store}>
      <TamaguiProvider config={config} defaultTheme="light">
        <StatusBar barStyle="dark-content" />
        <AppLayout />
      </TamaguiProvider>
      </Provider>
    </AuthProvider>
  );
}
