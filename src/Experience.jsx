import { useState } from "react";
import {
  Environment,
  useMatcapTexture,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import Camera from "./components/utils/Camera.jsx";

export default function Experience() {
  // Haka building
  const hakaBuilding = useGLTF("./models/haka-building/building.glb");
  const bakedHakaBuildingTexture = useTexture(
    "./models/haka-building/baked.jpg"
  );
  bakedHakaBuildingTexture.flipY = false;

  // Works - Toshi
  const worksToshi = useGLTF("./models/works-toshi/worksToshi.glb");
  const bakedWorksTE_Texture = useTexture(
    "./models/works-toshi/bakedWorksTE.jpg"
  );
  bakedWorksTE_Texture.flipY = false;

  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <axesHelper />

      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />

      <Camera />

      <Environment background preset="night" />

      <mesh
        geometry={hakaBuilding.nodes.hakaBuilding.geometry}
        scale={0.5}
        position={[0, -5, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
      >
        <meshBasicMaterial map={bakedHakaBuildingTexture} />
      </mesh>

      <mesh
        geometry={worksToshi.nodes.bakedWorksToshi.geometry}
        scale={0.5}
        position={[-10, -5, 5]}
        rotation={[0, -Math.PI * 0.5, 0]}
      >
        <meshBasicMaterial map={bakedWorksTE_Texture} />
      </mesh>
    </>
  );
}
