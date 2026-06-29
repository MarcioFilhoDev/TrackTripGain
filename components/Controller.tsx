import React, { useEffect, useRef, useState } from "react";
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
          <ControlledText
            label={label}
            iconName={iconName}
            value={value}
            onChange={onChange}
            formatValue={formatValue}
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

function ControlledText({ value, onChange, formatValue, ...inputProps }: any) {
  const [text, setText] = useState(
    value === undefined || value === null ? "" : String(value),
  );
  const lastEmitted = useRef(value);

  useEffect(() => {
    if (value !== lastEmitted.current) {
      setText(value === undefined || value === null ? "" : String(value));
      lastEmitted.current = value;
    }
  }, [value]);

  const handleChangeText = (rawText: string) => {
    setText(rawText);
    const parsed = formatValue ? formatValue(rawText) : rawText;
    lastEmitted.current = parsed;
    onChange(parsed);
  };

  return <Input {...inputProps} value={text} onChangeText={handleChangeText} />;
}
