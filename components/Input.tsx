import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/constants/theme";

import * as Icons from "lucide-react-native";
import { LucideIcon } from "lucide-react-native";

interface InputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Icons;
  toggleVisibleContent?: boolean;
}

export default function Input({
  label,
  iconName,
  toggleVisibleContent,
  ...rest
}: InputProps) {
  const [visiblePass, setVisiblePass] = useState(false);

  const Icon = iconName ? (Icons[iconName] as LucideIcon) : null;

  return (
    <View>
      {label && <Text className="text-lg font-medium">{label}</Text>}

      <View className="bg-white flex-row items-center px-4 gap-2 rounded elevation h-12">
        {Icon && <Icon size={24} color={colors.text} />}
        <TextInput
          className="flex-1 placeholder:text-placeholder text-[16px]"
          //  se ao chamar eu passo "toggleVisibleContent", verifico o status de "visiblePass"
          secureTextEntry={toggleVisibleContent ? !visiblePass : false}
          {...rest}
        />

        {toggleVisibleContent && (
          <Pressable onPress={() => setVisiblePass(!visiblePass)}>
            {visiblePass ? (
              <Icons.Eye size={24} color={colors.placeholder} />
            ) : (
              <Icons.EyeOff size={24} color={colors.placeholder} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
