import { useState } from "react";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
  Clone,
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

  // Works - Satomi
  const inflatableStool01 = useGLTF(
    "./models/works-satomi/inflatableStool01.glb"
  );
  const inflatableStool02 = useGLTF(
    "./models/works-satomi/inflatableStool02.glb"
  );
  const edgeColorStool01 = useGLTF(
    "./models/works-satomi/edgeColorStool01.glb"
  );
  const edgeColorStool02 = useGLTF(
    "./models/works-satomi/edgeColorStool02.glb"
  );
  const wallObject = useGLTF("./models/works-satomi/wallObject.glb");

  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <axesHelper args={[30]} />

      <directionalLight position={[4, 4, 1]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Camera />

      <Environment background preset="night" />

      <group position={[0, -5, 0]} scale={1}>
        <mesh
          geometry={hakaBuilding.nodes.hakaBuilding.geometry}
          position={[0, 0, 0]}
          rotation={[0, Math.PI * 0.5, 0]}
        >
          <meshBasicMaterial map={bakedHakaBuildingTexture} />
        </mesh>

        <mesh
          geometry={worksToshi.nodes.bakedWorksToshi.geometry}
          position={[-18, 0, 15]}
          rotation={[0, -Math.PI * 0.5, 0]}
        >
          <meshBasicMaterial map={bakedWorksTE_Texture} />
        </mesh>

        <group position={[0, 0, 0]}>
          <primitive object={inflatableStool01.scene} position={[2, 0, -20]} />

          <primitive object={inflatableStool02.scene} position={[-4, 0, -4]} />

          <primitive object={edgeColorStool01.scene} position={[-12, 0, -16]} />

          <primitive object={edgeColorStool02.scene} position={[-20, 0, -8]} />

          <Clone
            object={wallObject.scene}
            rotation={[0, Math.PI, 0]}
            position={[-30, 18.5, -1]}
          />

          <Clone
            object={wallObject.scene}
            rotation={[0, Math.PI, 0]}
            position={[-30, 14, 0.1]}
          />

          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-33, 20, -4.75]}
          />

          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-36, 17, -4.75]}
          />

          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-34, 12.5, -4.75]}
          />
        </group>
      </group>
    </>
  );
}
