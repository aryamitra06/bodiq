import { StyleSheet, View, Pressable } from "react-native";
import { Button, Card, ScrollView, Text, YStack, XStack } from "tamagui";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import LogBodyWeight from "@/sheets/LogBodyWeight";
import { triggerHaptic } from "@/utils/haptics";

export default function Home() {
  const [showSheet, setShowSheet] = useState(false);
  const openSheet = async () => {
    await triggerHaptic("medium");
    setShowSheet(true);
  };

  const FireIconBadge = ({ size = 40 }) => {
    const circleSize = size;
    return (
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: "#2996FF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="white"
        >
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path d="M10 2c0-.88 1.056-1.331 1.692-.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08.174l.012.003c.625.133 1.203-.43 2.303-2.173l.14-.224a1 1 0 0 1 1.582-.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265-3.591 7.705-8 7.705s-8-3.44-8-7.706c0-2.252 1.022-4.716 2.632-6.301l.605-.589c.241-.236.434-.43.618-.624c1.43-1.512 2.145-2.924 2.145-4.78" />
        </Svg>
      </View>
    );
  };

  const GymnasticsIcon = ({ color = "black", size = 24 }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M7 7a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <Path d="M13 21l1 -9l7 -6" />
      <Path d="M3 11h6l5 1" />
      <Path d="M11.5 8.5l4.5 -3.5" />
    </Svg>
  );

  const ScaleIcon = ({ color = "black", size = 24 }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M3 3m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
      <Path d="M12 7c1.956 0 3.724 .802 5 2.095l-2.956 2.904a3 3 0 0 0 -2.038 -.799a3 3 0 0 0 -2.038 .798l-2.956 -2.903a6.979 6.979 0 0 1 5 -2.095z" />
    </Svg>
  );

  const ActivityIconBadge = ({ size = 40 }) => {
    const circleSize = size;
    return (
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: "#10B981",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="white"
        >
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
        </Svg>
      </View>
    );
  };

  const WeightIconBadge = ({ size = 40 }) => {
    const circleSize = size;
    return (
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: "#10B981",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="white"
        >
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path d="M5 21h14a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2zM12 8a4 4 0 0 1 4 4v1a1 1 0 0 1 -2 0v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -2 0v-1a4 4 0 0 1 4 -4z" />
        </Svg>
      </View>
    );
  };

  const handleShowMore = () => {
    console.log("Navigate to /trends");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Card padding="$2" borderRadius="$6" backgroundColor="#fff">
          <YStack space="$4">
            {/* Streak Card */}
            <Card padding="$4" borderRadius="$4" backgroundColor="#EAEEF4">
              <XStack alignItems="center" space="$3">
                <FireIconBadge size={40} />
                <YStack flex={1}>
                  <Text fontSize={18} fontWeight="bold" color={"#1E272E"}>
                    14 days streak
                  </Text>
                  <Text fontSize={12} color="#666">
                    Keep it up, you are the best!
                  </Text>
                </YStack>
              </XStack>
            </Card>
            {/* Quote Section */}
            <XStack alignItems="center" space="$3" padding="$3">
              <GymnasticsIcon size={24} color="#666" />
              <Text flex={1} fontSize={14} color="#666">
                Train your mind before your muscles, discipline beats
                motivation.
              </Text>
            </XStack>
          </YStack>
        </Card>
        {/* Health Indicators Section */}
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginTop="$5"
          marginBottom="$3"
        >
          <Text fontSize={16} fontWeight="bold" flex={1} color={"#1E272E"}>
            Your latest health indicators
          </Text>
          <Pressable
            android_ripple={{ color: "#aaa" }}
            onPress={handleShowMore}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              padding: 5,
            })}
          >
            <Text fontSize={13} color="#666">
              Show more
            </Text>
          </Pressable>
        </XStack>
        <Card padding="$4" borderRadius="$4" backgroundColor="#2F383E">
          <XStack alignItems="center" space="$3" marginBottom="$3">
            <ActivityIconBadge size={40} />
            <YStack flex={1}>
              <Text fontSize={16} color="#E2E5E7" fontWeight="$6">
                Distance Increase on 37%
              </Text>
              <Text fontSize={12} color="#979DA3">
                Last activity for 22 Oct.
              </Text>
            </YStack>
          </XStack>
          <XStack
            marginTop="$2"
            alignItems="center"
            justifyContent="space-between"
            gap={5}
          >
            <YStack flex={1}>
              <XStack alignItems="flex-end" space={3}>
                <Text fontSize={24} fontWeight="bold" color="#E2E5E7">
                  5.28
                </Text>
                <Text fontSize={12} color="#979DA3" marginBottom={3}>
                  km
                </Text>
              </XStack>
              <Text fontSize={12} color="#979DA3" marginTop={4}>
                Distance
              </Text>
            </YStack>
            <YStack flex={1}>
              <XStack alignItems="flex-end" space={3}>
                <Text fontSize={24} fontWeight="bold" color="#E2E5E7">
                  1267
                </Text>
                <Text fontSize={12} color="#979DA3" marginBottom={3}>
                  kcal
                </Text>
              </XStack>
              <Text fontSize={12} color="#979DA3" marginTop={4}>
                Calories burned
              </Text>
            </YStack>
            <YStack flex={1}>
              <XStack alignItems="flex-end" space={3}>
                <Text fontSize={24} fontWeight="bold" color="#E2E5E7">
                  120
                </Text>
                <Text fontSize={12} color="#979DA3" marginBottom={3}>
                  BPM
                </Text>
              </XStack>
              <Text fontSize={12} color="#979DA3" marginTop={4}>
                Average heart rate
              </Text>
            </YStack>
          </XStack>
        </Card>
        {/* Body Weights Overview Section */}
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginTop="$5"
          marginBottom="$3"
        >
          <Text fontSize={16} fontWeight="bold" flex={1} color={"#1E272E"}>
            Body Weights Overview
          </Text>
          <Pressable
            android_ripple={{ color: "#aaa" }}
            onPress={handleShowMore}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              padding: 5,
            })}
          >
            <Text fontSize={13} color="#666">
              Show more
            </Text>
          </Pressable>
        </XStack>
        <Card padding="$4" borderRadius="$4" backgroundColor="#2F383E">
          <XStack alignItems="center" space="$3" marginBottom="$3">
            <WeightIconBadge size={40} />
            <YStack flex={1}>
              <Text fontSize={16} color="#E2E5E7" fontWeight="$6">
                You reduced 1.8 kg in last 7 days
              </Text>
              <Text fontSize={12} color="#979DA3">
                Keep tracking for steady progress.
              </Text>
            </YStack>
          </XStack>
        </Card>
      </ScrollView>
      {/* FAB Button */}
      <Button
        style={styles.fab}
        onPress={openSheet}
        icon={ScaleIcon({ size: 24, color: "#fff" })}
        backgroundColor="#2996FF"
        borderRadius={50}
        color={"#fff"}
      >
        Log Body Weight
      </Button>
      <LogBodyWeight open={showSheet} onOpenChange={setShowSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FA" },
  fab: { position: "absolute", bottom: 20, alignSelf: "center" },
});
