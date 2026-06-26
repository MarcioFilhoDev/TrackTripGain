import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Link } from "expo-router";

//  Components
import Button from "@/components/Button";
import Input from "@/components/Input";

//  Constants
import { colors } from "@/constants/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log({ email, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text className="text-2xl font-bold text-text">
            Bem-vindo de volta
          </Text>

          <Text className="text-2xl font-bold text-white bg-primary self-start px-2 py-0.5 ">
            Acesse sua conta.
          </Text>

          <View className="flex-col gap-6 mt-[20%]">
            <Input
              iconName="Mail"
              placeholder="digite seu e-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            <Input
              iconName="Lock"
              placeholder="*********"
              toggleVisibleContent
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <Button
              onPress={handleLogin}
              title="Acessar"
              variant="primary"
              activeOpacity={0.75}
            />
          </View>

          <View className="flex-row my-4 items-center gap-4">
            <View className="bg-placeholder/70 h-0.5 flex-1" />
            <Text className="flex-2 text-placeholder">ou</Text>
            <View className="bg-placeholder/70 h-0.5 flex-1" />
          </View>

          <Link href={"/signup"} className="text-center italic underline">
            Crie uma conta
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: "10%",
  },
});
