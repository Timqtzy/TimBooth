import React from "react";
import Navbar from "../component/Navbar";

const About = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-2 left-0 right-0 flex justify-center px-4 mb-14">
        <section className="w-full max-w-screen-lg">
          <Navbar />
        </section>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center gap-6  text-justify sm:text-text-left leading-loose px-4">
        <section className="text-[#2E2F2D] w-full max-w-screen-lg p-4 border border-slate-300 rounded-2xl">
          <h3 className="font-bold text-xl">Features</h3>
          <p>
            Our photo booth website lets you capture, customize, and download
            fun, memorable photos with ease. Whether you're logged in or just
            visiting, you can:
          </p>
          <p className="font-medium">
            📸 Take high-quality photos using your webcam
          </p>
          <p className="font-medium">
            🎨 Customize your snapshots with backgrounds, emojis, and text
          </p>
          <p className="font-medium">
            ✨ Automatically remove and replace backgrounds for a creative twist
          </p>
          <p className="font-medium">
            💾 Download your photo or save it to the cloud (for logged-in users)
          </p>
          <p>
            Logged-in users get access to extra features like secure image
            saving, gallery management, and cloud storage integration.
          </p>
        </section>
        <section className="text-[#2E2F2D] w-full max-w-screen-lg p-4 border border-slate-300 rounded-2xl mb-14">
          <h3 className="font-semibold text-xl">Privacy</h3>
          <p>We value your privacy. Here's how we handle your data:</p>
          <p>
            Guest users' photos are never uploaded — downloads happen locally in
            your browser.
          </p>
          <p className="font-medium">
            🎨 Logged-in users choose when to upload their images, and these are
            stored securely in the cloud.
          </p>
          <p className="font-medium">
            ✨ Automatically remove and replace backgrounds for a creative twist
          </p>
          <p>
            No personal data is shared with third parties, and all communication
            is encrypted for your safety.{" "}
          </p>
          <p>You're in control of your content — always.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
