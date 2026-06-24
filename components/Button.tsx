import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

//  variant | loading = anything -> default
export default function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-primary h-12 rounded justify-center items-center"
      style={[disabled && { backgroundColor: "gray" }, style]}
      {...rest}
    >
      <Text className="text-white text-xl font-bold tracking-wider">
        {loading ? <ActivityIndicator size={"small"} color={"#fff"} /> : title}
      </Text>
    </TouchableOpacity>
  );
}
