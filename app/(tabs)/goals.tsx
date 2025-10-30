import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { useGetWeightsQuery } from "@/features/bodyweight/bodyweightApi";
import { Progress, YStack } from "tamagui";
import { useGetGoalsQuery } from "@/features/bodyweight/goalApi";

export default function Goals() {
  const { user } = useAuth();

  // Fetch goals and weights
  const {
    data: goals,
    isLoading: goalsLoading,
    error: goalsError,
    refetch: refetchGoals,
  } = useGetGoalsQuery(user?.$id);

  const {
    data: weights,
    isLoading: weightsLoading,
    error: weightsError,
  } = useGetWeightsQuery(user?.$id);

  const isLoading = goalsLoading || weightsLoading;

  // Starting and latest weights
  const startingWeight =
    weights && weights.length > 0 ? parseFloat(weights[0].bodyweight) : null;

  const latestWeight =
    weights && weights.length > 0
      ? parseFloat(weights[weights.length - 1].bodyweight)
      : null;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading goals...</Text>
      </View>
    );
  }

  if (goalsError || weightsError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ Failed to load data.</Text>
        <Text onPress={refetchGoals} style={styles.retryText}>
          Tap to retry
        </Text>
      </View>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No goals yet — set your first one!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Goals</Text>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const target = parseFloat(item.target);
          let progress = 0;

          if (startingWeight && latestWeight && target) {
            if (item.goal_type === "weight_loss") {
              // ✅ Weight loss progress increases as weight decreases
              progress =
                ((startingWeight - latestWeight) / (startingWeight - target)) *
                100;
            } else if (item.goal_type === "weight_gain") {
              // ✅ Weight gain progress increases as weight increases
              progress =
                ((latestWeight - startingWeight) / (target - startingWeight)) *
                100;
            } else {
              // ✅ For other goals (like strength)
              progress = (latestWeight / target) * 100;
            }

            // ✅ Clamp between 0–100
            progress = Math.min(Math.max(progress, 0), 100);
          }

          return (
            <YStack
              backgroundColor="white"
              borderRadius={12}
              padding={16}
              marginBottom={12}
              shadowColor="#000"
              shadowOpacity={0.05}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
            >
              <Text style={styles.goalType}>
                {item.goal_type.replace("_", " ").toUpperCase()}
              </Text>
              <Text style={styles.goalTarget}>🎯 Target: {item.target}</Text>
              <Text style={styles.goalDeadline}>
                📅 Deadline: {new Date(item.deadline).toLocaleDateString()}
              </Text>

              {latestWeight && (
                <>
                  <Text style={styles.currentWeight}>
                    ⚖️ Current: {latestWeight.toFixed(1)} kg
                  </Text>

                  <Progress
                    value={progress}
                    marginTop={10}
                    backgroundColor="#E5E7EB"
                    borderRadius={12}
                    height={10}
                  >
                    <Progress.Indicator
                      animation="bouncy"
                      backgroundColor="#007AFF"
                    />
                  </Progress>

                  <Text style={styles.progressText}>
                    {Math.round(progress)}% completed
                  </Text>
                </>
              )}
            </YStack>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FA" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#1E272E",
  },
  goalType: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 4,
  },
  goalTarget: { fontSize: 15, color: "#1E272E", marginBottom: 2 },
  goalDeadline: { fontSize: 14, color: "#666" },
  currentWeight: { fontSize: 15, color: "#333", marginTop: 6 },
  progressText: {
    fontSize: 13,
    color: "#444",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "right",
  },
  loadingText: { marginTop: 8, color: "#444" },
  errorText: { color: "red", fontSize: 16, marginBottom: 4 },
  retryText: { color: "#007AFF", fontWeight: "600" },
  emptyText: { color: "#666", fontSize: 16 },
});