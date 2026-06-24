import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/AuthContext";
import useSignUp from "@/hooks/useAuth";
import { router } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";
import React, { useContext, useState } from "react";
import { Controller } from "react-hook-form";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  async function handleSignUp(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      alert("existem campos vazios");
      return;
    }

    await signUp(name, email, password).then(() => alert("deu certo"));
  }

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

          <Text className="text-2xl font-bold text-white bg-primary self-start px-4 mt-[10%]">
            Vamos criar sua conta.
          </Text>

          <View className="flex-col mt-[20%]" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  iconName="User"
                  placeholder="informe seu nome"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            {errors.name && (
              <Text className="text-left text-red-500 mt-1 mb-4">
                {errors.name?.message}
              </Text>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  iconName="Mail"
                  placeholder="informe seu e-mail"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
            />

            {errors.email && (
              <Text className="text-left text-red-500 mt-1 mb-4">
                {errors.email?.message}
              </Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  iconName="Lock"
                  placeholder="informe sua senha"
                  toggleVisibleContent
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            {errors.password && (
              <Text className="text-left text-red-500 mt-1 mb-4">
                {errors.password?.message}
              </Text>
            )}

            <Button
              onPress={handleSubmit(onSubmit)}
              title="Criar"
              variant="primary"
              activeOpacity={0.75}
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
