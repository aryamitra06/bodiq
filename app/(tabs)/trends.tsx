import { useAuth } from "@/contexts/AuthContext/useAuth";
import { useGetWeightsQuery } from "@/features/bodyweight/bodyweightApi";
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "tamagui";
import { LineChart } from "react-native-chart-kit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Accordion } from "tamagui";

const screenWidth = Dimensions.get("window").width;

export default function GoalsHeader() {
  const { user } = useAuth();
  const {
    data: weights,
    isLoading,
    refetch,
    error,
  } = useGetWeightsQuery(user?.$id);

  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [aiSummary, setAiSummary] = useState<string>("");

  // Create Gemini client
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA60ueXGeOlYHDG4u7a2ysxZ3htYTP11Cc"
  ); // ⚠️ Replace or proxy through backend
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get unique months from weights data
  const availableMonths = useMemo(() => {
    if (!weights || weights.length === 0) return [];

    const monthsSet = new Set<string>();
    weights.forEach((weight) => {
      if (weight.measurement_date) {
        const date = new Date(weight.measurement_date);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        monthsSet.add(monthYear);
      }
    });

    return Array.from(monthsSet).sort().reverse();
  }, [weights]);

  // Format month for display
  const formatMonthTab = (monthYear: string) => {
    const [year, month] = monthYear.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Filter weights by selected month
  const filteredWeights = useMemo(() => {
    if (!weights) return [];
    if (selectedMonth === "all") return weights;

    return weights.filter((weight) => {
      if (!weight.measurement_date) return false;
      const date = new Date(weight.measurement_date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      return monthYear === selectedMonth;
    });
  }, [weights, selectedMonth]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!filteredWeights || filteredWeights.length === 0) return null;

    // Sort by date
    const sorted = [...filteredWeights].sort((a, b) => {
      if (!a.measurement_date || !b.measurement_date) return 0;
      return (
        new Date(a.measurement_date).getTime() -
        new Date(b.measurement_date).getTime()
      );
    });

    const labels = sorted.map((w) =>
      w.measurement_date ? formatShortDate(w.measurement_date) : ""
    );
    const data = sorted.map((w) => parseFloat(w.bodyweight) || 0);

    return {
      labels,
      datasets: [
        {
          data,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 3,
        },
      ],
    };
  }, [filteredWeights]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading weights...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading weights</Text>
      </View>
    );
  }

  // Generate AI summary when weights update
  useEffect(() => {
    if (!filteredWeights || filteredWeights.length === 0) return;

    const generateSummary = async () => {
      try {
        const weightLogs = filteredWeights
          .map(
            (w) =>
              `${w.measurement_date}: ${parseFloat(w.bodyweight).toFixed(1)} kg`
          )
          .join("\n");

        const prompt = `
    You are a fitness data analyst AI. Analyze the following daily weight logs.

    Weight Logs:
    ${weightLogs}

    User goal: maintain a healthy trend and improve fitness.

    Generate a motivational fitness summary in **exactly 30 words** that includes:
    1. Overall weight trend (gain/loss and rate)
    2. Notable patterns or fluctuations
    3. Two short actionable suggestions for improvement
    4. A motivating closing line.

    Keep the language concise, factual, and encouraging.
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        setAiSummary(text);
      } catch (err) {
        console.error("Gemini summary error:", err);
        setAiSummary("Could not generate AI summary.");
      }
    };

    generateSummary();
  }, [filteredWeights]);

  return (
    <View style={styles.wrapper}>
      {/* Month Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        <TouchableOpacity
          style={[styles.tab, selectedMonth === "all" && styles.tabActive]}
          onPress={() => setSelectedMonth("all")}
        >
          <Text
            style={[
              styles.tabText,
              selectedMonth === "all" && styles.tabTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {availableMonths.map((month) => (
          <TouchableOpacity
            key={month}
            style={[styles.tab, selectedMonth === month && styles.tabActive]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text
              style={[
                styles.tabText,
                selectedMonth === month && styles.tabTextActive,
              ]}
            >
              {formatMonthTab(month)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {aiSummary ? (
        <View
          style={{
            backgroundColor: "#F0F8FF",
            borderRadius: 12,
            padding: 16,
            marginTop: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
            AI Fitness Insights 🤖
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22, color: "#333" }}>
            {aiSummary}
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#F0F8FF",
            borderRadius: 12,
            padding: 16,
            marginTop: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
            AI Fitness Insights 🤖
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22, color: "#333" }}>
            Loading...
          </Text>
        </View>
      )}
      {/* Weights List */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Chart */}
          {chartData && chartData.datasets[0].data.length > 0 && (
            <View style={styles.chartScrollWrapper}>
              <Text style={styles.chartTitle}>Weight Trend</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              >
                <LineChart
                  data={chartData}
                  width={Math.max(
                    chartData.labels.length * 80,
                    screenWidth - 64
                  )}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "5",
                      strokeWidth: "2",
                      stroke: "#007AFF",
                    },
                    propsForBackgroundLines: {
                      strokeDasharray: "",
                      stroke: "#E5E5E5",
                      strokeWidth: 1,
                    },
                  }}
                  bezier
                  style={styles.chart}
                  fromZero={false}
                />
              </ScrollView>
            </View>
          )}

          <Text style={styles.headerText}>Weight History</Text>
          {filteredWeights && filteredWeights.length > 0 ? (
            filteredWeights.map((weight, index) => (
              <View key={weight.id} style={styles.weightItem}>
                <View style={styles.badge}>
                  <Text style={styles.indexText}>#{index + 1}</Text>
                </View>
                <View style={styles.weightContent}>
                  <Text style={styles.bodyweightText}>
                    {weight.bodyweight} <Text style={styles.unitText}>kg</Text>
                  </Text>
                  {weight.measurement_date && (
                    <Text style={styles.dateText}>
                      {formatDate(weight.measurement_date)}
                    </Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              {selectedMonth === "all"
                ? "No weights recorded yet"
                : "No weights recorded for this month"}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabsContainer: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  chartScrollWrapper: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A1A",
    paddingLeft: 8,
  },
  chart: {
    borderRadius: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1A1A1A",
  },
  weightItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  indexText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  weightContent: {
    flex: 1,
  },
  bodyweightText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  unitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "400",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
});
