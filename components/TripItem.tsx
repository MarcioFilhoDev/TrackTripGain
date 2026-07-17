import { colors } from "@/constants/theme";
import { tripProps } from "@/hooks/useGetTrips";
import {
  Calendar,
  Fuel,
  MapPin,
  TrendingUp,
  Weight,
} from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DeleteTripModal from "./DeleteTripModal";

interface TripItemProps extends tripProps {
  deleteTrip: (id: string) => void;
}

const formatBRL = (value: number) => value.toFixed(2).replace(".", ",");

export default function TripItem({
  customer,
  gain,
  tripDate,
  totalKm,
  totalTon,
  id,
  fuel,
  valueFuel,
  valuePerKm,
  deleteTrip,
}: TripItemProps) {
  const formattedDate = new Date(tripDate).toLocaleDateString("pt-BR");
  const gross = totalKm * totalTon * valuePerKm;

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  return (
    <TouchableOpacity
      onLongPress={() => setVisibleModalDelete(true)}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
    >
      <View>
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className="text-[18px] font-semibold text-text flex-1 mr-2"
            numberOfLines={1}
          >
            {customer}
          </Text>
          <View className="flex-row items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
            <Calendar size={13} color={colors.placeholder} />
            <Text className="text-xs text-placeholder">{formattedDate}</Text>
          </View>
        </View>

        <View className="bg-emerald-50 rounded-xl p-3 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="bg-emerald-100 p-1.5 rounded-full">
                <TrendingUp size={14} color="#059669" />
              </View>
              <Text className="text-xs text-emerald-700 font-medium">
                Lucro líquido
              </Text>
            </View>
            <Text className="text-[22px] font-bold text-emerald-600">
              R$ {formatBRL(gain)}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2 mb-3">
          <View className="flex-1 bg-gray-50 rounded-xl p-3">
            <Text className="text-xs text-gray-400 mb-1">Bruto</Text>
            <Text className="text-sm font-bold text-purple-950">
              R$ {formatBRL(gross)}
            </Text>
          </View>

          <View className="flex-1 bg-rose-50 rounded-xl p-3">
            <View className="flex-row items-center gap-1 mb-1">
              <Fuel size={11} color="#e11d48" />
              <Text className="text-xs text-rose-400">Combustível</Text>
            </View>
            <Text className="text-sm font-bold text-rose-600">
              -R$ {formatBRL(valueFuel)}
            </Text>
          </View>

          <View className="flex-1 bg-gray-50 rounded-xl p-3">
            <Text className="text-xs text-gray-400 mb-1">Valor/km</Text>
            <Text className="text-sm font-bold text-purple-950">
              R$ {formatBRL(valuePerKm)}
            </Text>
          </View>
        </View>

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
              <Text className="text-xs text-gray-400">Peso</Text>
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
