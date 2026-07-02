import { colors } from "@/constants/theme";
import { tripProps } from "@/hooks/useGetTrips";
import { Calendar, MapPin, Weight } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DeleteTripModal from "./DeleteTripModal";

interface TripItemProps extends tripProps {
  deleteTrip: (id: string) => void;
}

export default function TripItem({
  customer,
  gain,
  tripDate,
  totalKm,
  totalTon,
  id,
  deleteTrip,
}: TripItemProps) {
  const formattedGain = gain.toFixed(2).replace(".", ",");
  const formattedDate = new Date(tripDate).toLocaleDateString("pt-BR");

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  return (
    <TouchableOpacity
      onLongPress={() => setVisibleModalDelete(true)}
      activeOpacity={0.5}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
    >
      <View>
        <View className="flex-row justify-between items-center mb-3">
          <Text
            className="text-[18px] font-semibold text-text"
            numberOfLines={1}
          >
            {customer}
          </Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-placeholder">{formattedDate}</Text>
            <Calendar size={12} color={colors.placeholder} />
          </View>
        </View>

        <Text className="text-[25px] font-bold text-emerald-600 mb-3">
          R$ {formattedGain}
        </Text>

        <View className="flex-row justify-between pt-3 border-t border-gray-100">
          <View className="flex-row items-center gap-2">
            <View className="bg-gray-50 p-2 rounded-full">
              <MapPin size={14} color="#4b5563" />
            </View>
            <View>
              <Text className="text-xs text-gray-400">Distância</Text>
              <Text className="text-sm font-medium text-gray-700">
                {totalKm} km
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="bg-gray-50 p-2 rounded-full">
              <Weight size={14} color="#4b5563" />
            </View>
            <View>
              <Text className="text-xs text-gray-400">Carga</Text>
              <Text className="text-sm font-medium text-gray-700">
                {totalTon} ton
              </Text>
            </View>
          </View>
        </View>

        <Modal visible={visibleModalDelete} transparent animationType="fade">
          <DeleteTripModal
            id={id}
            closeModal={() => setVisibleModalDelete(false)}
            deleteTrip={deleteTrip}
          />
        </Modal>
      </View>
    </TouchableOpacity>
  );
}
