import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense } from "react";
import { Center, Loader } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 1, 60],
      }}
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
    <Loader
      barStyles={{ width: "30vw" }}
      dataInterpolation={(p) =>
        `OBJECT Rotterdam 2024 floor planing for Jeroen, Satomi, Toshi loading ${p.toFixed(
          2
        )}%`
      }
    />
  </>
);
