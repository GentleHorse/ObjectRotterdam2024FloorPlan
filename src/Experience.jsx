import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Camera from "./components/utils/Camera.jsx";
import HakaBuilding from "./components/hakaBuilding/HakaBuilding.jsx";
import WorksToshi from "./components/individualWorks/WorksToshi.jsx";
import WorksSatomi from "./components/individualWorks/WorksSatomi.jsx";
import WorksJeroen from "./components/individualWorks/WorksJeroen.jsx";
import Marina from "./components/marina/Marina.jsx";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      {/* <Perf position="top-left" /> */}
      {/* <axesHelper args={[18]} /> */}
      {/* <Camera /> */}

      <directionalLight position={[4, 4, 1]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Environment background preset="night" />

      <group position={[0, -5, 0]} scale={1}>
        <HakaBuilding />

        <WorksToshi />

        <WorksSatomi />

        <WorksJeroen />

        <Marina />
      </group>
    </>
  );
}
