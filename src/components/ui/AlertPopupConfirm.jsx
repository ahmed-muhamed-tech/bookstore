import { motion, AnimatePresence } from "framer-motion";

function AlertPopupConfirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* الخلفية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Popup */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-3 text-gray-500">{message}</p>
          </div>

          {/* الأزرار */}
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                onConfirm?.(); // optional
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default AlertPopupConfirm;
