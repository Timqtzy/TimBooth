import Webcam from "react-webcam";
import { useRef, useState } from "react";

const WebCamera = () => {
  const webcameraRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  return (
    <div className="container">
      <Webcam height={600} width={600} ref={webcameraRef} />
    </div>
  );
};

export default WebCamera;
