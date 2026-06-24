import { colors } from "@/constants/theme";
import AuthProvider from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(painel)" />
      </Stack>
    </AuthProvider>
  );
}
