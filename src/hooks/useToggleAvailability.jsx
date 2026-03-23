import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";

export function useToggleAvailability() {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ id, newAvailable }) => {
      console.log(id);
      const { data, error } = await supabase
        .from("books")
        .update({ is_available: newAvailable })
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(
        `تم جعل كتاب "${data.title}" ${data.is_available ? "متاحاً" : "غير متاح"}`,
      );
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateStatus, isUpdating };
}
