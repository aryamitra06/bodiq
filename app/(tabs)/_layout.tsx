import { Tabs } from "expo-router";
import { Image, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function TabsLayout() {
  const HomeIcon = ({ color = "black", size = 24 }) => (
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
      <Path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" />
      <Path d="M17 15.5H15V17.5H17V15.5Z" strokeWidth={2} />
    </Svg>
  );

  const TrendsIcon = ({ color = "black", size = 24 }) => (
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
      <Path d="M7 17L7 13" />
      <Path d="M12 17L12 7" />
      <Path d="M17 17L17 11" />
      <Path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" />
    </Svg>
  );

  const FriendsIcon = ({ color = "black", size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 11C13 8.79086 11.2091 7 9 7C6.79086 7 5 8.79086 5 11C5 13.2091 6.79086 15 9 15C11.2091 15 13 13.2091 13 11Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.0386 7.55773C11.0131 7.37547 11 7.18927 11 7C11 4.79086 12.7909 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C14.2554 11 13.5584 10.7966 12.9614 10.4423"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 21C15 17.6863 12.3137 15 9 15C5.68629 15 3 17.6863 3 21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 17C21 13.6863 18.3137 11 15 11"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const BellIcon = ({ size = 24, color = "#141B34" }) => (
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
      <Path d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18" />
      <Path d="M19.2311 18H4.76887C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.634 19 9.5V12.2558C19 13.0514 19.3161 13.8145 19.8787 14.3771L20.4819 14.9803C20.8136 15.3121 21 15.762 21 16.2311C21 17.208 20.208 18 19.2311 18Z" />
    </Svg>
  );

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#F6F8FA",
          shadowColor: "transparent",
          elevation: 0,
          borderBottomWidth: 0,
          height: 120,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },

        tabBarIcon: ({ color, size }) => {
          if (route.name === "index")
            return <HomeIcon color={color} size={size} />;
          if (route.name === "trends")
            return <TrendsIcon color={color} size={size} />;
          if (route.name === "friends")
            return <FriendsIcon color={color} size={size} />;
        },
        tabBarActiveTintColor: "#FF6D04",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarShowLabel: false,
          headerLeft: () => (
            <Pressable
              onPress={() => alert("Notifications")}
              style={{
                marginLeft: 20,
                width: 50,
                height: 50,
                backgroundColor: "#5D646E",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/9.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => alert("Notifications")}
              style={{
                marginRight: 20,
                width: 50,
                height: 50,
                backgroundColor: "#5D646E",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BellIcon size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="trends"
        options={{
          title: "Trends",
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
