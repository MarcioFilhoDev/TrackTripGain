import { colors } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";

//  This screen is responsible to verify if, the user is authenticated or not
export default function Index() {
  return (
    <View>
      <ActivityIndicator size={"large"} color={colors.text} />
    </View>
  );
}
