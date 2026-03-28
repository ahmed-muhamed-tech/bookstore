import React from "react";
import { FaBook } from "react-icons/fa";
import Loading from "./Loading";
import useNewBook from "../../hooks/useNewBook";

function FormAddNewBook() {
  const {
    categories,
    dataBook,
    handleAddNewBook,
    fillDataBook,
    formKey,
    isSubmitting,
    isLoadingCategories,
  } = useNewBook();

  if (isLoadingCategories) return <Loading text="جاري تحميل التصنيفات..." />;

  return (
    <div className="w-full p-2">
      {/* Form */}
      <form
        onSubmit={handleAddNewBook}
        className="space-y-6 text-(--primary-color)"
      >
        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            value={dataBook.title}
            onChange={fillDataBook}
            placeholder="اسم الكتاب"
            className="w-full py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            value={dataBook.description}
            onChange={fillDataBook}
            placeholder="وصف الكتاب"
            rows={4}
            className="w-full py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400 resize-y min-h-30"
          />
        </div>

        {/* Author */}
        <div>
          <input
            type="text"
            name="author"
            value={dataBook.author}
            onChange={fillDataBook}
            placeholder="اسم المؤلف"
            className="w-full py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-3 lg:gap-6">
          <input
            type="number"
            name="price"
            value={dataBook.price}
            onChange={fillDataBook}
            placeholder="السعر بعد الخصم"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
          <input
            type="number"
            name="discount"
            value={dataBook.discount}
            onChange={fillDataBook}
            placeholder="السعر قبل الخصم"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Rating & Language */}
        <div className="grid grid-cols-2 gap-3 lg:gap-6">
          <input
            type="text"
            name="rating"
            value={dataBook.rating}
            onChange={fillDataBook}
            placeholder="التقييم العام (مثال: 4.8)"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
          <input
            type="text"
            name="language"
            value={dataBook.language}
            onChange={fillDataBook}
            placeholder="اللغة"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Pages & Publication Year */}
        <div className="grid grid-cols-2 gap-3 lg:gap-6">
          <input
            type="number"
            name="count_pages"
            value={dataBook.count_pages}
            onChange={fillDataBook}
            placeholder="عدد الصفحات"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)  outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
          <input
            type="number"
            name="publication_year"
            value={dataBook.publication_year}
            onChange={fillDataBook}
            placeholder="سنة النشر"
            className="py-4 px-6 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Image Upload + Preview */}
        <div className="flex flex-row gap-3 lg:gap-6 items-start">
          <div className="flex-1">
            <input
              key={formKey}
              type="file"
              name="image"
              onChange={fillDataBook}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 
                         file:bg-(--primary-color) file:text-white file:font-medium 
                         hover:file:bg-(--primary-color)/90 transition-all 
                         py-2 px-4 border border-dashed border-gray-400 rounded-2xl cursor-pointer text-base"
            />
          </div>

          {/* Image Preview */}
          <div className="w-18 h-18  rounded-2xl overflow-hidden border-2 border-(--primary-color)/30 shrink-0 bg-gray-50 shadow-inner">
            {dataBook.image ? (
              <img
                src={URL.createObjectURL(dataBook.image)}
                alt="معاينة الكتاب"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm px-4 text-center">
                <FaBook className="text-4xl mb-2 opacity-30" />
                صورة الكتاب
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Categories */}
        <select
          name="id_category"
          value={dataBook.id_category || ""}
          onChange={fillDataBook}
          className="py-2 px-6 md:col-span-2 rounded-2xl border border-gray-300 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) outline-none transition-all duration-300 text-sm bg-white"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-6  mt-2 bg-(--primary-color) hover:bg-(--primary-color)/90 
                     text-white text-sm font-semibold rounded-2xl transition-all duration-300 
                     disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
        >
          {isSubmitting ? (
            <>جاري إضافة الكتاب...</>
          ) : (
            <>
              إضافة الكتاب <FaBook className="text-2xl" />
            </>
          )}
        </button>
        </div>
      </form>
    </div>
  );
}

export default FormAddNewBook;
