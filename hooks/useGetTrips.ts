import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

export type tripProps = {
  customer: string;
  gain: number;
  tripDate: string;
  totalKm: string;
  totalTon: string;
};

const useGetTrips = () => {
  const { userData } = useContext(AuthContext);
  const [tripList, setTripList] = useState<tripProps[]>([]);

  const loadTrips = async () => {
    try {
      const { data } = await supabase
        .from("trips")
        .select("customer, gain, tripDate, totalKm, totalTon")
        .eq("user_id", userData?.user_id);

      if (data) {
        setTripList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loadTrips,
    tripList,
  };
};

export default useGetTrips;
