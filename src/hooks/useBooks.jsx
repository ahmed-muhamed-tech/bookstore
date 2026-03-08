import { useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";

function useBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typeBooks, setTypeBooks] = useState("الكل");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const limit = 20;

  // اجيب كل التصنيفات من الداتابيز
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("category").select();
    if (data) setCategories(data);
    if (error) toast.error(error.message);
  };

  // اجيب الكتب بالاعتماد علي مبدا الباجينيشن وحسب التصنيف
  const fetchCurrentTypeBooks = async (isNewType = false) => {
    if (isLoading) return;
    setIsLoading(true);

   
    const currentPage = isNewType ? 0 : page;
    const from = currentPage * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("books")
      .select("id,title,image,description,price")
      .order("created_at", { ascending: false })
      .range(from, to);


    if (typeBooks !== "الكل") {
      query = query.eq("name_category", typeBooks);
    }

    const { data, error } = await query;

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setAllBooks((prev) => (isNewType ? data : [...prev, ...data]));
      
      setPage(currentPage + 1);
      
      if (data.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }

    setIsLoading(false);
  };

  // اراقب الاسكرول في الموقع
  const loaderRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && hasMore) {
        fetchCurrentTypeBooks(false);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading, hasMore, page]);

  // اتابع الزر التصنيفات
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchCurrentTypeBooks(true);
  }, [typeBooks]);

  // اجيب الكتب اول ما افتح الصفحه
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    allBooks,
    isLoading,
    categories,
    loaderRef,
    setTypeBooks,
    hasMore,
  };
}

export default useBooks;