import { useState } from "react";
import CardBook from "../components/ui/CardBook";
import Loading from "../components/ui/Loading";
import NotFoundAnyBook from "../components/ui/NotFoundAnyBook";
import useBooks from "../hooks/useBooks";
import useCategories from "../hooks/useCategories";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
  MdCategory,
} from "react-icons/md";

function Books() {
  // افترضت أن currentType موجود في الهوك لمعرفة القسم المختار حالياً
  const { allBooks, isLoading, loaderRef, setTypeBooks, hasMore, typeBooks } =
    useBooks(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const { isLoadingCategories, categories } = useCategories();

  if (isLoadingCategories) return <Loading text="جاري تحميل التصنيفات" />;

  // تحديد عدد التصنيفات الظاهرة في البداية
  const initialCount = 6;
  const displayedCategories = showMoreCategories
    ? categories
    : categories?.slice(0, initialCount);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Head section */}
        <div className="mb-10 border-r-4 border-(--primary-color) pr-4">
          <h2 className="text-3xl lg:text-4xl mb-2 font-bold text-gray-800 tracking-tight">
            كتالوج الكتب
          </h2>
          <p className="text-sm lg:text-lg text-gray-500 max-w-2xl leading-relaxed">
            استكشف مجموعتنا المختارة بعناية من الروايات والكتب العلمية والأدبية
            التي تثري الفكر وتغذي الروح.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - التصنيفات */}
          <aside className="lg:col-span-3 ">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-6 text-gray-700 border-b pb-3">
                <MdCategory className="text-xl text-(--primary-color)" />
                <h3 className="font-bold text-lg">الأقسام</h3>
              </div>

              <div className="flex flex-col gap-2">
                {/* زر "الكل" */}
                <button
                  onClick={() => setTypeBooks("الكل")}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    typeBooks === "الكل"
                      ? "bg-(--primary-color) text-white shadow-md shadow-blue-100 translate-x-1"
                      : "text-gray-600 hover:bg-gray-50 hover:text-(--primary-color)"
                  }`}
                >
                  جميع الكتب
                </button>

                {/* قائمة التصنيفات الديناميكية */}
                {displayedCategories?.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setTypeBooks(category.name)}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                      typeBooks === category.name
                        ? "bg-(--primary-color) text-white shadow-md shadow-blue-100 translate-x-1"
                        : "text-gray-600 hover:bg-gray-50 hover:text-(--primary-color) border border-transparent"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}

                {/* زر عرض المزيد بتصميم أنيق */}
                {categories?.length > initialCount && (
                  <button
                    onClick={() => setShowMoreCategories(!showMoreCategories)}
                    className="flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-lg border border-dashed border-gray-200 text-gray-500 hover:border-(--primary-color) hover:text-(--primary-color) transition-colors text-xs font-bold"
                  >
                    {showMoreCategories ? (
                      <>
                        {" "}
                        عرض أقل <MdKeyboardDoubleArrowUp />{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        عرض المزيد ({categories.length - initialCount}+){" "}
                        <MdKeyboardDoubleArrowDown />{" "}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content - عرض الكتب */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                [...Array(10)].map((_, index) => (
                  <div className="animate-pulse" key={index}>
                    <div className=" p-4 rounded-xl animate-pulse">
                      <div className="bg-gray-300 h-32 w-full rounded-md mb-3"></div>
                      <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                      <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
                    </div>
                  </div>
                ))
              ) : allBooks.length > 0 ? (
                allBooks.map((book, index) => (
                  <CardBook
                    key={book.id}
                    discount={book.discount}
                    title={book.title}
                    image={book.image}
                    index={index}
                    description={book.description}
                    price={book.price}
                    id={book.id}
                    author={book.author}
                    category={book.name_category}
                  />
                ))
              ) : (
                <NotFoundAnyBook message="نعتذر، لا توجد كتب متوفرة في هذا القسم حالياً." />
              )}
            </div>

            {/* Pagination / Loading More */}
            {hasMore && (
              <div
                ref={loaderRef}
                className="flex flex-col items-center justify-center py-12"
              >
                <Loading text="جاري جلب المزيد من العناوين الشيقة..." />
              </div>
            )}

            {!hasMore && allBooks.length > 0 && (
              <div className="text-center py-12 px-6 mt-8 border-t border-gray-100">
                <p className="text-gray-400 italic text-sm">
                  لقد وصلت إلى نهاية القائمة، نتمنى أن تجد ما تبحث عنه
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

export default Books;
