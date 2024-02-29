import { useState } from "react";
import { useGLTF } from "@react-three/drei";

import SelectMoveObject from "../utils/SelectMoveObject.jsx";

// apox. 180cm hight woman
export default function Marina() {
  const marina = useGLTF("./models/marina/Marina-1276.glb");

  const [isContorl, setIsControl] = useState(false);

  const toggleHandler = () => {
    setIsControl((prevIsControl) => !prevIsControl);
  };

  return (
    <SelectMoveObject isPivot={isContorl}>
      <primitive
        object={marina.scene}
        scale={5}
        position={[-20, 0, 40]}
        rotation={[0, Math.PI * 0.7, 0]}
        onClick={(e) => (toggleHandler(), e.stopPropagation())}
      />
    </SelectMoveObject>
  );
}
