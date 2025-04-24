import Webcamera from "../component/WebCamera";
import Navbar from "../component/Navbar";
import "../App.css";

const Booth = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-2 left-0 right-0 flex justify-center px-4">
        <section className="w-full max-w-screen-lg">
          <Navbar />
        </section>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <section className="flex flex-col justify-center items-center px-4">
          <Webcamera />
        </section>
      </div>
    </div>
  );
};

export default Booth;
