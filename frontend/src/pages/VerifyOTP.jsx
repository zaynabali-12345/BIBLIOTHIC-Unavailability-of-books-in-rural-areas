import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.warning("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1000/api/v1/verify-otp", {
        email,
        otp: enteredOtp,
      });
      if (res.status === 200) {
        toast.success("Verification successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Outer wrapper with gradient border on hover */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group p-[2px] rounded-lg
          bg-transparent
          hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-500 hover:to-blue-500
          transition-all duration-500 shadow-lg
          flex w-full max-w-4xl overflow-hidden"
      >
        {/* Inner white container */}
        <div className="bg-white rounded-lg flex w-full overflow-hidden">
          {/* Left: Image */}
          <div className="w-1/2">
            <img
              src="sign_up_image.jpg"
              alt="Library"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Right: OTP form */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Enter OTP
            </h2>

            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded hover:bg-red-600 transition"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
