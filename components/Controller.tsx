import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Text } from "react-native";
import Input from "./Input";

import * as Icons from "lucide-react-native";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  iconName?: keyof typeof Icons;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  toggleVisibleContent?: boolean;
};

export default function ControllerComponent<T extends FieldValues>({
  control,
  errors,
  name,
  iconName,
  ...inputProps
}: ControlledInputProps<T>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Input
            iconName={iconName}
            value={value}
            onChangeText={onChange}
            {...inputProps}
          />
        )}
      />
      {errors[name] && (
        <Text className="text-left text-red-500 mt-1 mb-4">
          {errors[name]?.message as string}
        </Text>
      )}
    </>
  );
}
