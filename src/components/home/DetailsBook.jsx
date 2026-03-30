import {
  FaStar,
  FaWhatsapp,
  FaBook,
  FaLanguage,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Loading from "../ui/Loading";
import UseCurrentBook from "../../hooks/useCurrentBook";
import { itemsCartContext } from "../../contexts/itemsCartContext";

function DetailsBook() {
  const { id } = useParams();
  const { currentBook, isLoading } = UseCurrentBook(id);
  const { addNewItem } = useContext(itemsCartContext);

  if (isLoading) return <Loading text="جاري تحميل تفاصيل الكتاب" />;

  // حساب نسبة الخصم
  const discountPercent = currentBook.discount
    ? Math.round(
        ((currentBook.discount - currentBook.price) / currentBook.discount) *
          100,
      )
    : 0;

  const addCurrentBookToCart = (image, title, author, price, category) => {
    addNewItem(image, title, author, price, category);
  };

  const handleWhatsAppOrder = (bookTitle, bookAuthor, bookPrice, category) => {
    const phoneNumber = "201018197768";

    const message = `*طلب كتاب جديد*
                      ━━━━━━━━━━━━━━━
                      *اسم الكتاب:*
                      ${bookTitle}
                      *اسم الكاتب:*
                      ${bookAuthor}
                      *القسم:*
                      ${category}
                      *السعر:*
                      ${bookPrice} جنيه
                      ━━━━━━━━━━━━━━━
                      *شكراً لاختياركم*
                      بيت كتاب الفيوم`;

    const encodedMessage = encodeURIComponent(message.trim());

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <section className="py-12 md:py-20 bg-linear-to-b from-(--secondary-bg) to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/*صورة الكتاب  */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              {/* Badge الخصم */}
              {currentBook.discount > 0 && (
                <span className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  خصم {discountPercent}%
                </span>
              )}

              {/* إطار الصورة مع ظل وتأثير تكبير */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/50 backdrop-blur-sm border border-(--primary-color)/10 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                <img
                  src={currentBook.image}
                  alt={currentBook.title}
                  className="w-full h-auto aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay عند التحويم */}
              </div>
            </div>
          </div>

          {/*  تفاصيل الكتاب */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* العنوان والتقييم */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-(--text-primary) leading-tight">
                {currentBook.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <span className="flex items-center gap-2 text-(--primary-color) font-medium">
                  <FaBook className="text-lg" />
                  <span>تأليف: {currentBook.author}</span>
                </span>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`transition-colors ${
                        i < currentBook.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="mr-2 text-gray-600">
                    ({currentBook.rating}/5)
                  </span>
                </div>
              </div>
            </div>

            {/* الوصف */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">{currentBook.description}</p>
            </div>

            {/* السعر والشراء */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-(--primary-color)/10">
              <div className="flex flex-wrap items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-(--primary-color)">
                  {currentBook.price}ج.م
                </span>
                {currentBook.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {currentBook.discount}ج.م
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                      وفر {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    addCurrentBookToCart(
                      currentBook.image,
                      currentBook.title,
                      currentBook.author,
                      currentBook.price,
                      currentBook.name_category,
                    )
                  }
                  className="group flex-1 sm:flex-none justify-center py-4 px-8 bg-linear-to-r from-(--primary-color) to-(--primary-color)/90 hover:from-(--primary-color)/90 hover:to-(--primary-color) text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-3 text-lg"
                >
                  <FaCartShopping className="group-hover:scale-110 transition-transform" />
                  <span>أضف للسلة</span>
                </button>

                <button
                  onClick={() =>
                    handleWhatsAppOrder(
                      currentBook.title,
                      currentBook.author,
                      currentBook.price,
                      currentBook.name_category,
                    )
                  }
                  className="group flex-1 sm:flex-none justify-center py-4 px-8 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold rounded-2xl transition-all duration-300 border-2 border-[#25D366]/30 hover:border-[#25D366] flex items-center gap-3 text-lg"
                >
                  <FaWhatsapp className="group-hover:scale-110 transition-transform text-2xl" />
                  <span>اطلب عبر واتساب</span>
                </button>
              </div>
            </div>

            {/* تفاصيل إضافية - شبكة محسّنة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <FaBook />,
                  label: "عدد الصفحات",
                  value: `${currentBook.count_pages} صفحة`,
                },
                {
                  icon: <FaLanguage />,
                  label: "اللغة",
                  value: currentBook.language,
                },
                {
                  icon: <FaCalendarAlt />,
                  label: "سنة النشر",
                  value: currentBook.publication_year,
                },
                {
                  icon: <FaTags />,
                  label: "التصنيف",
                  value: currentBook.name_category,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-(--primary-color)/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="text-(--primary-color) text-xl mb-2 mx-auto w-fit group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-bold text-gray-800 text-sm md:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsBook;
