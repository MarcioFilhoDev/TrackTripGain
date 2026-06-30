import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

const useTripCount = () => {
  const { userData } = useContext(AuthContext);

  const [count, setCount] = useState<number | null>(null);
  const [totalGain, setTotalGain] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const reloadUserTripStatus = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("trips")
        .select("gain")
        .eq("user_id", userData?.user_id);

      const total = data?.reduce((acc, item) => acc + item.gain, 0);

      setCount(data?.length || null);
      setTotalGain(total ?? 0);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return {
    reloadUserTripStatus,
    count,
    loading,
    totalGain,
  };
};

export default useTripCount;
