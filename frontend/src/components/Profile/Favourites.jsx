import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";

const NoFavPopup = () => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className="fixed left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
      style={{ bottom: "20vh", color: "black" }}
    >
      <div className="text-4xl font-bold mb-6 text-center select-none">
        No Favourite Books
      </div>
      <img src="./star 2.png" alt="star" className="h-[20vh] select-none" />
    </motion.div>,
    document.body
  );
};

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      const books = res.data?.data || [];
      setFavouriteBooks(books);
    } catch (err) {
      setFavouriteBooks([]);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemove = () => {
    fetchFavourites();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <ToastContainer />

      {FavouriteBooks.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-8 mt-6">
            Favourites
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FavouriteBooks.map((book) => (
              <BookCard
                key={book._id}
                data={book}
                favourite={true}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {FavouriteBooks.length === 0 && <NoFavPopup />}
      </AnimatePresence>
    </div>
  );
};

export default Favourites;
