import { colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import {
  ChartNoAxesCombinedIcon,
  Home,
  Scroll,
  User2Icon,
} from "lucide-react-native";
import { View } from "react-native";

export default function PainelRoutes() {
  return (
    <View className="flex-1 pt-10">
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabelVisibilityMode: "unlabeled",
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopWidth: 0,
          },
          tabBarActiveBackgroundColor: "#fff",
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#fff",
          tabBarIconStyle: {
            height: 40,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            href: null,
            tabBarIcon: ({ color, size }) => (
              <ChartNoAxesCombinedIcon size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="trips"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Scroll size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <User2Icon size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
