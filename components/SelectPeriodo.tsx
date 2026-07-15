import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface PeriodoProps {
  closeModal: () => void;
  filter: (startDate: string, endDate: string) => void;
}
type MarkedDate = {
  selected?: boolean;
  selectedColor?: string;
  textColor?: string;
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
};

type MarkedDates = {
  [key: string]: MarkedDate;
};

export default function SelectPeriodo({ closeModal, filter }: PeriodoProps) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  function handleOnDayPress(day: DateData) {
    //  Verificando se usuário clicou alguma vez
    if (!startDate && !endDate) {
      setStartDate(day.dateString);
      setEndDate(null);

      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: "#064E3B",
          textColor: "#fff",
        },
      });

      return;
    }

    //  Se o dia selecionado é menor que o ultimo dia selecionado
    if (day.dateString < startDate!) {
      // Caso escolha um dia anterior ao inicial
      setStartDate(day.dateString);
      setEndDate(null);

      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: "#064E3B",
          textColor: "#fff",
        },
      });

      return;
    }

    setEndDate(day.dateString);

    const interval = getMarkedDates(startDate!, day.dateString);

    setMarkedDates(interval);
  }

  function getMarkedDates(start: string, end: string) {
    const marked: MarkedDates = {};

    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      const date = current.toISOString().split("T")[0];

      marked[date] = {
        color: "#064E3B",
        textColor: "#fff",
      };

      current.setDate(current.getDate() + 1);
    }

    marked[start] = {
      startingDay: true,
      color: "#064E3B",
      textColor: "#fff",
    };

    marked[end] = {
      endingDay: true,
      color: "#064E3B",
      textColor: "#fff",
    };

    return marked;
  }

  return (
    <View className="flex flex-1">
      <Pressable
        onPress={() => {
          closeModal();
          setStartDate(null);
          setEndDate(null);
        }}
        className="flex-1 bg-black/50"
      />

      <View className="bg-white flex-1 px-4">
        <Calendar
          markingType="period"
          onDayPress={(date) => handleOnDayPress(date)}
          markedDates={markedDates}
          enableSwipeMonths
          theme={{
            todayTextColor: "red",
            selectedDayBackgroundColor: "#064E3B",
            selectedDayTextColor: "#fff",
          }}
        />

        <TouchableOpacity
          onPress={() => {
            filter(startDate!, endDate!);
            closeModal();
          }}
          className="bg-primary h-10 mt-6 mx-4 rounded items-center justify-center "
        >
          <Text className="color-white text-lg font-medium">Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
