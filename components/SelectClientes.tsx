import { colors } from "@/constants/theme";
import { Search, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

interface SelectClientesProps {
  closeModal: () => void;
  customersList: string[];
}

export default function SelectClientes({
  closeModal,
  customersList,
}: SelectClientesProps) {
  const [search, setSearch] = useState("");

  const filteredList = useMemo(() => {
    if (!search.trim()) return customersList;
    return customersList.filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [search, customersList]);

  function handleSelect(item: string) {
    closeModal();
  }

  return (
    <View className="w-60 max-h-80 min-h-[114] rounded-2xl bg-white py-3">
      <View className="px-3 pb-4">
        <View className="flex-row items-center rounded-lg bg-gray-100 px-3 h-9 gap-2">
          <Search size={14} color={colors.placeholder} />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Buscar cliente"
            placeholderTextColor={colors.placeholder}
            className="flex-1 text-sm text-gray-900 p-0"
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <X size={14} color={colors.placeholder} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item, index) => `${item}-${index}`}
        className="mx-2"
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-100 ml-11" />
        )}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => handleSelect(item)}
              className="flex-row items-center px-1.5 py-2 rounded-lg active:bg-gray-100"
            >
              <View className="w-7 h-7 rounded-full bg-gray-200 items-center justify-center mr-2.5">
                <Text className="text-[11px] font-bold text-gray-600">
                  {item[0]}
                </Text>
              </View>

              <Text className="flex-1 text-sm" numberOfLines={1}>
                {item}
              </Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="flex items-center justify-center py-2">
            <Text className="text-sm text-placeholder">
              Nenhum cliente encontrado
            </Text>
          </View>
        }
      />
    </View>
  );
}
