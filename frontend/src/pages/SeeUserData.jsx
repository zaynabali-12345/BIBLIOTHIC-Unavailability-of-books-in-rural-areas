import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 0.8 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } }
};

const popupVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  const isVisible = userDiv === "fixed";
  const [showPopup, setShowPopup] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-black z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-gradient-to-r from-[#990c13] to-[rgb(247,123,110)] rounded-2xl p-6 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] text-white shadow-xl relative">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">User Information</h1>
                <button
                  onClick={() => setUserDiv("hidden")}
                  className="text-white p-2 rounded-full hover:bg-white hover:text-black transition duration-300"
                >
                  <RxCross1 size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label>Username:{" "}
                    <span className="font-semibold">{userDivData.username}</span>
                  </label>
                </div>
                <div>
                  <label>Email:{" "}
                    <span className="font-semibold">{userDivData.email}</span>
                  </label>
                </div>
                <div>
                  <label>Address:{" "}
                    <span className="font-semibold">{userDivData.address}</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(true)}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Show Confirmation
              </button>

              {/* Popup inside modal */}
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    className="absolute top-4 right-4 bg-green-600 text-white rounded p-3 shadow-lg cursor-pointer"
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => setShowPopup(false)}
                    title="Click to close"
                  >
                    Confirmed!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SeeUserData;
