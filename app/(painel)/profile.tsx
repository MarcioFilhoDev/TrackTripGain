import Button from "@/components/Button";
import useSignOut from "@/hooks/useSignOut";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { onSubmit } = useSignOut();

  return (
    <View>
      <Text>profile screen</Text>

      <Button title={"sair"} onPress={onSubmit} />
    </View>
  );
}
