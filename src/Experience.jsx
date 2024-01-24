import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Camera from "./components/utils/Camera.jsx";
import HakaBuilding from "./components/haka-building/HakaBuilding.jsx";
import WorksToshi from "./components/individual-works/worksToshi.jsx";
import WorksSatomi from "./components/individual-works/WorksSatomi.jsx";
import WorksJeroen from "./components/individual-works/WorksJeroen.jsx";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      {/* <Perf position="top-left" /> */}
      {/* <axesHelper args={[30]} /> */}
      {/* <Camera /> */}

      <directionalLight position={[4, 4, 1]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Environment background preset="night" />

      <group position={[0, -5, 0]} scale={1}>
        <HakaBuilding />

        <WorksToshi />

        <WorksSatomi />

        <WorksJeroen />
      </group>
    </>
  );
}
