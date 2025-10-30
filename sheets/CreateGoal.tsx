import { useAuth } from "@/contexts/AuthContext/useAuth";
import { triggerHaptic } from "@/utils/haptics";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Input, Sheet, Text, XStack, YStack } from "tamagui";

// Define goal types
const GOAL_TYPES = [
  { id: "weight_loss", label: "Weight Loss" },
  { id: "weight_gain", label: "Weight Gain" },
  { id: "strength", label: "Strength Training" },
];

export default function SetNewGoal({ open, onOpenChange }) {
  const [goalType, setGoalType] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showGoalTypePicker, setShowGoalTypePicker] = useState(false);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setGoalType("");
      setTargetValue("");
      setDeadline(new Date());
      setNotes("");
      setShowPicker(false);
      setShowGoalTypePicker(false);
    }
  }, [open]);

  const handleSave = async () => {
    await triggerHaptic("light");
    Keyboard.dismiss();

    if (!goalType) {
      console.log("⚠️ Please select a goal type.");
      return;
    }

    if (!targetValue) {
      console.log("⚠️ Please enter a target value.");
      return;
    }

    try {
      setIsLoading(true);
      const formattedDeadline = deadline.toISOString().split("T")[0];

      const goalData = {
        goalType,
        targetValue,
        deadline: formattedDeadline,
        notes,
        userId: user.$id,
      };

      console.log("✅ Saved goal:", goalData);
      // TODO: Add your API call here
      // await addGoal(goalData).unwrap();

      onOpenChange(false);
    } catch (error) {
      console.error("❌ Failed to save goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    await triggerHaptic("light");
    onOpenChange(false);
    Keyboard.dismiss();
  };

  const selectedGoalLabel =
    GOAL_TYPES.find((g) => g.id === goalType)?.label || "Select goal type";

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          Keyboard.dismiss();
          setShowGoalTypePicker(false);
        }
        onOpenChange(isOpen);
      }}
      snapPointsMode="fit"
      moveOnKeyboardChange
      dismissOnSnapToBottom
    >
      <Sheet.Handle />
      <Sheet.Frame
        padding="$4"
        backgroundColor="#F6F8FA"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
      >
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom="$3"
        >
          <Pressable
            onPress={handleCancel}
            android_ripple={{ color: "#aaa" }}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            disabled={isLoading}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              color="#1E272E"
            >
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M18 6l-12 12" />
              <Path d="M6 6l12 12" />
            </Svg>
          </Pressable>
          <Text
            fontSize={16}
            color="#1E272E"
            fontWeight="600"
            fontFamily="$body"
          >
            Set New Goal
          </Text>
          <Pressable
            onPress={handleSave}
            android_ripple={{ color: "#aaa" }}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            disabled={isLoading}
          >
            <Text
              fontSize={16}
              color={isLoading ? "#999" : "#007AFF"}
              fontWeight="600"
              fontFamily="$body"
            >
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </XStack>
        <YStack space="$3">
          <YStack space="$2">
            <Text
              fontSize={14}
              color="#1E272E"
              fontWeight="600"
              fontFamily="$body"
            >
              Goal Type *
            </Text>
            <Pressable
              onPress={() => {
                setShowGoalTypePicker(!showGoalTypePicker);
                Keyboard.dismiss();
              }}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                padding: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text color={goalType ? "#1E272E" : "#979DA3"}>
                {selectedGoalLabel}
              </Text>
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                color="#979DA3"
                style={{
                  transform: [
                    { rotate: showGoalTypePicker ? "180deg" : "0deg" },
                  ],
                }}
              >
                <Path d="M6 9l6 6 6-6" />
              </Svg>
            </Pressable>
            {showGoalTypePicker && (
              <YStack
                backgroundColor="white"
                borderRadius={10}
                borderWidth={1}
                borderColor="#E0E0E0"
                overflow="hidden"
                marginTop="$1"
              >
                {GOAL_TYPES.map((type, index) => (
                  <Pressable
                    key={type.id}
                    onPress={() => {
                      setGoalType(type.id);
                      setShowGoalTypePicker(false);
                      triggerHaptic("light");
                    }}
                    style={{
                      padding: 12,
                      borderBottomWidth: index < GOAL_TYPES.length - 1 ? 1 : 0,
                      borderBottomColor: "#E0E0E0",
                      backgroundColor:
                        goalType === type.id ? "#F0F0F0" : "white",
                    }}
                  >
                    <Text
                      color="#1E272E"
                      fontWeight={goalType === type.id ? "600" : "400"}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                ))}
              </YStack>
            )}
          </YStack>
          <YStack space="$2">
            <Text
              fontSize={14}
              color="#1E272E"
              fontWeight="600"
              fontFamily="$body"
            >
              Target Value
            </Text>
            <Input
              value={targetValue}
              onChangeText={setTargetValue}
              placeholder="e.g., 75 kg, 10%, 100 lbs"
              backgroundColor="white"
              borderColor="#E0E0E0"
              borderWidth={1}
              borderRadius={10}
              padding="$2"
            />
          </YStack>
          <YStack space="$2">
            <Text
              fontSize={14}
              color="#1E272E"
              fontWeight="600"
              fontFamily="$body"
            >
              Deadline
            </Text>
            <Pressable
              onPress={() => {
                setShowPicker(true);
                Keyboard.dismiss();
              }}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                padding: 12,
              }}
            >
              <Text color="#1E272E">{deadline.toLocaleDateString()}</Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDeadline(selectedDate);
                }}
              />
            )}
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
