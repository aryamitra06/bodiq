import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import { Button, Card, ScrollView, Text, YStack, XStack } from "tamagui";
import Svg, { Path } from "react-native-svg";
import { useEffect, useState } from "react";
import LogBodyWeight from "@/sheets/LogBodyWeight";
import { triggerHaptic } from "@/utils/haptics";
import CreateGoal from "@/sheets/CreateGoal";
import { useRouter } from "expo-router";
import { useGetWeightsQuery } from "@/features/bodyweight/bodyweightApi";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import GoogleFit, { Scopes } from "react-native-google-fit";

export default function Home() {
  const { user } = useAuth();
  const {
    data: weights = [],
    isLoading,
    error,
  } = useGetWeightsQuery(user?.$id);
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);
  const [showGoalSheet, setShowGoalSheet] = useState(false);
    const [distance, setDistance] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [bpm, setBpm] = useState<number | null>(null);


  const openSheet = async () => {
    await triggerHaptic("medium");
    setShowSheet(true);
  };

  const openGoalSheet = async () => {
    await triggerHaptic("medium");
    setShowGoalSheet(true);
  };

  const fetchTodayData = async () => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_LOCATION_READ,
        Scopes.FITNESS_HEART_RATE_READ,
      ],
    };

    const authResult = await GoogleFit.authorize(options);
    if (!authResult.success) {
      console.log("Google Fit authorization failed");
      return;
    }

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0); // start of today

    const opt = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };

    // --- Distance (meters → km) ---
    const distRes = await GoogleFit.getDailyDistanceSamples(opt);
    const totalDist =
      distRes.reduce((sum, d) => sum + (d.distance || 0), 0) / 1000;
    setDistance(totalDist);

    // --- Calories burned ---
    const calRes = await GoogleFit.getDailyCalorieSamples(opt);
    const totalCal = calRes.reduce((sum, d) => sum + (d.calorie || 0), 0);
    setCalories(totalCal);

    // --- Average heart rate (BPM) ---
    const hrRes = await GoogleFit.getHeartRateSamples(opt);
    const avgBpm =
      hrRes.length > 0
        ? Math.round(hrRes.reduce((sum, h) => sum + h.value, 0) / hrRes.length)
        : null;
    setBpm(avgBpm);
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

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

  const TargetArrowIcon = ({ color = "black", size = 24 }) => (
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
      <Path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <Path d="M12 7a5 5 0 1 0 5 5" />
      <Path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
      <Path d="M15 6v3h3l3-3h-3v-3" />
      <Path d="M15 9l-3 3" />
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

  // Assuming weights are sorted with the latest first (index 0)
  const latestWeight = parseFloat(weights[weights.length - 1]?.bodyweight || 0);
  const pastWeight =
    weights.length > 6 ? parseFloat(weights[0]?.bodyweight || 0) : null;

  const diff =
    pastWeight !== null
      ? parseFloat((pastWeight - latestWeight).toFixed(1))
      : 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Card padding="$2" borderRadius="$6" backgroundColor="#fff">
          <YStack space="$4">
            <Card padding="$4" borderRadius="$4" backgroundColor="#EAEEF4">
              <XStack alignItems="center" space="$3">
                <FireIconBadge size={40} />
                <YStack flex={1}>
                  <Text
                    fontSize={18}
                    color={"#1E272E"}
                    fontWeight="600"
                    fontFamily="$body"
                  >
                    {weights.length} days streak
                  </Text>
                  <Text
                    fontSize={12}
                    color="#666"
                    fontWeight="400"
                    fontFamily="$body"
                  >
                    Keep it up, you are the best!
                  </Text>
                </YStack>
              </XStack>
            </Card>
            <XStack alignItems="center" space="$3" padding="$3">
              <GymnasticsIcon size={24} color="#666" />
              <Text
                flex={1}
                fontSize={14}
                color="#666"
                fontWeight="400"
                fontFamily="$body"
              >
                Train your mind before your muscles, discipline beats
                motivation.
              </Text>
            </XStack>
          </YStack>
        </Card>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginTop="$5"
          marginBottom="$3"
        >
          <Text
            fontSize={16}
            flex={1}
            color={"#1E272E"}
            fontWeight="600"
            fontFamily="$body"
          >
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
            <Text
              fontSize={13}
              color="#666"
              fontWeight="400"
              fontFamily="$body"
            >
              Show more
            </Text>
          </Pressable>
        </XStack>
        <Card padding="$4" borderRadius="$4" backgroundColor="#2F383E">
          <XStack alignItems="center" space="$3" marginBottom="$3">
            <ActivityIconBadge size={40} />
            <YStack flex={1}>
              <Text
                fontSize={16}
                color="#E2E5E7"
                fontWeight="400"
                fontFamily="$body"
              >
                Distance Increase on 37%
              </Text>
              <Text
                fontSize={12}
                color="#979DA3"
                fontWeight="400"
                fontFamily="$body"
              >
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
                <Text
                  fontSize={24}
                  color="#E2E5E7"
                  fontWeight="600"
                  fontFamily="$body"
                >
                  {distance?.toFixed(2) || "--"}
                </Text>
                <Text fontSize={12} color="#979DA3" marginBottom={6}>
                  km
                </Text>
              </XStack>
              <Text
                fontSize={12}
                color="#979DA3"
                marginTop={4}
                fontWeight="400"
                fontFamily="$body"
              >
                Distance
              </Text>
            </YStack>
            <YStack flex={1}>
              <XStack alignItems="flex-end" space={3}>
                <Text
                  fontSize={24}
                  color="#E2E5E7"
                  fontWeight="600"
                  fontFamily="$body"
                >
                  {Math?.round(calories) || "--"}
                </Text>
                <Text
                  fontSize={12}
                  color="#979DA3"
                  marginBottom={6}
                  fontWeight="400"
                  fontFamily="$body"
                >
                  kcal
                </Text>
              </XStack>
              <Text
                fontSize={12}
                color="#979DA3"
                marginTop={4}
                fontWeight="400"
                fontFamily="$body"
              >
                Calories burned
              </Text>
            </YStack>
            <YStack flex={1}>
              <XStack alignItems="flex-end" space={3}>
                <Text
                  fontSize={24}
                  color="#E2E5E7"
                  fontWeight="600"
                  fontFamily="$body"
                >
                  {bpm || "--"}
                </Text>
                <Text
                  fontSize={12}
                  color="#979DA3"
                  marginBottom={6}
                  fontWeight="400"
                  fontFamily="$body"
                >
                  BPM
                </Text>
              </XStack>
              <Text
                fontSize={12}
                color="#979DA3"
                marginTop={4}
                fontWeight="400"
                fontFamily="$body"
              >
                Average heart rate
              </Text>
            </YStack>
          </XStack>
        </Card>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginTop="$5"
          marginBottom="$3"
        >
          <Text
            fontSize={16}
            flex={1}
            color={"#1E272E"}
            fontWeight="600"
            fontFamily="$body"
          >
            Body Weights Overview
          </Text>
          <Pressable
            android_ripple={{ color: "#aaa" }}
            onPress={() => router.push("/trends")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              padding: 5,
            })}
          >
            <Text
              fontSize={13}
              color="#666"
              fontWeight="400"
              fontFamily="$body"
            >
              Show more
            </Text>
          </Pressable>
        </XStack>
        <Card padding="$4" borderRadius="$4" backgroundColor="#2F383E">
          <XStack alignItems="center" space="$3" marginBottom="$3">
            <WeightIconBadge size={40} />
            <YStack flex={1}>
              <Text
                fontSize={16}
                color="#E2E5E7"
                fontWeight="400"
                fontFamily="$body"
              >
                {pastWeight === null
                  ? "Not enough data to calculate"
                  : diff > 0
                  ? `You reduced ${diff} kg in last 7 days`
                  : diff < 0
                  ? `You gained ${Math.abs(diff)} kg in last 7 days`
                  : "No weight change in last 7 days"}
              </Text>
              <Text
                fontSize={12}
                color="#979DA3"
                fontWeight="400"
                fontFamily="$body"
              >
                Keep tracking for steady progress.
              </Text>
            </YStack>
          </XStack>
        </Card>
      </ScrollView>
      <XStack style={styles.fabContainer} space="$3">
        <Button
          onPress={openSheet}
          icon={ScaleIcon({ size: 24, color: "#fff" })}
          backgroundColor="#2996FF"
          borderRadius={50}
          color="#fff"
          pressStyle={{
            backgroundColor: "#1E7FE5",
          }}
          style={styles.buttonHalf}
        >
          Log Weight
        </Button>
        <Button
          onPress={openGoalSheet}
          icon={TargetArrowIcon({ size: 24, color: "#fff" })}
          backgroundColor="#2996FF"
          borderRadius={50}
          color="#fff"
          pressStyle={{
            backgroundColor: "#1E7FE5",
          }}
          style={styles.buttonHalf}
        >
          New Goal
        </Button>
      </XStack>
      <LogBodyWeight open={showSheet} onOpenChange={setShowSheet} />
      <CreateGoal open={showGoalSheet} onOpenChange={setShowGoalSheet} />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FA" },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  buttonHalf: {
    flex: 1,
    width: width / 2,
  },
});
