import { Pressable, Keyboard } from "react-native";
import { Svg, Path } from "react-native-svg";
import { Sheet, Text, YStack, XStack, Input, Button } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { triggerHaptic } from "@/utils/haptics";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { useAddWeightMutation } from "@/features/bodyweight/bodyweightApi";

export default function LogBodyWeight({ open, onOpenChange }) {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [addWeight, { isLoading }] = useAddWeightMutation();
  const { user } = useAuth();

  useEffect(() => {
    if (!open) {
      setWeight("");
      setDate(new Date());
      setShowPicker(false);
    }
  }, [open]);

  const handleSave = async () => {
    await triggerHaptic("light");
    Keyboard.dismiss();

    if (!weight || isNaN(Number(weight))) {
      console.log("⚠️ Please enter a valid weight.");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await addWeight({
        weight: String(weight),
        date: formattedDate,
        userId: user.$id,
      }).unwrap();
      console.log("✅ Saved weight:", response);
      onOpenChange(false);
    } catch (error) {
      console.error("❌ Failed to save weight:", error);
    }
  };

  const handleCancel = async () => {
    await triggerHaptic("light");
    onOpenChange(false);
    Keyboard.dismiss();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) Keyboard.dismiss();
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
        position="relative"
      >
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={16} color="#1E272E" fontWeight="600" fontFamily="$body">
            Log Body Weight
          </Text>
          <Pressable
            onPress={handleCancel}
            android_ripple={{ color: "#aaa" }}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
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
        </XStack>
        <YStack space="$3">
          <Text fontSize={14} color="#979DA3" fontWeight="400" fontFamily="$body">
            Here you can input your new weight.
          </Text>
          <YStack space="$2">
            <Text fontSize={14} color="#1E272E" fontWeight="600" fontFamily="$body">
              Date
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
              <Text color="#1E272E">{date.toLocaleDateString()}</Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </YStack>
          <YStack space="$2">
            <Text fontSize={14} color="#1E272E" fontWeight="600" fontFamily="$body">
              Weight (in Kilogram)
            </Text>
            <Input
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="Enter your weight"
              backgroundColor="white"
              borderColor="#E0E0E0"
              borderWidth={1}
              borderRadius={10}
              padding="$2"
            />
          </YStack>
          <XStack justifyContent="space-between" marginTop="$4">
            <Button
              onPress={handleCancel}
              backgroundColor="#E0E0E0"
              color="#1E272E"
              flex={1}
              marginRight="$2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSave}
              backgroundColor="#007AFF"
              color="white"
              flex={1}
              marginLeft="$2"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
