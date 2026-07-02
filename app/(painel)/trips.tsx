import TripItem from "@/components/TripItem";
import { colors } from "@/constants/theme";
import useDeleteTrip from "@/hooks/useDeleteTrip";
import useGetTrips from "@/hooks/useGetTrips";
import { useFocusEffect } from "expo-router";
import { PlusCircle, Search, X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Trips() {
  const { loadTrips, tripList, loading } = useGetTrips();
  const { deleteTrip } = useDeleteTrip();
  const [limit, setLimit] = useState(0);

  const [search, setSearch] = useState("");
  const filterTrips =
    search.length > 0
      ? tripList.filter((trip) => trip.customer.includes(search))
      : tripList;

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

  async function handleDeleteTrip(id: string) {
    await deleteTrip(id);
    await loadTrips();
  }

  return (
    <View className="flex-1 px-[10%] pb-[5%] bg-background pt-[50]">
      <Text className="text-text text-[26px] font-medium">
        Confira suas viagens realizadas
      </Text>

      <View className="flex-row items-center gap-2 mt-4 mb-2 bg-white px-4 rounded-lg elevation">
        <Search size={20} color={colors.placeholder} />
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="digite algo"
          placeholderTextColor={colors.placeholder}
          className="flex-1"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <X size={20} color={colors.placeholder} />
          </Pressable>
        )}
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterTrips.slice(0, limit)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TripItem {...item} deleteTrip={handleDeleteTrip} />
          )}
          ListEmptyComponent={() =>
            search.length > 0 || filterTrips.length < 0 ? (
              <Text>Ops, nenhum registro foi encontrado.</Text>
            ) : (
              <Text>Você ainda não registrou nenhuma viagem</Text>
            )
          }
          ListFooterComponent={
            limit < filterTrips.length && filterTrips.length > 0 ? (
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
