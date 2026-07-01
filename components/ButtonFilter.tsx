import { ChevronDown } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonFilterProps extends TouchableOpacityProps {
  label?: string;
}

export default function ButtonFilter({ label, ...rest }: ButtonFilterProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-white py-1 px-2 flex-row items-center border-2 border-blue-900 rounded"
    >
      <Text className="text-blue-900 font-semibold">{label}</Text>
      <ChevronDown color={"#1e3a8a"} size={24} />
    </TouchableOpacity>
  );
}
