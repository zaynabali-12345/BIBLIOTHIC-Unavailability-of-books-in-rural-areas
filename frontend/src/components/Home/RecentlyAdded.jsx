import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import { motion, useInView } from "framer-motion";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mt-8 px-4 py-1 bg-white" ref={sectionRef}>
      <h4 className="mt-20 text-2xl sm:text-3xl font-bold text-red-800 pb-3">
        Recently Added Books
      </h4>

      {!Data ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {Data.map((items, i) => (
            <motion.div key={i} variants={cardVariants}>
              <BookCard data={items} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RecentlyAdded;
