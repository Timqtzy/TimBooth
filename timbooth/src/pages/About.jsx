import React from "react";
import Navbar from "../component/Navbar";
import {
  Camera,
  Palette,
  Sparkles,
  Save,
  ShieldUser,
  Cloud,
  ImageUp,
} from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-2 left-0 right-0 flex justify-center px-4 mb-14">
        <section className="w-full max-w-screen-lg">
          <Navbar />
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 xl:px-0 max-w-screen-lg mx-auto mb-14">
        <section className="text-[#2E2F2D] w-full p-8 border border-[#cdc2e7]  rounded-2xl h-full">
          <h3 className="font-bold text-2xl">Features</h3>
          <p className="py-2">
            Our photo booth website lets you capture, customize, and download
            fun, memorable photos with ease. Whether you're logged in or just
            visiting, you can:
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <Camera className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Take high-quality photos using your webcam
            </p>
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <Palette className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Customize your snapshots with backgrounds, emojis, and text
            </p>
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <Sparkles className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Automatically remove and replace backgrounds for a creative twist
            </p>
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <Save className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Download your photo or save it to the cloud (for logged-in users)
            </p>
          </div>
          <p className="py-2">
            Logged-in users get access to extra features like secure image
            saving, gallery management, and cloud storage integration.
          </p>
        </section>
        <section className="text-[#2E2F2D] w-full p-8 border border-[#cdc2e7] rounded-2xl h-full">
          <h3 className="font-semibold text-2xl">Privacy</h3>
          <p className="py-2">
            We value your privacy. Here's how we handle your data:
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <ImageUp className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Guest users' photos are never uploaded — downloads happen locally
              in your browser.
            </p>
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <Cloud className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              Logged-in users choose when to upload their images, and these are
              stored securely in the cloud.
            </p>
            <p className="font-medium flex gap-2">
              <span className="flex-shrink-0 w-6">
                <ShieldUser className="w-5 h-5 text-[#8450DC]" />
              </span>{" "}
              No personal data is shared with third parties, and all
              communication is encrypted for your safety.
            </p>
          </div>
          <p className="py-2"> You're in control of your content — always.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
