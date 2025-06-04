import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const LogIn = () => {
  const [Values, setValues] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const Submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        toast.warning("All fields are required", { toastId: "fieldsRequired" });
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        toast.success("Login successful!", { toastId: "loginSuccess" });

        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        toastId: "loginFailed",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <ToastContainer position="top-center" autoClose={2000} /> {/* ✅ Toast container added here */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden
          p-[2px] bg-transparent
          hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-500 hover:to-blue-500
          transition-all duration-500 shadow-lg"
      >
        <div className="flex flex-col md:flex-row w-full bg-white rounded-2xl overflow-hidden">
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
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center mb-6 text-black"
            >
              Log In
            </motion.p>

            <div>
              <label className="text-black font-semibold">Username</label>
              <input
                type="text"
                className="w-full mt-2 bg-white text-gray-800 p-3 rounded outline-none border border-black placeholder-gray-500 focus:ring-2 focus:ring-red-400"
                placeholder="Enter username"
                name="username"
                value={Values.username}
                onChange={change}
              />
            </div>

            <div className="mt-4 relative">
              <label className="text-black font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-2 bg-white text-gray-800 p-3 rounded outline-none border border-black placeholder-gray-500 focus:ring-2 focus:ring-red-400 pr-12"
                placeholder="Enter password"
                name="password"
                value={Values.password}
                onChange={change}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-3 text-white hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.965 9.965 0 012.112-3.592m2.82-2.82A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-1.357 2.592M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-6">
              <button
                onClick={Submit}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Log In
              </button>
            </motion.div>

            <p className="flex mt-6 items-center justify-center text-black font-semibold">Or</p>

            <p className="flex mt-4 items-center justify-center text-black font-semibold">
              Don't have an account? &nbsp;
              <Link to="/signup" className="hover:underline hover:text-gray-600">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LogIn;
