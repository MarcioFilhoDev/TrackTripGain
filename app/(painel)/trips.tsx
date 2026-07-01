import TripItem from "@/components/TripItem";
import { colors } from "@/constants/theme";
import useGetTrips from "@/hooks/useGetTrips";
import { useFocusEffect } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Trips() {
  const { loadTrips, tripList, loading } = useGetTrips();
  const [limit, setLimit] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function handleViewTrips() {
        setLimit(5);
        await loadTrips();
      }

      handleViewTrips();

      return () => {};
    }, []),
  );

  return (
    <View className="flex-1 px-[10%] pb-[5%] bg-background pt-[50]">
      <Text className="text-text text-[26px] font-medium mb-8 ">
        Confira suas viagens realizadas
      </Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tripList.slice(0, limit)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TripItem {...item} />}
          ListEmptyComponent={() => (
            <Text>Você ainda não registrou nenhuma viagem</Text>
          )}
          ListFooterComponent={
            limit < tripList.length ? (
              <TouchableOpacity
                onPress={() => setLimit((prev) => prev + 5)}
                className="flex-row items-center bg-secondary justify-center h-12 rounded-full mt-4 gap-2"
              >
                <PlusCircle size={20} color={colors.text} />
                <Text className="font-medium">Carregar mais...</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </View>
  );
}
