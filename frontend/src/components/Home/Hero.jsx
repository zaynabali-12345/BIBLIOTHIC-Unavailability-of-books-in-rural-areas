import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [animate, setAnimate] = useState(false);
  const heroRef = useRef(null); // Reference to observe

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true); 
        } else {
          setAnimate(false); 
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div
        ref={heroRef}
        className="h-[75vh] flex flex-col md:flex-row items-center justify-center px-4"
      >
        <div
          className={`w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center transition-all duration-700 ease-out
            ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <h1 className="text-4xl lg:text-6xl font-semibold text-white text-center lg:text-left">
            Discover Your Next Great Read
          </h1>
          <p className="mt-4 text-xl text-white text-center lg:text-left">
            Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
          </p>
          <div className="mt-8">
            <Link
              to="/all-books"
              onClick={handleDiscoverClick}
              className="text-white text-xl lg:text-2xl font-semibold border border-white px-10 py-3 hover:bg-red-500 rounded-full transition-colors duration-300"
            >
              Discover Books
            </Link>
          </div>
        </div>
        <div
          className={`mt-12 w-[400px] lg:w-[500px] h-[300px] lg:h-[400px] flex items-center justify-center transition-all duration-1000 ease-out
            ${animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <img
            src="./hero 2.jpg"
            alt="hero 2"
            className="rounded-xl w-full h-full object-cover shadow-lg"
          />
        </div>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="mb-6">
              Dive into our extensive library and find your next favorite book.
            </p>
            <Link
              to="/all-books"
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
              onClick={() => setShowPopup(false)}
            >
              Go to Books
            </Link>
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
