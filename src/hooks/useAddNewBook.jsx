import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import useCategories from "./useCategories";

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

function UseAddNewBook() {
  const { categories, isLoadingCategories } = useCategories();
  const [dataBook, setDataBook] = useState(initialDataBook);
  // reset input file when user send data book
  const [formKey, setFormKey] = useState(0);
  // disable input submit when data send to database
  const [isSubmitting, setIsSubmitting] = useState(false);


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
    if (!dataBook.title.trim()) return "يرجي ادخال اسم الكتاب";
    if (!dataBook.description.trim()) return "يرجي ادخال وصف الكتاب";
    if (!dataBook.language.trim()) return "يرجي ادخال لغه الكتاب";
    if (!dataBook.image) return "يرجي ادخال صوره الكتاب";
    if (!dataBook.author.trim()) return "يرجي ادخال مؤلف الكتاب";
    if (!dataBook.price.trim()) return "يرجي ادخال سعر الكتاب";
    if (!dataBook.publication_year.trim()) return "يرجي ادخال سنه نشر الكتاب";
    if (!dataBook.rating.trim()) return "يرجي ادخال تقييم الكتاب";
    if (!dataBook.count_pages.trim()) return "يرجي ادخال عدد صفحات الكتاب";
    if (!dataBook.name_category.trim()) return "يرجي ادخال التصميف";
    return false;
  };

  // send data to database
  const handleAddNewBook = async (e) => {
    e.preventDefault();

    const messageEmpty = anyInputIsEmpty(dataBook);
    if (messageEmpty) {
      toast.error(messageEmpty);
      return;
    }

    const sendDataIntoDatabase = async () => {
      setIsSubmitting(true);
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
        if (data) {
          toast.success("تم اضافه الكتاب بنجاح");
          setIsSubmitting(false);
          setDataBook(initialDataBook);
          setFormKey((prev) => prev + 1);
        }
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

    sendDataIntoDatabase();
  };

  return {
    categories,
    dataBook,
    handleAddNewBook,
    fillDataBook,
    formKey,
    isSubmitting,
    isLoadingCategories
  };
}

export default UseAddNewBook;
