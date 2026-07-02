import { supabase } from "@/config/supabase";

const useDeleteTrip = () => {
  const deleteTrip = async (id: string) => {
    try {
      const { error } = await supabase.from("trips").delete().eq("id", id);

      if (error) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteTrip };
};

export default useDeleteTrip;
