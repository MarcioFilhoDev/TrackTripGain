import { supabase } from "@/config/supabase";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

const useGetCustomers = () => {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [customersList, setCustomersList] = useState<string[]>([]);

  const reloadCustomers = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("trips")
        .select("customer")
        .eq("user_id", userData?.user_id);

      if (error) throw error;

      if (data) {
        const customers = [...new Set(data.map((item) => item.customer))];
        setCustomersList(customers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    reloadCustomers,
    customersList,
    loading,
  };
};

export default useGetCustomers;
