import { useQuery } from "@tanstack/react-query";
import fetchCurrentBook from "../services/fetchCurrentBook";
import { toast } from "react-toastify";
import { useEffect } from "react";

function UseCurrentBook(_id) {
  const {
    data: currentBook,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentBook", _id],
    queryFn: () => fetchCurrentBook(_id),
    enabled: !!_id,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return { currentBook, isLoading };
}

export default UseCurrentBook;
