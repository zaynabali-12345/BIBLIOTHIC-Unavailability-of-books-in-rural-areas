import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ show, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-sm w-full relative shadow-xl"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
          >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div>{children}</div>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role === "admin" && location.pathname !== "/") {
      links.push({ title: "Admin Profile", link: "/profile" });
    } else if (role === "user") {
      links.push({ title: "Cart", link: "/cart" });
      links.push({ title: "Profile", link: "/profile" });
    }
  }

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, title: "", content: "" });


  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const desktopLinksVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
  };

  const linkUnderline = {
    initial: { width: 0 },
    hover: { width: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <>
      <motion.nav
        className="z-50 relative flex px-8 py-4 items-center justify-between bg-gradient-to-r from-[#990c13] to-[rgb(247,123,110)] shadow-lg"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to="/" className="flex items-center">
          <img className="h-16 me-0" src="title image (1).png" alt="logo" />
          <h1 className="text-2xl text-white font-extrabold tracking-wide select-none">BIBLIOTHIC</h1>
        </Link>

        <div className="nav-links-Bibliothic text-white block md:flex items-center gap-6">
          <div className="hidden md:flex">
            {links.map((items, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={desktopLinksVariants}
                initial="hidden"
                animate="visible"
                className="relative mx-3 cursor-pointer select-none"
                onClick={() => handleLinkClick(items.title)}
                whileHover={{ scale: 1.15, color: "#ff453a" }}
              >
                <Link
                  to={items.link}
                  className={`font-semibold ${
                    (items.title === "Profile" || items.title === "Admin Profile")
                      ? "px-5 py-1 border border-white rounded-md"
                      : ""
                  }`}
                >
                  {items.title}
                </Link>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500 rounded"
                  initial="initial"
                  whileHover="hover"
                  variants={linkUnderline}
                />
              </motion.div>
            ))}
          </div>

          {!isLoggedIn && (
            <motion.div
              className="hidden md:flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.4 } }}
            >
              <Link
                to="/LogIn"
                className="px-5 py-1 text-white border border-white rounded-md hover:bg-white hover:text-red-600 transition"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-5 py-1 bg-red-600 rounded-md hover:bg-white hover:text-red-600 transition"
              >
                SignUp
              </Link>
            </motion.div>
          )}

          <button
            className="block md:hidden text-white text-3xl hover:text-red-300 transition-transform duration-300"
            onClick={() => setMobileNavOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed bottom-0 left-0 w-full bg-red-600 z-40 flex flex-col items-center justify-center py-12 rounded-t-3xl shadow-lg"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 25 } }}
            exit={{ y: "100%", opacity: 0, transition: { duration: 0.3 } }}
          >
            {links.map((items, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, color: "#ff726f" }}
                className="mb-8 text-white text-4xl font-bold cursor-pointer"
                onClick={() => handleLinkClick(items.title)}
              >
                <Link to={items.link}>{items.title}</Link>
              </motion.div>
            ))}

            {!isLoggedIn && (
              <>
                <Link
                  to="/LogIn"
                  className="px-12 mb-8 text-3xl font-semibold py-3 border border-red-300 rounded-md text-white hover:bg-white hover:text-red-700 transition"
                  onClick={() => setMobileNavOpen(false)}
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-12 mb-8 text-3xl font-semibold py-3 bg-red-700 rounded-md hover:bg-white hover:text-red-700 transition"
                  onClick={() => setMobileNavOpen(false)}
                >
                  SignUp
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        show={modalInfo.show}
        onClose={() => setModalInfo({ show: false, title: "", content: "" })}
        title={modalInfo.title}
      >
        <p>{modalInfo.content}</p>
      </Modal>
    </>
  );
};

export default Navbar;
