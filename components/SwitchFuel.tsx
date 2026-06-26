import { colors } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import Button from "./Button";

interface SwitchFuelProps {
  selected: boolean;
  onChange: (...event: any[]) => void;
}

export default function SwitchFuel({ selected, onChange }: SwitchFuelProps) {
  return (
    <View className="flex-row gap-8 mb-4">
      <Button
        title="Empresa"
        style={{
          flex: 1,
          backgroundColor: !selected ? colors.primary : colors.placeholder,
          borderRadius: 4,
        }}
        onPress={() => onChange(false)}
      />

      <Button
        title="Próprio"
        style={{
          flex: 1,
          backgroundColor: selected ? colors.primary : colors.placeholder,
          borderRadius: 4,
        }}
        onPress={() => onChange(true)}
      />
    </View>
  );
}
