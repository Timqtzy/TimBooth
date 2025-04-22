import React from "react";
import Navbar from "../component/Navbar";

const Home = () => {
  return (
    <div className="flex justify-center">
      <div className="fixed top-2 left-0 right-0 flex justify-center px-4">
        <section className="w-full max-w-screen-lg ">
          <Navbar />
        </section>
      </div>
    </div>
  );
};

export default Home;
