import React, { useState } from "react";
import FormAddNewBook from "../components/ui/FormAddNewBook";
import CardBookInDashboard from "../components/ui/CardBookInDashboard";
import { motion, AnimatePresence } from "motion/react";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaBookOpen, FaTags } from "react-icons/fa";
import useBooks from "../hooks/useBooks";
import Loading from "../components/ui/Loading";

function Dashboard() {
  const { allBooks, isLoading, loaderRef, hasMore } = useBooks(true);
  const [showFormAddBook, setShowFormAddBook] = useState(false);

  if (isLoading) return <Loading text="جاري جلب الكتب..." />;

  return (
    <div className="py-12 min-h-screen bg-gray-50">
      {/* ==================== Modal (Popup) ==================== */}
      <AnimatePresence>
        {showFormAddBook && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              onClick={() => setShowFormAddBook(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-4xl">
                {/* Close Button */}
                <button
                  onClick={() => setShowFormAddBook(false)}
                  className="absolute -top-4 -right-4 z-50 bg-white text-gray-500 hover:text-red-500 hover:bg-red-50 w-11 h-11 flex items-center justify-center rounded-full shadow-lg border border-gray-100 transition-all hover:scale-110"
                >
                  <IoClose size={28} />
                </button>

                {/* Form Container */}
                <div className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden">
                  <FormAddNewBook />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col text-center lg:text-start lg:flex-row gap-6 justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">إدارة الكتب</h1>
            <p className="text-gray-500 mt-2 text-lg">
              تحكم في جميع الكتب الموجودة في المكتبة بكل سهولة
            </p>
          </div>

          {/* Add Book Button */}
          <button
            onClick={() => setShowFormAddBook(true)}
            className="inline-flex items-center gap-3 bg-(--primary-color) hover:bg-(--primary-color)/90 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-lg"
          >
            <FiPlus className="text-2xl" />
            إضافة كتاب جديد
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "إجمالي الكتب", value: "1,293", icon: <FaBookOpen /> },
            { label: "إجمالي التصنيفات", value: "12", icon: <FaTags /> },
          ].map(({ label, value, icon }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-(--primary-color)/30 transition-all flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-(--primary-color)/10 text-(--primary-color) rounded-2xl flex items-center justify-center text-3xl">
                {icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-5 gap-4 bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-semibold text-gray-600 mb-3">
          <div>العنوان</div>
          <div>التصنيف</div>
          <div>السعر</div>
          <div>متاح/غير متاح</div>
          <div>الإجراءات</div>
        </div>

        {/* Books List */}
        <div className="flex flex-col gap-3">
          {allBooks.map((book) => (
            <CardBookInDashboard
              key={book.id}
              category={book.name_category}
              title={book.title}
              author={book.author}
              image={book.image}
              price={book.price}
              isValid={book.is_available}
              id={book.id}
            />
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="py-8" />
        
        {hasMore && <Loading text="جاري تحميل المزيد من الكتب..." />}
        
        {!hasMore && allBooks.length > 0 && (
          <div className="text-center py-12 text-gray-400">
            ✦ تم تحميل جميع الكتب ✦
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;