import React from "react";
import { View } from "react-native";

import FilterButtons from "@/components/FilterButtons";
import { sampleData } from "@/types/data";

export default function Dashboard() {
  const chartData = sampleData["1M"];

  return (
    <View className="flex-1 bg-background">
      <FilterButtons />

      {/* <Chart data={chartData} /> */}
    </View>
  );
}
