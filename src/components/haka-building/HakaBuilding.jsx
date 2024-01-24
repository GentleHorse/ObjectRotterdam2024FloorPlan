import { useGLTF, useTexture } from "@react-three/drei";

export default function HakaBuilding() {
  const hakaBuilding = useGLTF("./models/haka-building/building.glb");
  const bakedHakaBuildingTexture = useTexture(
    "./models/haka-building/baked.jpg"
  );
  bakedHakaBuildingTexture.flipY = false;

  return (
    <>
      <mesh
        geometry={hakaBuilding.nodes.hakaBuilding.geometry}
        position={[0, 0, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
      >
        <meshBasicMaterial map={bakedHakaBuildingTexture} />
      </mesh>
    </>
  );
}
