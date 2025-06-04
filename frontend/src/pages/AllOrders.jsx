import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '../components/Popup';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, values, { headers });
      alert(response.data.message);
      setOptions(-1);

      const updatedOrders = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
      setAllOrders(updatedOrders.data.data);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      {!allOrders.length ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-full p-4 text-black">
          <h1 className="text-3xl font-bold text-red-700 mb-6">All Orders</h1>

          {/* Header */}
          <div className="hidden md:grid grid-cols-12 bg-red-700 text-white font-semibold rounded-lg px-4 py-3">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-2 pl-2">Book</div>
            <div className="col-span-4 pl-2">Description</div>
            <div className="col-span-2 text-right pr-2">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-center">
              <FaUserLarge />
            </div>
          </div>

          {/* Orders */}
          {allOrders.map((items, i) => (
            <motion.div
              key={items._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="grid grid-cols-12 items-center bg-white rounded-lg px-4 py-3 my-2 hover:bg-red-100 shadow-sm transition-all"
            >
              <div className="col-span-1 text-center font-medium">{i + 1}</div>

              <div className="col-span-2 font-semibold text-red-700 hover:underline pl-2">
                <Link to={`/view-book-details/${items?.book?._id || ''}`}>
                  {items?.book?.title || 'No Title'}
                </Link>
              </div>

              <div className="col-span-4 text-sm text-gray-700 pl-2">
                {items?.book?.desc ? `${items.book.desc.slice(0, 60)}...` : 'No description'}
              </div>

              <div className="col-span-2 text-right font-semibold pr-2">
                ₹ {items?.book?.price || 'N/A'}
              </div>

              <div className="col-span-2 text-center">
                <button
                  onClick={() => {
                    setOptions(i);
                    setValues({ status: items.status });
                  }}
                  className="text-sm font-bold"
                >
                  <span className={
                    items.status === "Order placed"
                      ? "text-yellow-600"
                      : items.status === "Canceled"
                      ? "text-red-600"
                      : "text-green-600"
                  }>
                    {items.status}
                  </span>
                </button>

                <AnimatePresence>
                  {options === i && (
                    <motion.div
                      className="mt-2 flex justify-center items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((statusOption, index) => (
                          <option value={statusOption} key={index}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-600 hover:text-red-700"
                        onClick={() => submitChanges(i)}
                      >
                        <FaCheck />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="col-span-1 text-center">
                <button
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                  className="text-xl hover:text-red-700"
                >
                  <IoOpenOutline />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Popup isOpen={userDiv === "fixed"} onClose={() => setUserDiv("hidden")}>
        {userDivData && (
          <SeeUserData
            userDivData={userDivData}
            userDiv={userDiv}
            setUserDiv={setUserDiv}
      />
)}

      </Popup>
    </>
  );
};

export default AllOrders;
