import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function CardBook({ image, title, description, price, index, id,discount }) {
  const handleDescriptionBook = (dis) => {
    return dis.split("").slice(0, 120).join("");
  };

  // حساب نسبة الخصم
  const discountPercent = discount
    ? Math.round(
        ((discount - price) / discount) *
          100,
      )
    : 0;

  const navigate = useNavigate();
  const handleGoToCurrentBook = (id) => {
    navigate(`/detailsBook/${id}`);
  };

  console.log(discount)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.01 * index, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative bg-(--secondary-bg) rounded-2xl overflow-hidden
        border border-transparent hover:border-(--primary-color)/20
        hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {discount > 0  && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          خصم {discountPercent}%
        </span>
      )}
      {/* Image */}
      <div className="overflow-hidden h-72 relative">
        <img
          className="group-hover:scale-105 cursor-pointer transition-all duration-500
            object-cover w-full h-full"
          src={image}
          alt={title}
          loading={index <= 4 ? "eager" : "lazy"}
          fetchPriority={index <= 4 ? "high" : "low"}
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Badge */}
      <h4
        className="absolute top-3 right-3 bg-(--primary-color) text-white
        text-xs font-medium py-1 px-3 rounded-full shadow-md"
      >
        بيت الكتاب
      </h4>

      {/* Content */}
      <div className="px-4 py-4 flex flex-col flex-1">
        <h3 className="text-base lg:text-lg font-bold text-(--head-sec-color) leading-snug mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 leading-7 flex-1">
          {handleDescriptionBook(description)}...
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200/60">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">السعر</span>
            <span className="text-lg font-bold text-(--primary-color)">
              {price} ج
            </span>
          </div>

          <div onClick={() => handleGoToCurrentBook(id)}>
            <Button text="تفاصيل" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CardBook;
