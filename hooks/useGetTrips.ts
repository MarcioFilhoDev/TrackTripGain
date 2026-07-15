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
  const [loading, setLoading] = useState(false);

  const filteredTrips = async ({ startDate, endDate }: FilterTripProps) => {
    try {
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
      console.error(error);
    }
  };

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
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return {
    loading,
    loadTrips,
    tripList,
    setTripList,
    filteredTrips,
  };
};

export default useGetTrips;
