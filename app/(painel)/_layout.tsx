import { Tabs } from "expo-router";

export default function PainelRoutes() {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
