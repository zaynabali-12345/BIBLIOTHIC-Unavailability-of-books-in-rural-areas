import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      {!OrderHistory ? (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      ) : OrderHistory.length === 0 ? (
        <div className="h-[80vh] p-4 text-white">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-black mb-8">
              No Order History
            </h1>
            <img
              src="/No-order-history.png"
              alt="No-order-history"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[100%] p-0 md:p-4 text-red-800"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-red-800 w-full rounded py-2 px-4 flex gap-2">
            {/* Heading columns with hover pop effect */}
            <div className="text-white w-[3%] hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="text-white w-[22%] hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1>Books</h1>
            </div>
            <div className="text-white w-[45%] hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1>Description</h1>
            </div>
            <div className="text-white w-[9%] hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1>Price</h1>
            </div>
            <div className="text-white w-[16%] hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1>Status</h1>
            </div>
            <div className="text-white w-none md:w-[5%] hidden md:block hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <h1>Mode</h1>
            </div>
          </div>

          {OrderHistory.map((items, i) => (
            <div
              key={items._id || i}
              onClick={() => openModal(items)}
              className="bg-white w-full rounded py-2 px-4 flex gap-4 hover:bg-red-400 hover:cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-black"
                  onClick={(e) => e.stopPropagation()} // Taaki link click pe modal na khule
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1>{items.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[9%]">
                <h1>₹ {items.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "Order Placed" ? (
                    <div className="text-yellow-700">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-red-800">COD</h1>
              </div>
            </div>
          ))}

          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Order Details"
            className="bg-white p-6 max-w-lg mx-auto rounded-lg outline-none relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <button
              onClick={closeModal}
              className="mb-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
            {selectedOrder && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedOrder.book.title}
                </h2>
                <p className="mb-2">{selectedOrder.book.desc}</p>
                <p className="mb-1">
                  <strong>Price:</strong> ₹{selectedOrder.book.price}
                </p>
                <p className="mb-1">
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p className="mb-1">
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
              </div>
            )}
          </ReactModal>
        </motion.div>
      )}
    </>
  );
};

export default UserOrderHistory;
