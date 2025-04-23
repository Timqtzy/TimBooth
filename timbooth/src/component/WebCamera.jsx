import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

const WebCamera = () => {
  const webcameraRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcameraRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcameraRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={300} width={300} ref={webcameraRef} />
      )}
      <div className="btn-container">
        <button
          className="text-white bg-black p-3 rounded-md"
          onClick={capture}
        >
          Capture photo
        </button>
      </div>
    </div>
  );
};

export default WebCamera;
