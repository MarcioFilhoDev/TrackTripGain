import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newTripSchema = z
  .object({
    customer: z
      .string()
      .min(1, "O nome do cliente é obrigatório.")
      .max(25, "O máximo foi atingido."),
    date: z.date(),
    totalKm: z
      .number()
      .min(1, "Total de quilômetros não pode ser zero")
      .max(10000, "O máximo foi atingido."),
    totalTon: z
      .number()
      .min(1, "Total de toneladas não pode ser zero")
      .max(10000, "O máximo foi atingido."),
    valuePerKm: z
      .number()
      .min(0.01, "O valor precisa ser maior que 0.01")
      .max(1000000, "O máximo foi atingido."),
    fuel: z.boolean(),
    valueFuel: z.number().max(1000000, "O máximo foi atingido.").optional(),
  })
  .refine(
    (data) => {
      if (data.fuel) {
        return data.valueFuel !== undefined && data.valueFuel > 0;
      }

      return true;
    },
    {
      message: "Informe o valor gasto com combustível.",
      path: ["valueFuel"],
    },
  );

export type NewTripFormData = z.infer<typeof newTripSchema>;

const useNewTrip = () => {
  const { userData } = useContext(AuthContext);

  const defaultDate = new Date();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewTripFormData>({
    resolver: zodResolver(newTripSchema),
    defaultValues: {
      customer: "",
      date: defaultDate,
      fuel: false,
      totalKm: undefined,
      totalTon: undefined,
      valueFuel: undefined,
      valuePerKm: undefined,
    },
  });

  const onSubmit = async (tripData: NewTripFormData) => {
    try {
      if (tripData.fuel === false) tripData.valueFuel = 0;

      let valorBruto =
        tripData.totalKm * tripData.valuePerKm * tripData.totalTon;

      //  se tem "valueFuel" utiliza-se seu valor, se não, utiliza "0"
      let valorLiquido = tripData.fuel
        ? valorBruto - (tripData.valueFuel ?? 0)
        : valorBruto;

      let data = {
        user_id: userData?.user_id,
        user_name: userData?.name,
        customer: tripData.customer,
        totalKm: tripData.totalKm,
        totalTon: tripData.totalTon,
        valuePerKm: tripData.valuePerKm,
        tripDate: tripData?.date,
        gain: valorLiquido,
        fuel: tripData.fuel,
        valueFuel: tripData.valueFuel,
      };

      const { error } = await supabase.from("trips").insert(data);

      if (error) {
        alert("ops, algo deu errado");
        console.log(error);
        return;
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    watch,
    reset,
    defaultDate,
  };
};

export default useNewTrip;
