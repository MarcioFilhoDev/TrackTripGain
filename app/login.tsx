import React from "react";
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

//  Constants
import ControllerComponent from "@/components/Controller";
import { colors } from "@/constants/theme";
import useSignIn from "@/hooks/useSignIn";

export default function Login() {
  const { control, errors, handleSubmit, isSubmitting, onSubmit } = useSignIn();

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

          <View className="flex-col mt-[20%]">
            <ControllerComponent
              control={control}
              name="email"
              placeholder="digite seu e-mail"
              errors={errors}
              iconName="Mail"
            />

            <ControllerComponent
              control={control}
              name="password"
              placeholder="digite sua senha"
              errors={errors}
              iconName="Lock"
              toggleVisibleContent
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              title="Acessar"
              loading={isSubmitting}
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
