import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookCard = ({ data, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );

      toast.dismiss("remove-toast"); 
      toast.success("Book removed from favourites", {
        toastId: "remove-toast", 
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      if (onRemove) onRemove();
    } catch (err) {
      toast.error("Failed to remove book ❌", {
        toastId: "remove-error",
      });
    }
  };

  return (
    <div className="bg-red-700 rounded p-4 flex flex-col transform transition duration-300 hover:scale-105 shadow-lg">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-red-900 rounded flex items-center justify-center">
            <img src={data.url} alt={data.title} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-pink-200 font-semibold">by {data.author}</p>
          <p className="mt-2 text-pink-100 font-semibold text-xl">₹ {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="bg-white px-4 py-2 rounded border border-red-500 text-red-900 mt-4"
        >
          Remove From Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
