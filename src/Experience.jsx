import { Environment, OrbitControls, Text } from "@react-three/drei";

import HakaBuilding from "./components/hakaBuilding/HakaBuilding.jsx";
import WorksToshi from "./components/individualWorks/WorksToshi.jsx";
import WorksSatomi from "./components/individualWorks/WorksSatomi.jsx";
import WorksJeroen from "./components/individualWorks/WorksJeroen.jsx";
import Marina from "./components/marina/Marina.jsx";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      {/* <axesHelper args={[5]} /> */}

      <directionalLight position={[4, 4, 1]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Environment background preset="night" />

      <group position={[0, -5, 0]} scale={1}>
        <HakaBuilding />

        <WorksToshi />

        <WorksSatomi />

        <WorksJeroen />

        <Marina />

        <SpaceDimension5mX6m />
      </group>
    </>
  );
}

export function SpaceDimension5mX6m() {
  return (
    <>
      <mesh
        scale={[60, 50, 1]}
        position={[0, 0.1, 0]}
        rotation={[Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial wireframe color="salmon" />
      </mesh>

      <Text
        fontSize={2.5}
        color="salmon"
        position={[0, 0.2, 23]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        maxWidth={2}
        textAlign="center"
        >
          6m
        </Text>
        <Text
        fontSize={2.5}
        color="salmon"
        position={[-27, 0.2, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        maxWidth={2}
        textAlign="center"
        >
          5m
        </Text>
    </>
  );
}
