import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Cart = () => {
    const navigate = useNavigate();
    const [Cart, setCart] = useState();
    const [Total, setTotal] = useState(0);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
                setCart(response.data.data);
            } catch (err) {
                console.error("Failed to load cart:", err);
            }
        };
        fetch();
    }, []);

    const deleteItem = async (bookid) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to remove this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
                Swal.fire("Deleted!", response.data.message, "success");
                const updatedCart = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
                setCart(updatedCart.data.data);
            } catch (err) {
                Swal.fire("Error", "Could not remove item", "error");
            }
        }
    };

    useEffect(() => {
        if (Cart && Cart.length > 0) {
            const total = Cart.reduce((acc, item) => acc + item.price, 0);
            setTotal(total);
        }
    }, [Cart]);

    const PlaceOrder = async () => {
        try {
            const response = await axios.post("http://localhost:1000/api/v1/place-order", { order: Cart }, { headers });
            await Swal.fire("Order Placed!", response.data.message, "success");
            navigate("/profile/orderHistory");
        } catch (error) {
            Swal.fire("Error", "Something went wrong with your order", "error");
        }
    };

    return (
        <div className="bg-white px-12 h-screen py-8">
            {!Cart && (
                <div className="w-full h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}

            {Cart && Cart.length === 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-screen"
                >
                    <div className="h-[100%] flex items-center justify-center flex-col">
                        <h1 className="text-5xl lg:text-6xl py-8 font-bold text-black">Empty Cart</h1>
                        <img src="/cart 1.png" alt="empty-cart" className="lg:h-[50vh]" />
                    </div>
                </motion.div>
            )}

            {Cart && Cart.length > 0 && (
                <>
                    <h1 className="text-5xl font-semibold text-red-600 mb-8">Your Cart</h1>
                    {Cart.map((items, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-gradient-to-r from-[#990c13] to-[rgb(247,123,110)] justify-between items-center"
                            key={i}
                        >
                            <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
                            <div className="w-full md:w-auto">
                                <h1 className="text-2xl text-white font-semibold text-start mt-2 md:mt-0">{items.title}</h1>
                                <p className="text-normal text-white mt-2 hidden lg:block">{items.desc.slice(0, 100)}...</p>
                                <p className="text-normal text-white mt-2 hidden md:block lg:hidden">{items.desc.slice(0, 65)}...</p>
                                <p className="text-normal text-white mt-2 md:hidden">{items.desc.slice(0, 100)}...</p>
                            </div>
                            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                <h2 className="text-white text-3xl font-semibold flex">₹ {items.price}</h2>
                                <button
                                    className="bg-rose-100 text-red-500 border border-red-900 rounded p-2 ms-12"
                                    onClick={() => deleteItem(items._id)}
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 w-full flex items-center justify-end"
                    >
                        <div className="p-4 bg-gradient-to-r from-[#990c13] to-[rgb(247,123,110)] rounded">
                            <h1 className="text-3xl text-white font-semibold">Total Amount</h1>
                            <div className="mt-3 flex items-center justify-between text-xl text-white">
                                <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
                            </div>
                            <div className="w-[100%] mt-3">
                                <button
                                    className="bg-white text-red-500 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-red-200 transition"
                                    onClick={PlaceOrder}
                                >
                                    Place your Order
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default Cart;
