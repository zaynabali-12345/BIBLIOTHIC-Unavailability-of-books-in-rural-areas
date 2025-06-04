import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Popup from "../components/Popup";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const showPopupMessage = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const submit = async () => {
    const { url, title, author, price, desc, language } = Data;
    if (!url || !title || !author || !price || !desc || !language) {
      showPopupMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        Data,
        { headers }
      );
      showPopupMessage(response.data.message);
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      showPopupMessage(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:1000/api/v1/get-book-by-id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => showPopupMessage("Failed to load book data"));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-6 py-16">
      <style>{`
        .animated-gradient-border {
          border-radius: 2rem; /* Rounded corners */
          padding: 4px; /* Border thickness */
          background: white; /* Default white border */
          box-sizing: border-box;
          transition: background 0.6s ease;
          cursor: pointer;
          border: 4px solid white; /* Keep border white by default */
          position: relative;
          overflow: hidden;
        }

        .animated-gradient-border > .inner-card {
          border-radius: 1.75rem; /* Slightly smaller than outer */
          background: white;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }

        @media(min-width: 768px) {
          .animated-gradient-border > .inner-card {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .animated-gradient-border:hover {
          border: none;
          background: linear-gradient(45deg, #f43f5e, #ec4899, #8b5cf6, #3b82f6, #06b6d4);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
          padding: 4px;
          box-sizing: border-box;
          z-index: 1;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #ec4899 !important; /* Pink-400 */
          box-shadow: 0 0 5px 0 #ec4899;
        }
      `}</style>

      <motion.div
        className="animated-gradient-border max-w-4xl w-full shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inner-card">
          {/* Left side: Book Cover Preview */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-52 h-72 rounded-xl overflow-hidden shadow-lg border border-gray-300">
              {Data.url ? (
                <img
                  src={Data.url}
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/208x288?text=No+Image";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400 font-semibold text-center p-6">
                  Book Cover Preview
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 text-center px-2">
              Paste image URL above to preview your book cover.
            </p>
          </div>

          {/* Right side: Form */}
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-3xl font-extrabold text-red-700 mb-6 border-b-4 border-red-400 pb-2">
              Update Book Details
            </h2>

            {/* Floating Input: URL */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="url"
                id="url"
                value={Data.url}
                onChange={change}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer"
              />
              <label
                htmlFor="url"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Book Cover URL
              </label>
            </div>

            {/* Floating Input: Title */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="title"
                id="title"
                value={Data.title}
                onChange={change}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer"
              />
              <label
                htmlFor="title"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            {/* Floating Input: Author */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="author"
                id="author"
                value={Data.author}
                onChange={change}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer"
              />
              <label
                htmlFor="author"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Author
              </label>
            </div>

            {/* Two inputs side by side: Language & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Language */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="language"
                  id="language"
                  value={Data.language}
                  onChange={change}
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer"
                />
                <label
                  htmlFor="language"
                  className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Language
                </label>
              </div>

              {/* Price */}
              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={Data.price}
                  onChange={change}
                  placeholder=" "
                  min="0"
                  className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer"
                />
                <label
                  htmlFor="price"
                  className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price (₹)
                </label>
              </div>
            </div>

            {/* Floating textarea: Description */}
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                name="desc"
                id="desc"
                rows={4}
                value={Data.desc}
                onChange={change}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-400 peer resize-none"
              ></textarea>
              <label
                htmlFor="desc"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            {/* Submit button */}
            <motion.button
              onClick={submit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-red-700 to-red-400 text-white text-xl font-extrabold rounded-3xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              💾 Update Book
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Popup */}
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <p className="text-center text-lg font-semibold text-pink-600">{popupMsg}</p>
      </Popup>
    </div>
  );
};

export default UpdateBook;
