import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense, useState, useEffect } from "react";
import { Loader, useProgress } from "@react-three/drei";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import CameraIcon from "./components/cameraIcon/CameraIcon.jsx";
import HowToUseModal from "./components/howToUseModal/HowToUseModal.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Custom Loading Screen */}
      {!isSceneLoaded && (
        <div className="loading-screen">
          <div className="loading-content">
            <h2>Loading Floor Plan...</h2>
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}

      <Loader 
        containerStyles={{ background: '#000000' }}
        innerStyles={{ background: '#ffffff' }}
        barStyles={{ background: '#ffffff' }}
        dataStyles={{ color: '#ffffff' }}
      />

      {isSceneLoaded && (
        <>
          <HowToUseModal isOpen={isModalOpen} onClose={handleCloseModal} />
          <Header />
          <CameraIcon />
          <Footer />
        </>
      )}

      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 1, 60],
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Experience />
          <SceneLoadedTracker onLoaded={() => setIsSceneLoaded(true)} />
        </Suspense>
      </Canvas>
    </>
  );
}

function SceneLoadedTracker({ onLoaded }) {
  const { progress } = useProgress();

  useEffect(() => {
    // Call onLoaded when progress reaches 100%
    if (progress === 100) {
      const timer = setTimeout(() => {
        onLoaded();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [progress, onLoaded]);

  return null;
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
