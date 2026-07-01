import TripItem from "@/components/TripItem";
import useGetTrips from "@/hooks/useGetTrips";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

export default function Trips() {
  const { loadTrips, tripList } = useGetTrips();

  useFocusEffect(
    useCallback(() => {
      async function handleViewTrips() {
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

      <FlatList
        showsVerticalScrollIndicator={false}
        data={tripList}
        renderItem={({ index, item }) => <TripItem key={index} {...item} />}
      />
    </View>
  );
}
