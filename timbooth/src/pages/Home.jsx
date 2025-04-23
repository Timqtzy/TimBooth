import React from "react";
import Navbar from "../component/Navbar";
import { Camera } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed top-2 left-0 right-0 flex justify-center px-4">
        <section className="w-full max-w-screen-lg">
          <Navbar />
        </section>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <section className="flex flex-col justify-center items-center px-4">
          <h2 className="text-center text-2xl sm:text-5xl text-pink-300 font-bold mb-6">
            Flash Frame Fine shyt
          </h2>
          <p className="text-black text-center mb-8">
            Capture, create, and share your best moments with a photo booth made
            for fun!
          </p>
          <button className="flex bg-black p-2 rounded-md gap-2">
            {<Camera className="text-white" />} Take a photo
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
