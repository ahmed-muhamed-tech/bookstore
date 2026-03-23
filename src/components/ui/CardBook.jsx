import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function CardBook({ image, title, description, price, index, id }) {
  const handleDescriptionBook = (dis) => {
    return dis.split("").slice(0, 120).join("");
  };

  const navigate = useNavigate();
  const handleGoToCurrentBook = (id) => {
    navigate(`/detailsBook/${id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.01 * index, duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
        className="group relative bg-(--secondary-bg) rounded-xl overflow-hidden"
      >
        <div className="overflow-hidden h-100 mb-4">
          <img
            className="group-hover:scale-110 group-hover:rotate-4 cursor-pointer transition-all duration-300 object-cover w-full h-full"
            src={image}
            alt={title}
            loading={index <= 4 ? "eager" : "lazy"}
            fetchPriority={index <= 4 ? "high" : "low"}
          />
        </div>

        <h4 className="absolute top-2 left-2 bg-(--primary-color) text-gray-200 py-1 px-2 rounded-md">
          بيت الكتاب
        </h4>

        <div className="px-2 mb-2">
          <h3 className="text-lg lg:text-xl font-semibold">{title}</h3>

          <p className="mt-2 leading-6 mb-2">
            {handleDescriptionBook(description)}...
          </p>

          <div className="flex justify-between items-center text-xl">
            <span>{price}ج</span>

            <div className="flex gap-2">
              <div onClick={() => handleGoToCurrentBook(id)}>
                <Button text="تفاصيل" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CardBook;
