import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { colors } from "@/constants/theme";
import * as Icons from "lucide-react-native";
import { LucideIcon } from "lucide-react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string | any;
  variant?: "primary" | "secondary";
  loading?: boolean;
  label?: string;
  styleText?: StyleProp<TextStyle>;
  iconName?: keyof typeof Icons;
}

//  variant | loading = anything -> default
export default function Button({
  title,
  variant = "primary",
  loading = false,
  label,
  iconName,
  disabled,
  style,
  styleText,
  ...rest
}: ButtonProps) {
  const Icon = iconName ? (Icons[iconName] as LucideIcon) : null;

  return (
    <View style={style}>
      {label && <Text className="text-lg font-medium">{label}</Text>}

      <TouchableOpacity
        className="bg-primary h-12 rounded justify-center items-center"
        style={[disabled && { backgroundColor: "gray" }, style]}
        {...rest}
      >
        <Text
          style={styleText}
          className="text-white text-xl font-bold tracking-wider"
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            title
          )}
        </Text>

        {Icon && (
          <View className="absolute right-4">
            <Icon size={24} color={colors.placeholder} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
