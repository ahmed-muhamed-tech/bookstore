import React, { useContext, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { itemsCartContext } from "../contexts/itemsCartContext";
import AlertPopupConfirm from "../components/ui/AlertPopupConfirm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Shopping() {
  const { items, countItems, totalPrice, deleteCurrentBookFromCart } =
    useContext(itemsCartContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [indexDeleteForItem, setIndexDeleteForItem] = useState(-1);

  const handleWhatsAppOrder = (cartItems, totalPrice) => {
    if (countItems === 0) {
      toast.error("الرجاء اضافه عناصر الي السله اولا");
      return;
    }
    const phoneNumber = "201018197768";

    const booksList = cartItems
      .map(
        (item, index) =>
          `${index + 1}- ${item.title} \n   - تأليف: ${item.author} \n   - القسم: ${item.category} \n   - السعر: ${item.price} ج.م`,
      )
      .join("\n\n");
    const message = `أهلاً بيت كتاب الفيوم، أريد طلب هذه المجموعة:
                ${booksList}
                ---------------------------
                الإجمالي: ${totalPrice} جنيه
                ---------------------------
                شكراً لكم!
                `;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="relative mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 pb-3">
            سلة المشتريات
          </h2>
          <span className="absolute bottom-0 right-0 h-1.5 bg-(--primary-color) w-24 rounded-full"></span>
        </div>

        {/* الحاوية الرئيسية - items-start هي مفتاح الـ sticky */}
        <div className="flex flex-col-reverse xl:flex-row  gap-8 items-start relative">
          {/* قائمة الكتب (اليمين) */}
          <div className="flex flex-col gap-4 w-full xl:w-2/3">
            {countItems > 0 ? (
              items?.map(({ title, price, category, author, image }, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {/* صورة الكتاب */}
                    <div className="h-32 w-24 md:h-40 md:w-28 rounded-xl overflow-hidden shadow-inner shrink-0">
                      <img
                        src={image}
                        className="object-cover h-full w-full"
                        alt={title}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="w-fit py-0.5 px-2 text-[10px] md:text-xs font-medium rounded-full bg-blue-50 text-(--primary-color) border border-blue-100">
                        {category}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500">{author}</p>
                      <div className="mt-2 text-(--primary-color) font-bold md:hidden">
                        {price} جنيه
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-32 md:h-40">
                    <button
                      onClick={() => {
                        setOpenPopup(true);
                        setIndexDeleteForItem(index);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <RiDeleteBin6Line size={22} />
                    </button>
                    <div className="hidden md:block text-xl font-bold text-gray-800">
                      {price}
                      <span className="text-sm font-normal text-gray-500">
                        جنيه
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-50 text-center flex flex-col gap-3 justify-center items-center">
                <h3 className="text-lg lg:text-xl text-(--primary-color)">
                  سلة المشتريات فارغة حالياً، ابدأ بإضافة بعض الكتب 😊
                </h3>
                <Link
                  to="/books"
                  className="py-2 px-8 rounded-2xl bg-(--primary-color) text-gray-100 text-lg lg:text-xl"
                >
                  صفحه الكتب
                </Link>
              </div>
            )}
          </div>

          <div className="xl:sticky top-8 w-full xl:w-1/3 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-50">
              ملخص الطلب
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg lg:text-xl text-gray-600">
                <span>عدد العناصر</span>
                <span className="font-medium text-gray-800">
                  {countItems} كتب
                </span>
              </div>
              <div className="flex justify-between text-lg lg:text-xl text-gray-600">
                <span>المجموع الفرعي</span>
                <span className="font-medium text-gray-800">
                  {totalPrice} جنيه
                </span>
              </div>
              <div className="flex justify-between text-lg lg:text-xl text-gray-600">
                <span>تكلفة الشحن</span>
                <span className="text-sm text-(--primary-color) bg-green-50 px-2 rounded-md">
                  حسب المكان
                </span>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  الإجمالي النهائي
                </span>
                <span className="text-2xl font-black text-(--primary-color)">
                  {totalPrice} جنيه
                </span>
              </div>
            </div>

            <button
              onClick={() => handleWhatsAppOrder(items, totalPrice)}
              className="w-full bg-(--primary-color) hover:bg-(--primary-color)/90 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              <FaWhatsapp size={24} />
              تأكيد الطلب عبر واتساب
            </button>

            <div className="mt-6 flex flex-col gap-3 text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                بمجرد النقر، سيتم توجيهك إلى تطبيق واتساب لإرسال تفاصيل طلبك
                وإتمام عملية الشحن.
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <span>🔒</span>
                <span>دفع آمن عند الاستلام</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertPopupConfirm
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
        onConfirm={() => deleteCurrentBookFromCart(indexDeleteForItem)}
        title="هل انت متاكد"
        message="سيتم حذف هذا الكتاب من المشتريات"
      />
    </section>
  );
}

export default Shopping;
