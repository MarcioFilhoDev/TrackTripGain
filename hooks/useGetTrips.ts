import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

export type tripProps = {
  customer: string;
  gain: number;
  tripDate: string;
  totalKm: string;
  totalTon: string;
  id: string;
};

const useGetTrips = () => {
  const { userData } = useContext(AuthContext);
  const [tripList, setTripList] = useState<tripProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("trips")
        .select("id, customer, gain, tripDate, totalKm, totalTon")
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
  };
};

export default useGetTrips;
