import { motion } from "motion/react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import { useContext, useState } from "react";
import { authUserContext } from "../../contexts/AuthUserContext";

const handleDescriptionBook = (dis) => {
  return dis.split("").slice(0, 120).join("");
};

function CardBook({ image, title, description, price, index, id }) {
  const { user } = useContext(authUserContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleGoToCurrentBook = (id) => {
    navigate(`/detailsBook/${id}`);
  };

  const handleDeleteCurrentBook = async (id) => {
    const { data: book, error: fetchError } = await supabase
      .from("books")
      .select("image, title")
      .eq("id", id)
      .single();

    if (fetchError || !book) {
      toast.error("تعذر العثور على بيانات الكتاب");
      return;
    }

    const imagePublicUrl = book.image;

    const filePath = imagePublicUrl.split("/books/")[1];
    console.log("Deleting file:", filePath);
    const { error: storageError } = await supabase.storage
      .from("books")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage Error:", storageError);
      toast.error(`خطأ في حذف الصورة: ${storageError.message}`);
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`تم حذف كتاب ${data[0]?.title} بنجاح`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 0.01 * index, duration: 0.6 }}
        className="group relative bg-(--secondary-bg) rounded-xl overflow-hidden"
      >
        <div className="overflow-hidden h-100 mb-4">
          <img
            className="group-hover:scale-110 group-hover:rotate-4 cursor-pointer transition-all duration-300 object-cover w-full h-full"
            src={image}
            alt={title}
            loading="lazy"
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

          {user?.isAdmin && (
            <button
              className="text-center text-lg lg:text-xl bg-red-500 text-gray-300 hover:font-bold transition-all duration-300 rounded-2xl w-full py-2 mt-2"
              onClick={() => setOpenModal(true)}
            >
              حذف الكتاب
            </button>
          )}
        </div>
      </motion.div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => handleDeleteCurrentBook(id)}
        title="حذف الكتاب"
        message="هل أنت متأكد أنك تريد حذف هذا الكتاب؟"
      />
    </>
  );
}

export default CardBook;
