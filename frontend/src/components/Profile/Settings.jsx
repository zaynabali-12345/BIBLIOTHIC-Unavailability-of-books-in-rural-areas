import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const SubmitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        Value,
        { headers }
      );
      setShowPopup(true);
    } catch (error) {
      alert("Failed to update address. Try again.");
    }
  };

  return (
    <>
      {!ProfileData && (
        <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
          <Loader />
        </div>
      )}

      {ProfileData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 text-gray-900"
        >
          <h1 className="text-4xl font-extrabold text-red-700 mb-8 border-b-4 border-red-500 pb-2">
            Settings
          </h1>

          <div className="flex flex-wrap gap-8 mb-8">
            <div className="flex flex-col w-1/2 min-w-[200px]">
              <label className="mb-1 font-semibold">Username</label>
              <p className="p-3 rounded border-2 border-red-300 bg-red-50 font-medium select-text">
                {ProfileData.username}
              </p>
            </div>
            <div className="flex flex-col w-1/2 min-w-[200px]">
              <label className="mb-1 font-semibold">Email</label>
              <p className="p-3 rounded border-2 border-red-300 bg-red-50 font-medium select-text">
                {ProfileData.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Address</label>
            <textarea
              className="p-3 rounded border-2 border-red-300 focus:ring-2 focus:ring-red-400 focus:outline-none resize-none font-medium transition-shadow duration-300"
              rows="5"
              placeholder="Enter your address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>

          <div className="flex justify-end mt-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded shadow-md hover:bg-red-700 transition-colors duration-300"
              onClick={SubmitAddress}
            >
              Update
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center"
            >
              <h2 className="text-xl font-bold mb-4 text-red-700">Success!</h2>
              <p className="mb-6">Your address has been updated successfully.</p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Settings;
