import useGetCustomers from "@/hooks/useGetCustomers";
import React, { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import ButtonFilter from "./ButtonFilter";
import SelectClientes from "./SelectClientes";
import SelectPeriodo from "./SelectPeriodo";

export default function FilterButtons() {
  const [modalClientes, setModalClientes] = useState(false);
  const [modalPeriodo, setModalPeriodo] = useState(false);

  const { reloadCustomers, customersList } = useGetCustomers();

  async function handleSelectCustomers() {
    setModalClientes(true);
    await reloadCustomers();
  }

  return (
    <View className="flex-row gap-4 mx-[5%] mt-[5%] self-end">
      <ButtonFilter label="Clientes" onPress={() => handleSelectCustomers()} />

      <Modal visible={modalClientes} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setModalClientes(false)}
        >
          <View className="absolute right-[5%] top-24">
            <SelectClientes
              closeModal={() => setModalClientes(false)}
              customersList={customersList}
            />
          </View>
        </Pressable>
      </Modal>

      <ButtonFilter label="Período" onPress={() => setModalPeriodo(true)} />

      <Modal visible={modalPeriodo} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/10"
          onPress={() => setModalPeriodo(false)}
        >
          <View className="absolute right-[5%] top-24">
            <SelectPeriodo />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
