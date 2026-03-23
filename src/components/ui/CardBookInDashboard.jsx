import { useContext, useState } from "react";
import ToggleButton from "./ToggleButton";
import { authUserContext } from "../../contexts/AuthUserContext";
import UseDeletedCurrentBook from "../../hooks/useDeletedCurrentBook";
import { useToggleAvailability } from "../../hooks/useToggleAvailability"; // الـ Hook الجديد
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
      <div className="grid grid-cols-5 gap-5 items-center text-sm md:text-lg lg:text-xl bg-(--primary-color)/20 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row text-center md:text-start gap-2 items-center">
          <img
            src={image}
            className="w-12 h-16 object-cover rounded-xl"
            alt={title}
          />
          <div>
            <h2 className="font-bold leading-tight">{title}</h2>
            <p className="text-xs text-gray-500">تأليف: {author}</p>
          </div>
        </div>

        <h2 className="text-gray-600">{category}</h2>
        <h2 className="font-mono font-bold text-green-700">{price} ج.م</h2>

     
        <ToggleButton
          initialState={isValid}
          onToggle={(newState) => updateStatus({ id, newAvailable: newState })}
          disabled={isUpdating}
        />

        <div className="flex gap-2">
          {user?.isAdmin && (
            <>
              <button
                className="bg-blue-500 px-3 py-1.5 text-white hover:bg-blue-600 transition-all rounded-lg text-sm"
                onClick={() => {
                  /* logic التعديل هنا */
                }}
              >
                تعديل
              </button>
              <button
                className="bg-red-500 px-3 py-1.5 text-white hover:bg-red-600 transition-all rounded-lg text-sm"
                onClick={() => setOpenModal(true)}
              >
                حذف
              </button>
            </>
          )}
        </div>
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
