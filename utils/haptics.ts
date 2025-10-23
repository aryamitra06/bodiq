import * as Haptics from "expo-haptics";
import { Platform, Vibration } from "react-native";

/**
 * Triggers a haptic feedback with fallback vibration on unsupported devices.
 * @param type 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'
 */
export const triggerHaptic = async (
  type:
    | "light"
    | "medium"
    | "heavy"
    | "success"
    | "warning"
    | "error" = "medium"
) => {
  try {
    switch (type) {
      case "light":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "success":
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        break;
      case "warning":
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning
        );
        break;
      case "error":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch (err) {
    // 👇 fallback for Android or simulators that don't support haptics
    if (Platform.OS === "android") {
      Vibration.vibrate(30);
    }
  }
};
