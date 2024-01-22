import { OrbitControls, Sky, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useGLTF } from "@react-three/drei";

import Camera from "./components/utils/Camera.jsx";

export default function Experience() {
  const { nodes } = useGLTF("./model/haka-building/building.glb");
  const bakedHakaBuildingTexture = useTexture(
    "./model/haka-building/baked.jpg"
  );
  bakedHakaBuildingTexture.flipY = false;

  return (
    <>
      <OrbitControls makeDefault />

      <Perf position="top-left" />

      <axesHelper />

      <Sky
        sunPosition={[1, 2, 3]}
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
        azimuth={180}
      />
      
      <Camera />

      <mesh
        geometry={nodes.hakaBuilding.geometry}
        position={[0, -10, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
      >
        <meshBasicMaterial map={bakedHakaBuildingTexture} />
      </mesh>
    </>
  );
}
