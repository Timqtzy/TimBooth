import { useState, useRef, useEffect } from "react";

const PhotoBooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const finalCanvasRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showStyling, setShowStyling] = useState(false);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#ffffff");
  const [customText, setCustomText] = useState("");
  const [addDate, setAddDate] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");

  const [settings, setSettings] = useState({
    totalPhotos: 3,
    delay: 3,
    facingMode: "user",
  });

  useEffect(() => {
    const getStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: settings.facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };
    getStream();
  }, [settings.facingMode]);

  const capturePhoto = () => {
    if (photos.length >= settings.totalPhotos) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Container aspect ratio (4:3)
    const containerAspect = 4 / 3;
    const videoIntrinsicAspect = video.videoWidth / video.videoHeight;

    let sourceX, sourceY, sourceWidth, sourceHeight;

    if (videoIntrinsicAspect > containerAspect) {
      // Video is wider than container: crop width
      sourceHeight = video.videoHeight;
      sourceWidth = sourceHeight * containerAspect;
      sourceX = (video.videoWidth - sourceWidth) / 2;
      sourceY = 0;
    } else {
      // Video is taller than container: crop height
      sourceWidth = video.videoWidth;
      sourceHeight = sourceWidth / containerAspect;
      sourceX = 0;
      sourceY = (video.videoHeight - sourceHeight) / 2;
    }

    // Get displayed dimensions of the video element
    const displayWidth = video.clientWidth;
    const displayHeight = video.clientHeight;

    // Set canvas dimensions to match displayed size
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const ctx = canvas.getContext("2d");
    ctx.save();

    if (settings.facingMode === "user") {
      // Flip horizontally for front camera
      ctx.scale(-1, 1);
      ctx.drawImage(
        video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        -displayWidth,
        0,
        displayWidth,
        displayHeight
      );
    } else {
      ctx.drawImage(
        video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        displayWidth,
        displayHeight
      );
    }

    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    setPhotos((prev) => [...prev, dataUrl]);
  };

  const AutoStartCapture = async () => {
    setPhotos([]);
    setIsCapturing(true);

    for (let i = 0; i < settings.totalPhotos; i++) {
      for (let sec = settings.delay; sec > 0; sec--) {
        setCountdown(sec);
        await new Promise((res) => setTimeout(res, 1000));
      }

      setCountdown(null);
      capturePhoto();
      await new Promise((res) => setTimeout(res, 1000));
    }

    setIsCapturing(false);
  };

  const ManualStartCapture = async () => {
    if (photos.length >= settings.totalPhotos) return;

    setIsCapturing(true);
    capturePhoto();
    setIsCapturing(false);
  };

  const handleDownload = () => {
    const canvas = finalCanvasRef.current;
    const link = document.createElement("a");
    link.download = "photobooth.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const drawFinalCanvas = () => {
    const canvas = finalCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // Final canvas configuration
    const targetWidth = 320;
    const padding = 20;
    const gap = 10;
    const textAreaHeight = 60;

    // Calculate photo dimensions based on 4:3 aspect ratio
    const photoDisplayWidth = targetWidth - padding * 2;
    const photoDisplayHeight = (photoDisplayWidth * 3) / 4; // Maintain 4:3 aspect ratio

    // Calculate total canvas height
    const totalPhotosHeight =
      photoDisplayHeight * photos.length + gap * (photos.length - 1);
    canvas.width = targetWidth;
    canvas.height = padding * 2 + totalPhotosHeight + textAreaHeight;

    // Add this at the start of drawFinalCanvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = targetWidth * dpr;
    canvas.height = (padding * 2 + totalPhotosHeight + textAreaHeight) * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const images = photos.map(
      (photo) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => resolve(img);
        })
    );

    Promise.all(images).then((loadedImages) => {
      loadedImages.forEach((img, idx) => {
        const y = padding + idx * (photoDisplayHeight + gap);

        // Create temporary canvas to handle image scaling
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        // Set temp canvas to original captured dimensions
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempCtx.drawImage(img, 0, 0);

        ctx.save();
        ctx.filter = selectedFilter;
        // Draw scaled image maintaining aspect ratio
        ctx.drawImage(
          tempCanvas,
          0,
          0,
          img.width,
          img.height, // Source dimensions
          padding,
          y, // Destination position
          photoDisplayWidth,
          photoDisplayHeight // Destination dimensions
        );
        ctx.restore();
      });

      if (customText || addDate) {
        // Text rendering remains the same
        ctx.fillStyle = textColor;
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
      }

      if (customText) {
        ctx.fillText(
          customText,
          targetWidth / 2,
          canvas.height - textAreaHeight + 25
        );
      }
      if (addDate) {
        const date = new Date().toLocaleDateString();
        ctx.fillText(
          date,
          targetWidth / 2,
          canvas.height - textAreaHeight + 45
        );
      }
    });
  };

  useEffect(() => {
    if (showStyling && photos.length > 0) {
      drawFinalCanvas();
    }
  }, [
    showStyling,
    photos,
    customText,
    addDate,
    bgColor,
    selectedFilter,
    textColor,
  ]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center md:items-start gap-4 px-4 text-black">
      {!showStyling && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full aspect-[4/3] max-w-[700px] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`absolute w-full h-full border border-muted rounded object-cover ${
                settings.facingMode === "user" ? "scale-x-[-1]" : ""
              }`}
            />
            {countdown && (
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-red-600">
                {countdown}
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <label>
              Photos:
              <select
                value={settings.totalPhotos}
                onChange={(e) =>
                  setSettings({ ...settings, totalPhotos: +e.target.value })
                }
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Delay:
              <select
                value={settings.delay}
                onChange={(e) =>
                  setSettings({ ...settings, delay: +e.target.value })
                }
              >
                {[3, 5, 7, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}s
                  </option>
                ))}
              </select>
            </label>

            <label>
              Camera:
              <select
                value={settings.facingMode}
                onChange={(e) =>
                  setSettings({ ...settings, facingMode: e.target.value })
                }
              >
                <option value="user">Front</option>
                <option value="environment">Back</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              disabled={isCapturing || photos.length >= settings.totalPhotos}
              onClick={ManualStartCapture}
              className="bg-black text-white px-3 py-2 rounded disabled:opacity-50"
            >
              Capture ({photos.length}/{settings.totalPhotos})
            </button>
            <button
              disabled={isCapturing}
              onClick={AutoStartCapture}
              className="bg-white text-black border border-black px-3 py-2 rounded disabled:opacity-50"
            >
              Auto Capture
            </button>
          </div>
        </div>
      )}

      {photos.length > 0 && !showStyling && (
        <div className="flex flex-col items-center">
          <div className="mt-4 border rounded-md shadow bg-white w-[300px] h-auto p-2 flex flex-col gap-2">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Photo ${idx + 1}`}
                className="w-full object-cover rounded"
              />
            ))}
          </div>
          {photos.length === settings.totalPhotos && (
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded"
              onClick={() => setShowStyling(true)}
            >
              Next
            </button>
          )}
        </div>
      )}

      {showStyling && (
        <div className="border rounded shadow p-2 bg-white">
          <canvas ref={finalCanvasRef} className="w-full h-auto" />
        </div>
      )}

      {showStyling && (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <button
            onClick={() => {
              setShowStyling(false);
              setPhotos([]);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>

          <input
            type="text"
            placeholder="Add text (optional)"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="border p-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={addDate}
              onChange={(e) => setAddDate(e.target.checked)}
            />
            Add current date
          </label>

          <label className="flex flex-col gap-1">
            Background color:
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full"
            />
          </label>

          <label className="flex flex-col gap-1">
            Text color:
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-full"
            />
          </label>

          <label className="flex flex-col gap-1">
            Photo Filter:
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="none">None</option>
              <option value="grayscale(100%)">Grayscale</option>
              <option value="sepia(100%)">Sepia</option>
              <option value="saturate(200%)">Saturated</option>
              <option value="contrast(200%)">High Contrast</option>
            </select>
          </label>

          <button
            onClick={handleDownload}
            className="bg-black text-white px-4 py-2 rounded mt-2"
          >
            Download Photobooth
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoBooth;
