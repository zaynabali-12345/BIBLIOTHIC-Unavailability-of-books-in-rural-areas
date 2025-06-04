import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import { motion, AnimatePresence } from "framer-motion";

// Modal without background blur or overlay dimming the page
const Modal = ({ show, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 border"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold mb-6 text-center">{title}</h2>
            <div className="mb-8 text-center">{children}</div>
            <button
              onClick={onClose}
              className="block mx-auto px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast notification with no page blur
const Toast = ({ message, show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer select-none z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [modalInfo, setModalInfo] = useState({ show: false, title: "", message: "" });
  const [toast, setToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      if (!token || !userId) {
        setModalInfo({
          show: true,
          title: "Unauthorized",
          message: "You are not authorized. Please log in again.",
        });
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: userId,
            },
          }
        );

        setProfile(response.data);

        // Show welcome toast (no blur)
        setToast({ show: true, message: `Welcome back, ${response.data.name || "User"}!` });
        setTimeout(() => setToast({ show: false, message: "" }), 3500);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch profile.";

        setModalInfo({
          show: true,
          title: "Error",
          message: errorMessage,
        });

        if (error.response?.status === 403) {
          localStorage.clear();
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const closeModal = () => {
    setModalInfo({ show: false, title: "", message: "" });
    if (modalInfo.title === "Unauthorized") {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white px-4 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-black min-h-screen">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="w-full md:w-1/6 h-auto lg:h-screen sticky top-0">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </motion.div>
      )}

      {/* Modal Popup */}
      <Modal show={modalInfo.show} onClose={closeModal} title={modalInfo.title}>
        <p>{modalInfo.message}</p>
      </Modal>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
};

export default Profile;
