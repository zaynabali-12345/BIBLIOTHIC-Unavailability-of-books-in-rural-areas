import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Popup from '../components/Popup';

const AddBook = () => {
  const [Data, setData] = useState({
    url: '', title: '', author: '', price: '', desc: '', language: '',
  });

  const [popupMsg, setPopupMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const showPopupMessage = (message) => {
    setPopupMsg(message);
    setShowPopup(true);
  };

  const submit = async () => {
    const { url, title, author, price, desc, language } = Data;
    if (!url || !title || !author || !price || !desc || !language) {
      showPopupMessage('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1000/api/v1/add-book', Data, { headers });
      setData({ url: '', title: '', author: '', price: '', desc: '', language: '' });
      showPopupMessage(response.data.message || 'Book added successfully!');
    } catch (error) {
      showPopupMessage(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-6">
      <motion.div
        className="w-full max-w-4xl p-[2px] rounded-3xl bg-white border border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-rose-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-300 shadow-xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-[1.45rem] p-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-center bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text">
            Add a New Book
          </h1>
          <p className="text-center text-gray-500 mb-4">
            Fill in the details below to list your book in the store.
          </p>

          {/* Input Group */}
          <div className="space-y-5">
            <InputField label="Cover Image URL" name="url" value={Data.url} onChange={change} placeholder="https://..." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Title" name="title" value={Data.title} onChange={change} />
              <InputField label="Author" name="author" value={Data.author} onChange={change} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Language" name="language" value={Data.language} onChange={change} />
              <InputField label="Price (₹)" name="price" value={Data.price} onChange={change} type="number" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="desc"
                rows="4"
                value={Data.desc}
                onChange={change}
                placeholder="Brief description of the book..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-sm resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={submit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-red-700 via-red-400 to-yellow-500 text-white font-bold text-lg py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            ➕ Add Book
          </motion.button>
        </div>
      </motion.div>

      {/* Popup */}
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <p className="text-center text-lg text-rose-600">{popupMsg}</p>
      </Popup>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder || label}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
    />
  </div>
);

export default AddBook;
