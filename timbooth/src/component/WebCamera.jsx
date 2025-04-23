import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

const WebCamera = () => {
  const webcameraRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcameraRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcameraRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={300}
          width={300}
          ref={webcameraRef}
          screenshotFormat="image/png"
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button
            className="text-white bg-black p-3 rounded-md"
            onClick={retake}
          >
            Retake photo
          </button>
        ) : (
          <button
            className="text-white bg-black p-3 rounded-md"
            onClick={capture}
          >
            Capture photo
          </button>
        )}
      </div>
      {imgSrc && (
        <button className="text-white bg-black p-3 rounded-md">
          <a href={imgSrc} download="photo.jpg">
            Download photo
          </a>
        </button>
      )}
    </div>
  );
};

export default WebCamera;
