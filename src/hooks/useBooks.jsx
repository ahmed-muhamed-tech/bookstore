import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useRef, useState } from "react";

const LIMIT = 20;

function useBooks(isDashboard) {
  const [typeBooks, setTypeBooks] = useState("الكل");
  const loaderRef = useRef();

  // الوظيفة الأساسية لجلب البيانات
  const fetchBooks = async ({ pageParam = 0 }) => {
    const from = pageParam * LIMIT;
    const to = from + LIMIT - 1;

    let query = supabase
      .from("books")
      .select("id,title,image,description,price,author,is_available,name_category")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (typeBooks !== "الكل") {
      query = query.eq("name_category", typeBooks);
    }

    if(!isDashboard){
      query = query.eq("is_available", true);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", typeBooks],
    queryFn: fetchBooks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < LIMIT ? undefined : allPages.length;
    },
  });

  // مراقبة السكرول (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // تسطيح المصفوفات (Flattening) لأن React Query يرجع البيانات كصفحات
  const allBooks = data ? data.pages.flat() : [];

  return {
    allBooks,
    isLoading: status === "pending",
    isFetchingNextPage,
    loaderRef,
    setTypeBooks,
    hasMore: hasNextPage,
  };
}

export default useBooks;