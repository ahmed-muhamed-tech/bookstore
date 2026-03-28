import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import useCategories from "./useCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initialDataBook = {
  title: "",
  description: "",
  image: "",
  count_pages: "",
  language: "",
  price: "",
  discount: "",
  publication_year: "",
  author: "",
  rating: "",
  id_category: "",
  name_category: "",
  is_available: true,
};

function useNewBook() {
  const { categories, isLoadingCategories } = useCategories();
  const [dataBook, setDataBook] = useState(initialDataBook);
  // reset input file when user send data book
  const [formKey, setFormKey] = useState(0);

  // set data from input to state
  const fillDataBook = (e) => {
    const { name, value } = e.target;
    if (name === "id_category") {
      const selectedId = e.target.value;
      const selectedCategory = categories.find(
        (cat) => cat.id.toString() === selectedId,
      );
      setDataBook({
        ...dataBook,
        id_category: selectedCategory?.id,
        name_category: selectedCategory?.name,
      });
    } else {
      setDataBook({
        ...dataBook,
        [name]: name === "image" ? e.target.files[0] : value,
      });
    }
  };

  // handle upload image
  const uploadImage = async () => {
    const imageFile = dataBook.image;

    if (!imageFile) return null;

    // setting compression
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 400,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      const fileName = `${crypto.randomUUID()}.webp`;
      const filePath = `covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from("books")
        .upload(filePath, compressedFile, {
          cacheControl: "31536000",
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("books")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Upload/Compression Error:", error);
      toast.error("حدث خطأ أثناء معالجة أو رفع الصورة");
      return null;
    }
  };

  // check if any input is empty
  const anyInputIsEmpty = (dataBook) => {
    if (!dataBook.title.trim()) {
      toast.error("يرجي ادخال اسم الكتاب");
      return true;
    }
    if (!dataBook.description.trim()) {
      toast.error("يرجي ادخال وصف الكتاب");
      return true;
    }
    if (!dataBook.language.trim()) {
      toast.error("يرجي ادخال لغه الكتاب");
      return true;
    }
    if (!dataBook.image) {
      toast.error("يرجي ادخال صوره الكتاب");
      return true;
    }
    if (!dataBook.author.trim()) {
      toast.error("يرجي ادخال مؤلف الكتاب");
      return true;
    }
    if (!dataBook.price.trim()) {
      toast.error("يرجي ادخال سعر الكتاب");
      return true;
    }
    if (!dataBook.publication_year.trim()) {
      toast.error("يرجي ادخال سنه نشر الكتاب");
      return true;
    }
    if (!dataBook.rating.trim()) {
      toast.error("يرجي ادخال تقييم الكتاب");
      return true;
    }
    if (!dataBook.count_pages.trim()) {
      toast.error("يرجي ادخال عدد صفحات الكتاب");
      return true;
    }
    if (!dataBook.name_category.trim()) {
      toast.error("يرجي ادخال التصميف");
      return true;
    }
    return false;
  };

  // send data book to database
  const sendDataIntoDatabase = async () => {
    const imageUrl = await uploadImage();
    if (!imageUrl) {
      toast.error("فشل رفع الصورة");
      return;
    }

    try {
      const currentData = {
        title: dataBook.title,
        description: dataBook.description,
        author: dataBook.author,
        count_pages: dataBook.count_pages,
        publication_year: dataBook.publication_year,
        image: imageUrl,
        price: dataBook.price,
        discount: dataBook.discount || 0,
        rating: dataBook.rating,
        language: dataBook.language,
        id_category: dataBook.id_category,
        name_category: dataBook.name_category,
        is_available: true,
      };

      const { data, error } = await supabase
        .from("books")
        .insert([currentData])
        .select();

      if (error) throw error;
    } catch (error) {
      if (
        error.message ==
        'new row violates row-level security policy for table "books"'
      )
        toast.error("انت غير مسموح بك باضافه كتاب");
      else toast.error(error.message);
      console.error(error);
    }
  };

  // handle submitting
  const queryClient = useQueryClient();
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: sendDataIntoDatabase,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("تم اضافه الكتاب بنجاح");
      setDataBook(initialDataBook);
      setFormKey((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // send data to database
  const handleAddNewBook = async (e) => {
    e.preventDefault();
    const messageEmpty = anyInputIsEmpty(dataBook);
    !messageEmpty && mutate();
  };

  return {
    categories,
    dataBook,
    handleAddNewBook,
    fillDataBook,
    formKey,
    isSubmitting,
    isLoadingCategories,
  };
}

export default useNewBook;
