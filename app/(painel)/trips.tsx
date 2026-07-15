import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import TripItem from "@/components/TripItem";
import { colors } from "@/constants/theme";

import useDeleteTrip from "@/hooks/useDeleteTrip";
import useGetTrips from "@/hooks/useGetTrips";

import SelectPeriodo from "@/components/SelectPeriodo";
import {
  Calendar as CalendarIcon,
  Fuel,
  PlusCircle,
  Search,
  SearchX,
  Wallet,
  X,
} from "lucide-react-native";

export default function Trips() {
  const { loadTrips, filteredTrips, totalGain, totalOleo, tripList, loading } =
    useGetTrips();
  const { deleteTrip } = useDeleteTrip();

  const [limit, setLimit] = useState(0);
  const [search, setSearch] = useState("");
  const [visibleFilteredCalendar, setVisibleFilteredCalendar] = useState(false);
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

  async function handleFilter(startDate: string, endDate: string) {
    await filteredTrips({ startDate: startDate, endDate: endDate });
  }

  return (
    <View className="flex-1 px-[10%] pb-[5%] bg-background pt-[50]">
      <Text className="text-text text-[26px] font-medium">
        Confira suas viagens realizadas
      </Text>

      <View className="flex-row items-center mt-4 mb-4 gap-2">
        <View className="flex-1 flex-row items-center gap-2 bg-white px-4 rounded-lg elevation">
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

        <TouchableOpacity
          onPress={() => setVisibleFilteredCalendar(true)}
          className="bg-primary p-3 rounded-lg"
        >
          <CalendarIcon size={20} color={"#fff"} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {visibleFilteredCalendar && (
        <Modal
          animationType="slide"
          transparent
          visible={visibleFilteredCalendar}
        >
          <SelectPeriodo
            filter={handleFilter}
            closeModal={() => setVisibleFilteredCalendar(false)}
          />
        </Modal>
      )}

      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-lg p-3 elevation">
          <View className="flex-row items-center gap-2 mb-1">
            <Wallet size={16} color={colors.primary} />
            <Text className="text-placeholder text-xs font-medium">
              Ganho do período
            </Text>
          </View>
          <Text className="text-text text-lg font-bold">
            R$ {totalGain?.toFixed(2).replace(".", ",") ?? "0,00"}
          </Text>
        </View>

        <View className="flex-1 bg-white rounded-lg p-3 elevation">
          <View className="flex-row items-center gap-2 mb-1">
            <Fuel size={16} color={colors.primary} />
            <Text className="text-placeholder text-xs font-medium">
              Óleo diesel
            </Text>
          </View>
          <Text className="text-text text-lg font-bold">
            {totalOleo?.toFixed(2).replace(".", ",") ?? "0,00"} L
          </Text>
        </View>
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
              <View className="flex-row h-full items-center justify-center mt-6 gap-2">
                <SearchX size={22} color={"#121212"} />
                <Text className="text-[#121212] font-semibold">
                  Nenhum registro foi encontrado!
                </Text>
              </View>
            ) : (
              <View className="flex-row h-full items-center justify-center mt-6 gap-2">
                <Text className="text-[#121212] font-semibold">
                  Você ainda não realizou uma viagem.
                </Text>
              </View>
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
