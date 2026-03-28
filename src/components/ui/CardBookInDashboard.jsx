import { useContext, useState } from "react";
import ToggleButton from "./ToggleButton";
import { authUserContext } from "../../contexts/AuthUserContext";
import UseDeletedCurrentBook from "../../hooks/useDeletedCurrentBook";
import { useToggleAvailability } from "../../hooks/useToggleAvailability";
import ConfirmModal from "./ConfirmModal";

function CardBookInDashboard({
  image,
  title,
  isValid,
  price,
  author,
  category,
  id,
}) {
  const { user } = useContext(authUserContext);
  const [openModal, setOpenModal] = useState(false);
  const { handleDeleteCurrentBook } = UseDeletedCurrentBook();
  const { updateStatus, isUpdating } = useToggleAvailability();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 items-center
        bg-white border border-gray-100 hover:border-(--primary-color)/30
        hover:shadow-md transition-all duration-300
        p-4 rounded-2xl shadow-sm">

        {/* Book Info */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-3 items-center">
          <div className="w-16 h-20 rounded-xl overflow-hidden shadow-sm shrink-0">
            <img
              src={image}
              className="object-cover h-full w-full"
              alt={title}
            />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-snug text-gray-800 mb-0.5">
              {title}
            </h2>
            <p className="text-xs text-gray-400">تأليف: {author}</p>
          </div>
        </div>

        {/* Category */}
        <span className="justify-self-center lg:justify-self-start
          text-xs font-medium bg-(--primary-color)/10 text-(--primary-color)
          py-1 px-3 rounded-full w-fit">
          {category}
        </span>

        {/* Price */}
        <div className="justify-self-center lg:justify-self-start flex flex-col">
          <span className="text-xs text-gray-400 mb-0.5">السعر</span>
          <span className="font-bold text-green-600 text-base">{price} ج.م</span>
        </div>

        {/* Toggle */}
        <div className="justify-self-center lg:justify-self-start">
          <ToggleButton
            initialState={isValid}
            onToggle={(newState) => updateStatus({ id, newAvailable: newState })}
            disabled={isUpdating}
          />
        </div>

        {/* Actions */}
        {user?.isAdmin && (
          <div className="flex gap-2 justify-self-center lg:justify-self-start">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                bg-blue-50 text-blue-600 border border-blue-200
                hover:bg-blue-500 hover:text-white hover:border-transparent
                transition-all duration-200 rounded-xl"
              onClick={() => {}}
            >
              تعديل
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                bg-red-50 text-red-500 border border-red-200
                hover:bg-red-500 hover:text-white hover:border-transparent
                transition-all duration-200 rounded-xl"
              onClick={() => setOpenModal(true)}
            >
              حذف
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => handleDeleteCurrentBook(id)}
        title="حذف الكتاب"
        message={`هل أنت متأكد أنك تريد حذف كتاب "${title}" نهائياً؟`}
      />
    </>
  );
}

export default CardBookInDashboard;