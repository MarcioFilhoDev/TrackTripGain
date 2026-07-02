import React from "react";
import { Pressable, Text, View } from "react-native";

interface DeleteTripModalProps {
  id: string;
  closeModal: () => void;
  deleteTrip: (id: string) => void;
}

export default function DeleteTripModal({
  id,
  closeModal,
  deleteTrip,
}: DeleteTripModalProps) {
  return (
    <Pressable className="bg-black/50 flex-1 items-center justify-center">
      <View className="bg-white w-[80%] px-6 py-4 rounded-lg ">
        <Text>Você quer mesmo deletar essa viagem?</Text>

        <View className="flex-row justify-end gap-3 mt-4">
          <Pressable
            onPress={() => closeModal()}
            className="px-4 py-3 rounded-lg bg-gray-100 active:bg-gray-200"
          >
            <Text className="text-gray-700 font-medium text-center">
              Cancelar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              deleteTrip(id);
            }}
            className="px-4 py-3 rounded-lg bg-red-500 active:bg-red-600"
          >
            <Text className="text-white font-medium text-center">Deletar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
