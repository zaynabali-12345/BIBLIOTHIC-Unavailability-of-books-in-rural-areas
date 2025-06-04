import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Submit = async () => {
    const { username, email, password, address } = values;

    if (!username || !email || !password || !address) {
      toast.warn("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.warn("Password should be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/register",
        values
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("OTP sent to your email!");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 1500);
      } else {
        toast.error(response.data?.msg || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("SignUp Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Sign Up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <ToastContainer position="top-center" autoClose={2000} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden
          p-[2px] bg-transparent
          hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-500 hover:to-blue-500
          transition-all duration-500 shadow-lg"
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row w-full bg-white rounded-2xl overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:w-1/2 h-64 md:h-auto"
          >
            <img
              src="sign_up_image.jpg"
              alt="Library"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="md:w-1/2 p-8 bg-white">
            <p className="text-3xl font-bold text-center mb-6 text-black">Sign Up</p>

            <div className="mb-4">
              <label className="text-black font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={change}
                placeholder="Enter username"
                className="w-full mt-2 p-3 border border-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="mb-4">
              <label className="text-black font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={change}
                placeholder="Enter email"
                className="w-full mt-2 p-3 border border-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="mb-4">
              <label className="text-black font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={change}
                placeholder="Enter address"
                className="w-full mt-2 p-3 border border-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="mb-4 relative">
              <label className="text-black font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={change}
                placeholder="Enter password"
                className="w-full mt-2 p-3 pr-12 border border-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-red-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-3 text-gray-700 hover:text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              onClick={Submit}
              className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Sign Up
            </button>

            <p className="flex mt-6 items-center justify-center text-black font-semibold">Or</p>
            <p className="flex mt-4 items-center justify-center text-black font-semibold">
              Already have an account?&nbsp;
              <Link to="/login" className="hover:underline hover:text-gray-600">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
