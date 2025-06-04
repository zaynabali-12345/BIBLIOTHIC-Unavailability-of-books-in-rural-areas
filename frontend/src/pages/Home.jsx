import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import BookFeatures from "../components/Home/BookFeatures";

const Home = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#990c13] to-[rgb(247,123,110)] text-white px-1 py-8">
      <Hero />
      <RecentlyAdded />
      <BookFeatures />
    </div>
  );
};

export default Home;
