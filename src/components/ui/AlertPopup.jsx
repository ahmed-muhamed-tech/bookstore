import { motion, AnimatePresence } from "framer-motion";

function AlertPopup({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* الخلفية المظلمة */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* جسم الـ Popup */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-3 text-gray-500">{message}</p>
          </div>

        
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default AlertPopup;