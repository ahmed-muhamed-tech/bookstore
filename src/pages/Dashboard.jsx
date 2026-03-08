import React, { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";

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

function Dashboard() {
  const titleRef = useRef();
  const [categories, setCategories] = useState();
  const [dataBook, setDataBook] = useState(initialDataBook);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => titleRef.current.focus(), []);

  const fillDataBook = (e) => {
    const { name, value } = e.target;

    setDataBook({
      ...dataBook,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select();
      if (error) toast.error(error.message);
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const uploadImage = async () => {
    const imageFile = dataBook.image;
    if (!imageFile) return null;

    // إعدادات الضغط
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      // 1. ضغط الصورة (تحتاج لاستيراد المكتبة في أعلى الملف)
      // import imageCompression from 'browser-image-compression';
      const compressedFile = await imageCompression(imageFile, options);

      // 2. إعداد المسار والاسم (نستخدم الامتداد webp دائماً لأننا حولناها)
      const fileName = `${crypto.randomUUID()}.webp`;
      const filePath = `covers/${fileName}`;

      // 3. الرفع (نمرر compressedFile وليس imageFile)
      const { data, error } = await supabase.storage
        .from("books")
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // 4. جلب الرابط العام
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

  const handleAddNewBook = async (e) => {
    e.preventDefault();

    if (!dataBook.title.trim()) {
      toast.error("يرجي ادخال اسم الكتاب");
      return;
    }
    if (!dataBook.description.trim()) {
      toast.error("يرجي ادخال وصف الكتاب");
      return;
    }
    if (!dataBook.language.trim()) {
      toast.error("يرجي ادخال لغه الكتاب");
      return;
    }
    if (!dataBook.image) {
      toast.error("يرجي ادخال صوره الكتاب");
      return;
    }
    if (!dataBook.author.trim()) {
      toast.error("يرجي ادخال مؤلف الكتاب");
      return;
    }
    if (!dataBook.price.trim()) {
      toast.error("يرجي ادخال سعر الكتاب");
      return;
    }
    if (!dataBook.publication_year.trim()) {
      toast.error("يرجي ادخال سنه نشر الكتاب");
      return;
    }
    if (!dataBook.rating.trim()) {
      toast.error("يرجي ادخال تقييم الكتاب");
      return;
    }
    if (!dataBook.count_pages.trim()) {
      toast.error("يرجي ادخال عدد صفحات الكتاب");
      return;
    }
    if (!dataBook.name_category.trim()) {
      toast.error("يرجي ادخال التصميف");
      return;
    }

    const sendDataIntoDatabase = async () => {
      setIsSubmitting(true)
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
          id_category: Number(dataBook.id_category),
          name_category: dataBook.name_category,
          is_available: true,
        };

        const { data, error } = await supabase
          .from("books")
          .insert([currentData])
          .select();

        if (error) throw error;
        if (data) {
          toast.success("تم اضافه الكتاب بنجاح✅");
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
    setIsSubmitting(false)
    sendDataIntoDatabase();
  };

  return (
    <section className="py-12 bg-(--secondary-bg) min-h-[calc(100vh-360px)]">
      <div className="container flex justify-center">
        <div className="w-full rounded-2xl py-8 px-2 rounded-2x bg-(--primary-color)/5">
          {/* Head */}
          <div className="flex justify-center items-center gap-2 bg-(--primary-color) py-4 rounded-md text-3xl text-gray-200 mb-8 text-center font-semibold ">
            <FaBook />
            <h3>اضافه كتاب جديد</h3>
          </div>
          {/*=== Head ===*/}

          {/* add new book */}
          <form
            onSubmit={(e) => handleAddNewBook(e)}
            className=" text-(--primary-color)  text-2xl flex flex-col gap-2"
          >
            <input
              ref={titleRef}
              className="py-4 px-2 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="اسم الكتاب"
              name="title"
              value={dataBook.title}
              onChange={(e) => fillDataBook(e)}
            />
            <textarea
              className="py-4 min-h-40 px-2 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="وصف الكتاب"
              name="description"
              value={dataBook.description}
              onChange={(e) => fillDataBook(e)}
            ></textarea>

            <input
              className="py-4 px-2 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="المؤلف"
              name="author"
              value={dataBook.author}
              onChange={(e) => fillDataBook(e)}
            />
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="السعر بعد الخصم"
                name="price"
                value={dataBook.price}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="السعر قبل الخصم"
                name="discount"
                value={dataBook.discount}
                onChange={(e) => fillDataBook(e)}
              />
            </div>
            <div className="flex gap-4 items-center flex-col lg:flex-row">
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="text"
                placeholder="التقييم العام"
                name="rating"
                value={dataBook.rating}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="text"
                placeholder="اللغه"
                name="language"
                value={dataBook.language}
                onChange={(e) => fillDataBook(e)}
              />
            </div>

            <div className="flex gap-4 items-center flex-col lg:flex-row">
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="عدد الصفحات"
                name="count_pages"
                value={dataBook.count_pages}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-4 w-full lg:w-fit px-2 rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="سنه الانشاء"
                name="publication_year"
                value={dataBook.publication_year}
                onChange={(e) => fillDataBook(e)}
              />
            </div>
            <div className="flex flex-col  lg:flex-row gap-2">
              <input
                key={formKey}
                type="file"
                name="image"
                onChange={(e) =>
                  setDataBook({
                    ...dataBook,
                    image: e.target.files[0],
                  })
                }
                className="flex-1 border border-(--primary-color)/30 rounded-2xl px-2 py-2"
              />

              <div className="w-22 h-22 rounded-2xl mr-4  overflow-hidden border border-(--primary-color)/30 px-2 py-2">
                {dataBook.image ? (
                  <img
                    src={URL.createObjectURL(dataBook.image)}
                    alt="photo new book"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex justify-center items-center text-center">
                    <span>صوره الكتاب</span>
                  </div>
                )}
              </div>
            </div>

            <select
              name="id_category"
              value={dataBook.id_category || ""}
              onChange={(e) => {
                const selectedId = e.target.value;

                const selectedCategory = categories.find(
                  (cat) => cat.id.toString() === selectedId,
                );

                setDataBook({
                  ...dataBook,
                  id_category: selectedCategory?.id,
                  name_category: selectedCategory?.name,
                });
              }}
              className="w-full py-4 rounded-2xl border border-gray-500/40 hover:border-(--primary-color) outline-none px-2 focus:border-(--primary-color) transition-all duration-300"
            >
              <option value="" disabled>
                اختر تصنيف الكتاب
              </option>
              {categories
                ?.filter((category) => category.name != "الكل")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <button disabled={isSubmitting} className="py-4 bg-(--primary-color) text-gray-200 rounded-xl hover:font-bold transition-all duration-300">
             {isSubmitting ? "جاري اضافه الكتاب" : "اضافه كتاب"}
            </button>
          </form>
          {/*=== add new book ===*/}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
