import { OrbitControls, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useGLTF } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/haka-building/building.glb");
  const bakedHakaBuildingTexture = useTexture("./model/haka-building/baked.jpg");
  bakedHakaBuildingTexture.flipY = false;

  return (
    <>
      <OrbitControls makeDefault />

      <Perf position="top-left" />

      <mesh geometry={nodes.hakaBuilding.geometry} rotation={[0, Math.PI * 0.5, 0]}>
        <meshBasicMaterial map={bakedHakaBuildingTexture} />
      </mesh>
    </>
  );
}
