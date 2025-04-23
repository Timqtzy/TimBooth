import React from "react";
import Navbar from "../component/Navbar";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed top-2 left-0 right-0 flex justify-center px-4">
        <section className="w-full max-w-screen-lg">
          <Navbar />
        </section>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <section className="flex flex-col justify-center items-center px-4">
          <h2 className="text-center text-[#2E2F2D] text-2xl sm:text-5xl  font-bold mb-6">
            Flash Frame Fine shyt
          </h2>
          <p className="text-[#2E2F2D] text-center mb-8 animate-bounce ">
            Capture, create, and share your best moments with a photo booth made
            for fun!
          </p>
          <button
            className="flex bg-black p-3 rounded-md gap-2"
            onClick={() => navigate("/booth")}
          >
            {<Camera className="text-white" />} Take a photo
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
