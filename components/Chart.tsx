import React from "react";
import { Dimensions } from "react-native";

import { BarChart, BarChartPropsType } from "react-native-gifted-charts";

type ChartProps = BarChartPropsType & {};

export default function Chart({ ...rest }: ChartProps) {
  return (
    <BarChart
      {...rest}
      width={Dimensions.get("screen").width - 40}
      isAnimated
      adjustToWidth
      hideAxesAndRules
      hideOrigin
      hideYAxisText
      initialSpacing={0}
      endSpacing={0}
      hideRules
      frontColor={"red"}
      barBorderTopLeftRadius={4}
      barBorderTopRightRadius={4}
    />
  );
}
