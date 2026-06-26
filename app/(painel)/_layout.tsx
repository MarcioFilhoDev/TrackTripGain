import { colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import { ChartNoAxesCombinedIcon, Home, User2Icon } from "lucide-react-native";

export default function PainelRoutes() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelVisibilityMode: "unlabeled",
        tabBarStyle: {
          overflow: "hidden",
          marginHorizontal: "5%",
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          borderRadius: 4,
          marginBottom: "5%",
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
          tabBarIcon: ({ color, size }) => (
            <ChartNoAxesCombinedIcon size={size} color={color} />
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
  );
}
