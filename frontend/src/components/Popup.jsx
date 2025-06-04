import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // optional: install `lucide-react` for icons

const Popup = ({ isOpen, onClose, children }) => {
  const stopClick = (e) => e.stopPropagation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // close when clicking on the backdrop
        >
          <motion.div
            className="bg-white rounded-2xl w-[90%] md:w-[500px] shadow-2xl p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={stopClick} // prevent closing when clicking inside the popup
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {/* Popup Content */}
            <div className="mt-2">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
