import React from "react";
import { View, StyleSheet } from "react-native";
import { XStack , Text, YStack} from "tamagui";

export default function GoalsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        sapiente, totam illum officia dignissimos minima suscipit voluptatem
        ipsa, quidem, optio adipisci! Magnam hic facere fugiat ex pariatur amet
        ipsam aliquam.
      </Text>
      <Text style={styles.rightText}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
        inventore excepturi? Nihil explicabo ducimus quis quibusdam error,
        possimus ea, pariatur, eveniet praesentium excepturi magnam corporis
        perspiciatis? Delectus ab magni ipsum?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between left and right
    alignItems: "center", // Vertically center items
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftText: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    flexShrink: 1,
  },
  rightText: {
    fontSize: 14,
    color: "#007AFF", // blue link-style color
    fontWeight: "500",
    flex: 1,
    flexShrink: 1,
  },
});
