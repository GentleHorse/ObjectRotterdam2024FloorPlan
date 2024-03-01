import { useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import SelectMoveObject from "../utils/SelectMoveObject.jsx";

export default function WorksToshi() {
  const worksToshi = useGLTF("./models/works-toshi/worksToshi.glb");
  const bakedWorksTE_Texture = useTexture(
    "./models/works-toshi/bakedWorksTE.jpg"
  );
  bakedWorksTE_Texture.flipY = false;

  const [isContorl, setIsControl] = useState(false);

  const toggleHandler = () => {
    setIsControl((prevIsControl) => !prevIsControl);
  };

  return (
    <SelectMoveObject isPivot={isContorl} anchor={[-0.3, 0, -0.3]}>
      <mesh
        geometry={worksToshi.nodes.bakedWorksToshi.geometry}
        position={[-18, 0, 12]}
        rotation={[0, -Math.PI * 0.5, 0]}
        onClick={(e) => (toggleHandler(), e.stopPropagation())}
      >
        <meshBasicMaterial map={bakedWorksTE_Texture} />
      </mesh>
    </SelectMoveObject>
  );
}
