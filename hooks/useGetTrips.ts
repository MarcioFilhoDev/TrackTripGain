import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

export type tripProps = {
  customer: string;
  gain: number;
  tripDate: string;
  totalKm: number;
  totalTon: number;
  id: string;
  fuel: boolean;
  valueFuel: number;
  valuePerKm: number;
};

interface FilterTripProps {
  startDate: string;
  endDate?: string;
}

const useGetTrips = () => {
  const { userData } = useContext(AuthContext);

  const [tripList, setTripList] = useState<tripProps[]>([]);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //  Função para filtrar por clientes
  const filteredCustomerTrips = (input: string): tripProps[] => {
    const newTripList = tripList.filter((trip) =>
      trip.customer.includes(input),
    );

    //  chamar a função para atualizar o ganho e o óleo diesel
    console.log(newTripList);

    return newTripList;
  };

  // Função para filtrar por periodo
  const filteredPeriodTrips = async ({
    startDate,
    endDate,
  }: FilterTripProps) => {
    try {
      setFiltered(true);
      if (endDate) {
        const { data } = await supabase
          .from("trips")
          .select("*")
          .eq("user_id", userData?.user_id)
          .gte("tripDate", startDate)
          .lte("tripDate", endDate);

        if (data) {
          setTripList(data);
          return;
        }
      } else {
        const { data } = await supabase
          .from("trips")
          .select("*")
          .eq("user_id", userData?.user_id)
          .gte("tripDate", startDate);

        if (data) {
          setTripList(data);
          return;
        }
      }
    } catch (error) {
      setFiltered(false);
      console.error(error);
    }
  };

  //  Função que busca as viagens ao carregar
  const loadTrips = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("trips")
        .select(
          "id, customer, gain, tripDate, totalKm, totalTon, fuel, valueFuel, valuePerKm",
        )
        .eq("user_id", userData?.user_id);

      if (data) {
        setTripList(data);
        setFiltered(false);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setFiltered(false);
  };

  return {
    loading,
    tripList,
    filtered,
    loadTrips,
    setTripList,
    filteredPeriodTrips,
    filteredCustomerTrips,
  };
};

export default useGetTrips;
