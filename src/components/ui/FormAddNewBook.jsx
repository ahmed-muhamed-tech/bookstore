import { FaBook } from "react-icons/fa";
import UseAddNewBook from "./../../hooks/useAddNewBook";
import Loading from "./Loading";
import { useEffect, useRef } from "react";

function FormAddNewBook() {
  const {
    categories,
    dataBook,
    handleAddNewBook,
    fillDataBook,
    formKey,
    isSubmitting,
    isLoadingCategories,
  } = UseAddNewBook();



  if (isLoadingCategories) return <Loading text="جاري تحميل التصنيفات" />;

  return (
    <section>
      <div className="container flex justify-center">
        <div className="w-full rounded-2xl py-8 px-2 rounded-2x bg-(--primary-color)/5 backdrop-blur-2xl">
          {/* Head */}
          <div className="flex justify-center items-center gap-2 bg-(--primary-color) py-2 px-1 lg:py-4 lg:px-2 rounded-md text-lg lg:text-3xl text-gray-200 mb-2 lg:mb-8 text-center font-semibold ">
            <FaBook />
            <h3>اضافه كتاب جديد</h3>
          </div>
          {/*=== Head ===*/}

          {/* form new book */}
          <form
            onSubmit={(e) => handleAddNewBook(e)}
            className=" text-(--primary-color) text-sm md:text-lg lg:text-xl flex flex-col gap-2"
          >
            {/* Title */}
            <input
              className="py-2 px-1 lg:py-4 lg:px-2 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="اسم الكتاب"
              name="title"
              value={dataBook.title}
              onChange={(e) => fillDataBook(e)}
            />
            {/* description */}
            <textarea
              className="py-2 px-1 lg:py-4 lg:px-2 min-h-12 lg:min-h-40 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="وصف الكتاب"
              name="description"
              value={dataBook.description}
              onChange={(e) => fillDataBook(e)}
            ></textarea>

            {/* author */}
            <input
              className="py-2 px-1 lg:py-4 lg:px-2 rounded-2xl border border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
              type="text"
              placeholder="المؤلف"
              name="author"
              value={dataBook.author}
              onChange={(e) => fillDataBook(e)}
            />
            {/* Pricing */}
            <div className="flex gap-4 items-center">
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit  rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="السعر بعد الخصم"
                name="price"
                value={dataBook.price}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit  rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="السعر قبل الخصم"
                name="discount"
                value={dataBook.discount}
                onChange={(e) => fillDataBook(e)}
              />
            </div>
            {/* Rating & Language */}
            <div className="flex gap-4 items-center">
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit  rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="text"
                placeholder="التقييم العام"
                name="rating"
                value={dataBook.rating}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit  rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="text"
                placeholder="اللغه"
                name="language"
                value={dataBook.language}
                onChange={(e) => fillDataBook(e)}
              />
            </div>
            {/* Count Pages & Publication Year*/}
            <div className="flex gap-4 items-center">
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="عدد الصفحات"
                name="count_pages"
                value={dataBook.count_pages}
                onChange={(e) => fillDataBook(e)}
              />
              <input
                className="py-2 px-1 lg:py-4 lg:px-2 w-full lg:w-fit rounded-2xl border flex-1 border-gray-400/50 outline-none hover:border-(--primary-color) transition-all duration-300 focus:border-(--primary-color)"
                type="number"
                placeholder="سنه الانشاء"
                name="publication_year"
                value={dataBook.publication_year}
                onChange={(e) => fillDataBook(e)}
              />
            </div>
            {/* Image */}
            <div className="flex gap-2">
              <input
                key={formKey}
                type="file"
                name="image"
                onChange={(e) => fillDataBook(e)}
                className="w-2/3 border border-(--primary-color)/30 rounded-2xl px-2 py-2"
              />
              <div className="w-12 h-12 lg:w-22 lg:h-22 rounded-2xl mr-4  overflow-hidden border border-(--primary-color)/30 px-2 py-2">
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
            {/* Categories */}
            <select
              name="id_category"
              value={dataBook.id_category || ""}
              onChange={(e) => fillDataBook(e)}
              className="py-2 px-1 lg:py-4 lg:px-2 w-full  rounded-2xl border border-gray-500/40 hover:border-(--primary-color) outline-none  focus:border-(--primary-color) transition-all duration-300"
            >
              <option value="" disabled>
                اختر تصنيف الكتاب
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* Button Send Data To DataBase */}
            <button
              disabled={isSubmitting}
              className="py-2 px-1 lg:py-4 lg:px-2 bg-(--primary-color) text-gray-200 rounded-xl hover:font-bold transition-all duration-300"
            >
              {isSubmitting ? "جاري اضافه الكتاب" : "اضافه كتاب"}
            </button>
          </form>
          {/*=== form new book ===*/}
        </div>
      </div>
    </section>
  );
}

export default FormAddNewBook;
