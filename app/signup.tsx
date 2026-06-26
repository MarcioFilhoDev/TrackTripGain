import Button from "@/components/Button";
import ControllerComponent from "@/components/Controller";
import { colors } from "@/constants/theme";
import useSignUp from "@/hooks/useSignUp";
import { router } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const { control, errors, handleSubmit, isSubmitting, onSubmit } = useSignUp();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="flex-row items-center bg-white self-start px-4 py-2 rounded-full gap-2"
          >
            <Text>
              <ArrowLeftCircle size={20} />
            </Text>
            <Text>Fazer login</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-white bg-primary self-start px-4 mt-[5%]">
            Vamos criar sua conta.
          </Text>

          <View className="flex-col mt-[20%]">
            <ControllerComponent
              control={control}
              name="name"
              errors={errors}
              iconName="User"
              placeholder="informe seu nome"
            />

            <ControllerComponent
              control={control}
              name="email"
              errors={errors}
              iconName="Mail"
              placeholder="informe seu e-mail"
              keyboardType="email-address"
            />

            <ControllerComponent
              control={control}
              name="password"
              errors={errors}
              iconName="Lock"
              placeholder="informe sua senha"
              toggleVisibleContent
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              title="Criar"
              variant="primary"
              activeOpacity={0.75}
              loading={isSubmitting}
            />
          </View>
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
