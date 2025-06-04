import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const BookFeatures = () => {
  const [selectedId, setSelectedId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const features = [
    {
      id: 1,
      title: "Browse Books",
      description: "Explore thousands of titles across genres, from timeless classics to new releases.",
      img: "fe 1.png",
      alt: "Browse books",
    },
    {
      id: 2,
      title: "Create Reading Lists",
      description: "Organize your favorite books and build custom reading lists to stay inspired.",
      img: "fe 2.png",
      alt: "Create reading lists",
    },
    {
      id: 3,
      title: "Pay safely",
      description: "Your favorite books, delivered with care and COD – pay only when it’s at your door!",
      img: "fe 3.png",
      alt: "Pay safely",
    },
    {
      id: 4,
      title: "We're here to help",
      description: "Need book suggestions, account help, or reading advice? Our support team is ready for you.",
      img: "fe 4.png",
      alt: "Help",
    },
  ];

  const selectedFeature = features.find((f) => f.id === selectedId);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-white">
      {/* Content Section */}
      <section ref={sectionRef} className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-black mb-4"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          Discover Your Next Read
        </motion.h2>

        <motion.p
          className="text-gray-700 font-medium mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
        >
          Top features for book lovers and avid readers
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              layoutId={`card-${feature.id}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i + 1}
              className="bg-gray-100 p-6 rounded-xl shadow-md cursor-pointer text-center"
              onClick={() => setSelectedId(feature.id)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={feature.img} alt={feature.alt} className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popout Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${selectedFeature.id}`}
              className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-red-500"
              >
                &times;
              </button>
              <img src={selectedFeature.img} alt={selectedFeature.alt} className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">{selectedFeature.title}</h3>
              <p className="text-gray-700">{selectedFeature.description}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookFeatures;
