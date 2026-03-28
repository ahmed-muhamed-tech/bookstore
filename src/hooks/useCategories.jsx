import { useQuery } from "@tanstack/react-query";
import fetchCategories from "../services/fetchCategories";
import { useEffect } from "react";
import { toast } from "react-toastify";
function useCategories() {
  const {
    data: categories,
    error,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return { categories, isLoadingCategories };
}

export default useCategories;
