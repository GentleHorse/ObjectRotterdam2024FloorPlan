import { useState } from "react";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
  Clone,
} from "@react-three/drei";
import * as THREE from "three";
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

  // Works - Jeroen
  const piece01 = useGLTF("./models/works-jeroen/exportJBPiece01.glb");
  const bakedPiece01_Texture = useTexture(
    "./models/works-jeroen/bakedWorksJBPiece01.jpg"
  );
  bakedPiece01_Texture.flipY = false;

  const piece02 = useGLTF("./models/works-jeroen/exportJBPiece02.glb");
  const bakedPiece02_Texture = useTexture(
    "./models/works-jeroen/bakedWorksJBPiece02.jpg"
  );
  bakedPiece02_Texture.flipY = false;

  const piece03a = useGLTF("./models/works-jeroen/exportJBPiece03a.glb");
  const bakedPiece03a_Texture = useTexture(
    "./models/works-jeroen/bakedWorksJBPiece03a.jpg"
  );
  bakedPiece03a_Texture.flipY = false;

  const piece03b = useGLTF("./models/works-jeroen/exportJBPiece03b.glb");
  const bakedPiece03b_Texture = useTexture(
    "./models/works-jeroen/bakedWorksJBPiece03b.jpg"
  );
  bakedPiece03b_Texture.flipY = false;

  const piece04 = useGLTF("./models/works-jeroen/exportJBPiece04.glb");
  const bakedPiece04_Texture = useTexture(
    "./models/works-jeroen/bakedWorksJBPiece04.jpg"
  );
  bakedPiece04_Texture.flipY = false;

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
          position={[-18, 0, 12]}
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

        <mesh
          geometry={piece01.nodes.exportJBPiece01.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[15, 12.5, 28]}
        >
          <meshBasicMaterial
            map={bakedPiece01_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={piece02.nodes.exportJBPiece02.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[10, 12.5, 20]}
        >
          <meshBasicMaterial
            map={bakedPiece02_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={piece03a.nodes.exportJBPiece03a.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[15, 12.5, -5]}
        >
          <meshBasicMaterial map={bakedPiece03a_Texture} />
        </mesh>

        <mesh
          geometry={piece03b.nodes.exportJBPiece03b.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[70, 12.5, -5]}
        >
          <meshBasicMaterial
            map={bakedPiece03b_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={piece04.nodes.exportJBPiece04.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[25, 12.5, -20]}
        >
          <meshBasicMaterial
            map={bakedPiece04_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}
