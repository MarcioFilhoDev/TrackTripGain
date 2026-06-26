import Button from "@/components/Button";
import ControllerComponent from "@/components/Controller";
import SwitchFuel from "@/components/SwitchFuel";
import { colors } from "@/constants/theme";
import useNewTrip from "@/hooks/useTrip";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  const { control, errors, handleSubmit, isSubmitting, onSubmit, watch } =
    useNewTrip();

  const totalKm = watch("totalKm") ?? 0;
  const totalTon = watch("totalTon") ?? 0;
  const valuePerKm = watch("valuePerKm") ?? 0;
  const fuel = watch("fuel") ?? 0;
  const valueFuel = watch("valueFuel") ?? 0;

  const valorBruto = totalKm * valuePerKm * totalTon;

  //  se tem "valueFuel" utiliza-se seu valor, se não, utiliza "0"
  const valorLiquido = fuel ? valorBruto - (valueFuel ?? 0) : valorBruto;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ControllerComponent
          control={control}
          name="customer"
          errors={errors}
          placeholder="nome do cliente"
          label="Cliente"
        />

        {/* Abrir calendario e selecionar dia da viagem */}
        <Button
          activeOpacity={0.85}
          label="Data"
          title={new Date().toLocaleDateString("pt-BR")}
          className="bg-white flex-row items-center px-4 gap-2 rounded elevation h-12 mb-4"
          styleText={{ color: "#999", fontWeight: "normal" }}
          iconName="Calendar"
        />

        <View className="flex-row gap-8">
          <ControllerComponent
            control={control}
            name="totalKm"
            errors={errors}
            label="Km total"
            placeholder="0"
            style={{ flex: 1 }}
            keyboardType="numeric"
            formatValue={(text) => Number(text)}
          />

          <ControllerComponent
            control={control}
            name="totalTon"
            errors={errors}
            label="Toneladas"
            placeholder="0"
            style={{ flex: 1 }}
            keyboardType="numeric"
            formatValue={(text) => Number(text)}
          />
        </View>

        <ControllerComponent
          control={control}
          name="valuePerKm"
          errors={errors}
          label="Valor por km (R$)"
          placeholder="0,00"
          keyboardType="numeric"
          formatValue={(text) => Number(text.replace(",", "."))}
        />

        <Controller
          control={control}
          name="fuel"
          defaultValue={false}
          render={({ field: { value, onChange } }) => (
            <>
              <SwitchFuel selected={value} onChange={onChange} />

              {value && (
                <ControllerComponent
                  control={control}
                  name="valueFuel"
                  errors={errors}
                  label="Valos gasto no abastecimento (R$)"
                  placeholder="0,00"
                  keyboardType="numeric"
                  formatValue={(text) => Number(text)}
                />
              )}
            </>
          )}
        />

        <Button
          title={
            isSubmitting ? (
              <Text>
                <ActivityIndicator size={"small"} color={colors.background} />
              </Text>
            ) : (
              "Registrar viagem"
            )
          }
          onPress={handleSubmit(onSubmit)}
        />

        <View className="flex-row items-center h-16 bg-neutral-500 mt-8 rounded-md px-4 justify-between">
          <Text className="text-secondary font-semibold text-xl outline">
            Valor líquido
          </Text>
          <Text className="text-white text-3xl font-medium">
            R$ {valorLiquido.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContainer: {
    paddingTop: "10%",
    flexGrow: 1,
    paddingHorizontal: "10%",
  },
});
