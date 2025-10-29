import { useAuth } from "@/contexts/AuthContext/useAuth";
import React from "react";
import { Image, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { YStack, Button, Text, Card, XStack } from "tamagui";

const AuthScreen = () => {
  const { width, height } = Dimensions.get("window");
  const { googleSignIn, logout } = useAuth();

  const features = [
    "Helps to create diet plan",
    "Tracks your daily fitness activites",
    "Achieve your goals with friends",
  ];

  const TargetArrowIcon = ({ size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8
         c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
         C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20
         c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <Path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12
         c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
         C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <Path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
         C29.211,35.091,26.715,36,24,36
         c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025
         C9.505,39.556,16.227,44,24,44z"
      />
      <Path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303
         c-0.792,2.237-2.231,4.166-4.087,5.571
         c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238
         C36.971,39.205,44,34,44,24
         C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </Svg>
  );

  return (
    <YStack flex={1} backgroundColor="#fff">
      <YStack flex={0.65} alignItems="center">
        <Image
          source={require("../assets/images/auth_photo_1.png")}
          style={{ width: width, height: "100%", resizeMode: "cover" }}
        />
        <YStack
          position="absolute"
          bottom={-50}
          width="100%"
          paddingHorizontal={20}
        >
          <XStack justifyContent="space-between">
            {features.map((text, index) => (
              <Card
                key={index}
                borderRadius={16}
                padding={15}
                backgroundColor="#fff"
                width={(width - 60) / 3}
                elevation={3}
              >
                <Text
                  fontSize={12}
                  color="#666"
                  textAlign="center"
                  fontWeight="400"
                  fontFamily="$body"
                >
                  {text}
                </Text>
              </Card>
            ))}
          </XStack>
        </YStack>
      </YStack>
      <YStack flex={0.35} padding={30} justifyContent="space-around">
        <YStack alignItems="center">
          <Text
            fontSize={48}
            color="#1E7FE5"
            fontWeight="400"
            fontFamily="$display"
          >
            bodiq
          </Text>
          <Text
            fontSize={10}
            color="#666"
            fontWeight="400"
            textAlign="center"
            fontFamily="$body"
          >
            By Aryamitra Chaudhuri
          </Text>
        </YStack>
        <YStack gap="$2">
          <Button icon={TargetArrowIcon({ size: 24 })} onPress={googleSignIn}>
            Continue with Google
          </Button>
          <Text
            fontSize={12}
            color="#666"
            textAlign="center"
            fontWeight="400"
            fontFamily="$body"
          >
            By continuing to use the app, you accept our Terms & Conditions and
            Privacy Policy.
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default AuthScreen;
