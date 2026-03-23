import { useQuery } from "@tanstack/react-query";
import fetchCurrentBook from "../services/fetchCurrentBook";
import { toast } from "react-toastify";

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

  if (error) toast.error(error.message);

  return { currentBook, isLoading };
}

export default UseCurrentBook;
