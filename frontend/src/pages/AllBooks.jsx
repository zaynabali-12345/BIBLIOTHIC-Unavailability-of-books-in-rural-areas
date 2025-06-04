import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjpbeyJuYW1lIjoiQUJDMTIzIn0seyJyb2xlIjoidXNlciJ9XSwiaWF0IjoxNzQ4MTg2MzI3LCJleHAiOjE3NTA3NzgzMjd9.EL5jEcrDEq-hy0PNsRYy80xj43dt9T5dX9UzuR2b3Bk";

  useEffect(() => {
    axios
      .get("http://localhost:1000/api/v1/get-all-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error("Error fetching books:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks = Data.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPopup = (book) => {
    setSelectedBook(book);
  };

  const closePopup = () => {
    setSelectedBook(null);
  };

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold flex items-center justify-center text-red-600 mb-8">
        All Books
      </h1>

      <div className="flex items-center border border-red-900 bg-white rounded-full overflow-hidden shadow-lg w-full max-w-6xl mx-auto mb-8 transition duration-300 hover:ring-2 hover:ring-red-200">
        <div className="flex items-center pl-5 text-gray-400">
          <IoMdSearch size={24} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your book here.."
          className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : filteredBooks.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              variants={itemVariants}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => openPopup(book)}
            >
              <BookCard data={book} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-black">No books found</p>
      )}

      {/* Popup Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-lg mx-4 relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2 font-semibold">Author: {selectedBook.author}</p>
            <p className="mb-4 text-gray-700">
              {selectedBook.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
