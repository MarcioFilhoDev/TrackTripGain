import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Input from "./Input";

import * as Icons from "lucide-react-native";

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;

  iconName?: keyof typeof Icons;

  label?: string;
  placeholder: string;

  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  toggleVisibleContent?: boolean;
  style?: StyleProp<ViewStyle>;

  formatValue?: (value: string) => any;
}

export default function ControllerComponent<T extends FieldValues>({
  control,
  errors,
  name,
  iconName,
  label,
  style,
  formatValue,
  ...inputProps
}: ControlledInputProps<T>) {
  return (
    <View className="mb-4" style={style}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Input
            label={label}
            iconName={iconName}
            value={value === undefined || value === null ? "" : String(value)}
            onChangeText={(text) =>
              onChange(formatValue ? formatValue(text) : text)
            }
            {...inputProps}
          />
        )}
      />
      {errors[name] && (
        <Text className="text-left text-red-500 mt-1">
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
}
