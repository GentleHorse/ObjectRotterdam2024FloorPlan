import { useState } from "react";
import { useGLTF, Clone } from "@react-three/drei";

import SelectMoveObject from "../utils/SelectMoveObject.jsx";

export default function WorksSatomi() {
  const [isContorl, setIsControl] = useState({
    inflatableStool01: false,
    inflatableStool02: false,
    edgeColorStool01: false,
    edgeColorStool02: false,
    wallObject01: false,
    wallObject02: false,
    wallObject03: false,
    wallObject04: false,
    wallObject05: false,
  });

  const toggleHandler = (selector) => {
    setIsControl((prevIsControl) => {
      const newIsControl = { ...prevIsControl };

      for (const control in newIsControl) {
        if (control == selector) {
          if (newIsControl[selector] === false) {
            newIsControl[selector] = true;
          } else {
            newIsControl[selector] = false;
          }
        }
      }

      return newIsControl;
    });
  };

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
      <group position={[0, 0, 0]}>
        <SelectMoveObject isPivot={isContorl.inflatableStool01}>
          <primitive
            object={inflatableStool01.scene}
            position={[2, 0, -20]}
            onClick={(e) => (toggleHandler("inflatableStool01"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.inflatableStool02}>
          <primitive
            object={inflatableStool02.scene}
            position={[-4, 0, -4]}
            onClick={(e) => (toggleHandler("inflatableStool02"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.edgeColorStool01}>
          <primitive
            object={edgeColorStool01.scene}
            position={[-12, 0, -16]}
            onClick={(e) => (toggleHandler("edgeColorStool01"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.edgeColorStool02}>
          <primitive
            object={edgeColorStool02.scene}
            position={[-20, 0, -8]}
            onClick={(e) => (toggleHandler("edgeColorStool02"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.wallObject01}>
          <Clone
            object={wallObject.scene}
            rotation={[0, Math.PI, 0]}
            position={[-30, 18.5, -1]}
            onClick={(e) => (toggleHandler("wallObject01"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.wallObject02}>
          <Clone
            object={wallObject.scene}
            rotation={[0, Math.PI, 0]}
            position={[-30, 14, 0.1]}
            onClick={(e) => (toggleHandler("wallObject02"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.wallObject03}>
          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-33, 20, -4.75]}
            onClick={(e) => (toggleHandler("wallObject03"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.wallObject04}>
          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-36, 17, -4.75]}
            onClick={(e) => (toggleHandler("wallObject04"), e.stopPropagation())}
          />
        </SelectMoveObject>

        <SelectMoveObject isPivot={isContorl.wallObject05}>
          <Clone
            object={wallObject.scene}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[-34, 12.5, -4.75]}
            onClick={(e) => (toggleHandler("wallObject05"), e.stopPropagation())}
          />
        </SelectMoveObject>
      </group>
    </>
  );
}
