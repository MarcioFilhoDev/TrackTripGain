import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";
import React, { useContext, useState } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  async function handleSignUp(name: string, email: string, password: string) {
    await signUp(name, email, password);
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

          <View className="flex-col gap-6 mt-[20%]">
            <Input
              iconName="User"
              placeholder="informe seu nome"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Input
              iconName="Mail"
              placeholder="informe seu e-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            <Input
              iconName="Lock"
              placeholder="informe sua senha"
              toggleVisibleContent
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <Button
              onPress={() => handleSignUp(name, email, password)}
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
