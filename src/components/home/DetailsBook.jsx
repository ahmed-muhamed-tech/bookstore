import { FaStar, FaWhatsapp } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";

import Loading from "../ui/Loading";
import UseCurrentBook from "../../hooks/useCurrentBook";

function DetailsBook() {
  const { id } = useParams();
  const { currentBook, isLoading } = UseCurrentBook(id);

  if (isLoading) return <Loading text="جاري تحميل تفاصيل الكتاب" />;

  return (
    <section className="py-18 bg-(--secondary-bg)">
      <div className="container flex flex-col lg:flex-row min-h-80 gap-12">
        {/* Images Book */}
        <div className="p-8 bg-(--primary-color)/10 rounded-2xl h-100 w-100  mx-auto lg:mx-0">
          <img
            src={currentBook.image}
            alt={currentBook.title}
            className="rounded-2xl h-full w-full object-cover"
          />
        </div>
        {/*=== Images Book ===*/}

        {/* Details Book */}
        <div className="lg:w-2/3 w-full">
          {/* Title */}
          <h3 className="text-3xl font-bold mb-4">{currentBook.title}</h3>
          {/*=== Title ===*/}
          <div>
            {/* Author and Rating */}
            <div className="flex items-center gap-8 mb-4">
              <h4 className="text-(--primary-color)">
                تاليف: {currentBook.author}
              </h4>
              <div className="flex items-center gap-1">
                {Array.from({ length: currentBook.rating }).map((_, i) => (
                  <FaStar className="text-yellow-500" key={i} />
                ))}
              </div>
            </div>
            {/*=== Author and Rating ===*/}

            {/* Description */}
            <p className="text-gray-800 text-sm md:text-lg lg:text-xl leading-8">
              {currentBook.description}
            </p>
            {/*=== Description ===*/}

            {/* Price and Order */}
            <div className="my-4 bg-mauve-600/20  p-8 w-full lg:w-fit rounded-2xl">
              <div className="flex items-end gap-2 mb-2">
                <h5 className="text-2xl text-(--primary-color)">
                  {currentBook.price}ج
                </h5>
                <h5 className="text-lg text-gray-500 line-through">
                  {currentBook.discount && currentBook.discount}ج
                </h5>
              </div>

              <div className="flex items-center flex-wrap gap-4 ">
                <button className="w-full lg:w-fit justify-center py-4 px-8 text-sm rounded-2xl lg:text-2xl flex items-center gap-1 text-gray-200 font-semibold bg-(--primary-color)">
                  <FaCartShopping />
                  <span>اضافه الي السله</span>
                </button>
                <a
                  href="https://chat.whatsapp.com/KVWWS9z5wYIEHG2ZYTlin5?mode=hqctcla"
                  target="_blanck"
                  className=" w-full lg:w-fit justify-center py-4 px-8 text-sm rounded-2xl lg:text-2xl flex items-center gap-1 text-(--whatsapp-color) font-semibold bg-(--whatsapp-color)/20"
                >
                  <FaWhatsapp />
                  <span>طلب عبر الواتس اب</span>
                </a>
              </div>
            </div>
            {/*=== Price and Order ===*/}

            {/* Details for book */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-4 bg-(--secondary-bg)">
                <h6 className="text-sm">عدد الصفحات</h6>
                <h3 className="font-bold">{currentBook.count_pages} صفحه</h3>
              </div>

              <div className="p-4 bg-(--secondary-bg)">
                <h6 className="text-sm">اللغة</h6>
                <h3 className="font-bold">{currentBook.language}</h3>
              </div>
              <div className="p-4 bg-(--secondary-bg)">
                <h6 className="text-sm">سنة النشر</h6>
                <h3 className="font-bold">{currentBook.publication_year}</h3>
              </div>
              <div className="p-4 bg-(--secondary-bg)">
                <h6 className="text-sm">التصنيف</h6>
                <h3 className="font-bold">{currentBook.name_category}</h3>
              </div>
            </div>
            {/*=== Details for book ===*/}
          </div>
        </div>
        {/*=== Details Book ===*/}
      </div>
    </section>
  );
}

export default DetailsBook;
