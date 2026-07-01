import { colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/AuthContext";
import useSignOut from "@/hooks/useSignOut";
import useTripCount from "@/hooks/useTripCount";
import { useFocusEffect } from "expo-router";
import { Power } from "lucide-react-native";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { count, loading, reloadUserTripStatus, totalGain } = useTripCount();
  const [visibleModal, setVisibleModal] = useState(false);

  const { onSubmit } = useSignOut();

  useFocusEffect(
    useCallback(() => {
      reloadUserTripStatus();
    }, []),
  );

  return (
    <View className="flex-1 bg-background px-6 pt-[50] pb-8 justify-between">
      <View className="items-center">
        <Image
          source={require("../../assets/images/account.png")}
          className="w-28 h-28 rounded-3xl bg-white mb-6 elevation"
        />

        <Text className="text-2xl font-bold text-text">
          {userData?.name.toUpperCase()}
        </Text>

        <Text className="text-zinc-500 ">{userData?.email}</Text>

        <View className="w-full flex-row justify-around rounded-3xl mt-6">
          <View className="items-center flex-1">
            <Text className="text-zinc-500 text-base">Total de viagens</Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                className="mt-4"
              />
            ) : (
              <Text className="text-primary text-xl font-bold">
                {count ?? "0"}
              </Text>
            )}
          </View>

          <View className="w-[1px] h-full bg-black/50" />

          <View className="items-center flex-1">
            <Text className="text-zinc-500 text-base">Total ganho</Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                className="mt-4"
              />
            ) : (
              <Text className="text-primary text-xl font-bold">
                R$ {totalGain?.toFixed(2).replace(".", ",")}
              </Text>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          Alert.alert("Você está prestes a sair", "Deseja realmente sair?", [
            {
              text: "Sair",
              onPress: onSubmit,
            },
            {
              text: "Não",
              style: "default",
            },
          ])
        }
        className="bg-white border-2 border-red-600 h-14 rounded-2xl flex-row items-center justify-center gap-3"
      >
        <Power size={20} color="#dc2626" />

        <Text className="text-red-600  text-base font-semibold">
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
