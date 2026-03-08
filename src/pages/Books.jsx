import Button from "../components/ui/Button";
import CardBook from "../components/ui/CardBook";
import Loading from "../components/ui/Loading";
import NotFoundAnyBook from "../components/ui/NotFoundAnyBook";
import useBooks from "../hooks/useBooks";

function Books() {
  const {
    allBooks,
    isLoading,
    categories,
    loaderRef,
    setTypeBooks,
    hasMore,
  } = useBooks();

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
          <div className="flex flex-wrap gap-2 mt-6">
            <div
              onClick={() => setTypeBooks("الكل")}
              className="cursor-pointer"
            >
              <Button text="الكل" />
            </div>

            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setTypeBooks(category.name)}
                className="cursor-pointer"
              >
                <Button
                  text={category.name}
                />
              </div>
            ))}
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
