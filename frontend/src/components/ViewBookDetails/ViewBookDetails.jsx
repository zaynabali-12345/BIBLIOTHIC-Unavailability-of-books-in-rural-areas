import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewBookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => console.error("Error fetching book details:", error))
        .finally(() => setLoading(false));
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        try {
            const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite", {}, { headers });
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Failed to add to favourites");
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers });
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const deleteBook = async () => {
        try {
            const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers });
            toast.success(response.data.message);
            setTimeout(() => navigate("/all-books"), 1500);
        } catch (error) {
            toast.error("Error deleting book");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            {loading ? (
                <div className="h-screen bg-white flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <motion.div
                    className="px-4 md:px-12 py-8 bg-white flex flex-col lg:flex-row gap-8 items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-full lg:w-3/6">
                        <motion.div
                            className="flex flex-col lg:flex-row justify-around bg-red-900 p-12 rounded-xl"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <img src={Data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />

                            {/* User Buttons */}
                            {isLoggedIn && role === "user" && (
                                <div className="flex flex-row md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                                    <motion.button whileTap={{ scale: 0.9 }}
                                        className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-900 flex items-center justify-center"
                                        onClick={handleFavourite}>
                                        <FaHeart />
                                        <span className="ms-4 block lg:hidden">Favourites</span>
                                    </motion.button>

                                    <motion.button whileTap={{ scale: 0.9 }}
                                        className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center"
                                        onClick={handleCart}>
                                        <FaShoppingCart />
                                        <span className="ms-4 block lg:hidden">Add to cart</span>
                                    </motion.button>
                                </div>
                            )}

                            {/* Admin Buttons */}
                            {isLoggedIn && role === "admin" && (
                                <div className="flex flex-row md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                                    <Link to={`/updateBook/${id}`}
                                        className="bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center">
                                        <FaEdit />
                                        <span className="ms-4 block lg:hidden">Edit</span>
                                    </Link>

                                    <motion.button whileTap={{ scale: 0.9 }}
                                        className="text-red-900 rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center"
                                        onClick={deleteBook}>
                                        <MdDelete />
                                        <span className="ms-4 block lg:hidden">Delete Book</span>
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <motion.div
                        className="p-4 w-full lg:w-3/6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="text-4xl text-red-900 font-semibold">{Data.title}</h1>
                        <p className="text-red-900 font-semibold mt-1">by {Data.author}</p>
                        <p className="text-black mt-4 font-semibold text-xl">{Data.desc}</p>
                        <p className="flex mt-4 font-semibold items-center justify-start text-red-900">
                            <GrLanguage className="me-3" />{Data.language}
                        </p>
                        <p className="mt-4 text-red-900 text-3xl font-semibold">Price : ₹ {Data.price}</p>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default ViewBookDetails;
