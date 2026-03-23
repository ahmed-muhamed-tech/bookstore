import React, { useEffect, useState } from "react";
import FormAddNewBook from "../components/ui/FormAddNewBook";
import CardBookInDashboard from "../components/ui/CardBookInDashboard";
import { motion } from "motion/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import useBooks from "../hooks/useBooks";
import Loading from "../components/ui/Loading";
function Dashboard() {
  const { allBooks, isLoading, loaderRef, hasMore } = useBooks(true);

  const [showFormAddBook, setShowFormAddBook] = useState(false);
  if (isLoading) {
    return <Loading text="جاري جلب الكتب" />;
  }
  return (
    <div className="py-12">
      {showFormAddBook && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed z-50 transform top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-full"
        >
          <div className="container relative">
            <span
              onClick={() => setShowFormAddBook(!showFormAddBook)}
              className="text-xl md:text-2xl lg:text-3xl z-50 text-gray-200 rounded-full cursor-pointer hover:scale-95 transition-all duration-300 absolute top-3 right-12 bg-red-500"
            >
              <IoCloseCircleOutline />
            </span>
            <FormAddNewBook />{" "}
          </div>
        </motion.div>
      )}
      <div className="container flex flex-col gap-2 ">
        <div className="flex flex-col lg:flex-row gap-4 text-center lg:text-start  justify-between items-center mb-12">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-3xl">اداره الكتب</h2>
              <p className="text-sm">تحكم في مكتبتك الرقميه بكل سهوله وهدوء.</p>
            </div>
            <button
              onClick={() => setShowFormAddBook(!showFormAddBook)}
              className="bg-(--primary-color) text-gray-300 py-2 px-6 text-lg md:text-xl lg:text-2xl rounded-md"
            >
              اضافه كتاب جديد
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <div className="p-6 rounded-xl bg-(--secondary-bg) flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold">اجمالي الكتب</h2>
              <h3 className="text-xl font-medium">1293</h3>
            </div>
            <div className="p-6 rounded-xl bg-(--secondary-bg) flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold">اجمالي التصنيفات</h2>
              <h3 className="text-xl font-medium">12</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5 text-sm md:text-xl lg:text-2xl bg-(--primary-color)/20 p-4 rounded-2xl">
          <h2>العنوان</h2>
          <h2>التصنيف</h2>
          <h2>السعر</h2>
          <h2>هل متاح</h2>
          <h2>التعديل/الحذف</h2>
        </div>

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

        <div ref={loaderRef}></div>
        {hasMore && <Loading text="جاري جلب المزيد من الكتب" />}
        {!hasMore && allBooks.length > 0 && (
          <p className="text-center text-gray-400 mt-10 italic">
            — لقد استعرضت جميع الكتب في هذا القسم —
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
