import { useState } from "react";
import Button from "../components/ui/Button";
import CardBook from "../components/ui/CardBook";
import Loading from "../components/ui/Loading";
import NotFoundAnyBook from "../components/ui/NotFoundAnyBook";
import useBooks from "../hooks/useBooks";
import useCategories from "../hooks/useCategories";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

function Books() {
  const { allBooks, isLoading, loaderRef, setTypeBooks, hasMore } =
    useBooks(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const { isLoadingCategories, categories } = useCategories();

  if (isLoadingCategories) return <Loading text="جاري تحميل التصنيفات" />;
  if (isLoading) return <Loading text="جاري تحميل الكتب" />;

  return (
    <section className="py-12">
      <div className="container">
        {/* Head section */}
        <div>
          <h2 className="text-4xl mb-2 font-bold">كتالوج الكتب</h2>
          <p className="text-sm lg:text-lg text-gray-600 leading-8">
            استكشف مجموعتنا المختارة بعناية من الروايات والكتب العلمية والأدبية
            التي تثري الفكر.
          </p>

          {/* أزرار التصنيفات */}
          <div className="flex flex-wrap gap-6 mt-6 items-center">
            <Button text="الكل" action={() => setTypeBooks("الكل")} />

            {showMoreCategories &&
              categories.map((category) => (
                <Button
                  key={1}
                  text={category.name}
                  action={() => setTypeBooks(category.name)}
                />
              ))}

            {!showMoreCategories &&
              categories
                .slice(0, 5)
                .map((category) => (
                  <Button
                    key={1}
                    text={category.name}
                    action={() => setTypeBooks(category.name)}
                  />
                ))}

            {!showMoreCategories && (
              <div
                onClick={() => setShowMoreCategories(!showMoreCategories)}
                className="flex items-center gap-1 text-xl lg:text-2xl cursor-pointer"
              >
                <MdKeyboardDoubleArrowLeft />
              </div>
            )}
            {showMoreCategories && (
              <div
                onClick={() => setShowMoreCategories(!showMoreCategories)}
                className="flex items-center gap-1 text-xl lg:text-2xl cursor-pointer"
              >
                <MdKeyboardDoubleArrowRight />
              </div>
            )}
          </div>
        </div>

        {/* عرض الكتب */}
        <div
          className={`mt-10 mb-12 ${
            allBooks.length > 0
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex justify-center"
          }`}
        >
          {allBooks.length > 0 ? (
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
              />
            ))
          ) : !isLoading ? (
            <NotFoundAnyBook message="لا يوجد أي كتب في هذا القسم حالياً" />
          ) : null}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-10">
            {isLoading && <Loading text="جاري جلب المزيد من الكتب..." />}
          </div>
        )}

        {!hasMore && allBooks.length > 0 && (
          <p className="text-center text-gray-400 mt-10 italic">
            — لقد استعرضت جميع الكتب في هذا القسم —
          </p>
        )}
      </div>
    </section>
  );
}

export default Books;
