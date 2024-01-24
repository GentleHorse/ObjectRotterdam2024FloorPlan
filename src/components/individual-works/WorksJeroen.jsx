import { useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import SelectMoveObject from "../utils/SelectMoveObject.jsx";

export default function WorksJeroen() {
  const [isContorl, setIsControl] = useState({
    piece01: false,
    piece02: false,
    piece03a: false,
    piece03b: false,
    piece04: false,
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
      <SelectMoveObject isPivot={isContorl.piece01}>
        <mesh
          geometry={piece01.nodes.exportJBPiece01.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[15, 12.5, 28]}
          onClick={() => toggleHandler("piece01")}
        >
          <meshBasicMaterial
            map={bakedPiece01_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </SelectMoveObject>

      <SelectMoveObject isPivot={isContorl.piece02}>
        <mesh
          geometry={piece02.nodes.exportJBPiece02.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[10, 12.5, 20]}
          onClick={() => toggleHandler("piece02")}
        >
          <meshBasicMaterial
            map={bakedPiece02_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </SelectMoveObject>

      <SelectMoveObject isPivot={isContorl.piece03a}>
        <mesh
          geometry={piece03a.nodes.exportJBPiece03a.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[15, 12.5, -5]}
          onClick={() => toggleHandler("piece03a")}
        >
          <meshBasicMaterial map={bakedPiece03a_Texture} />
        </mesh>
      </SelectMoveObject>

      <SelectMoveObject isPivot={isContorl.piece03b}>
        <mesh
          geometry={piece03b.nodes.exportJBPiece03b.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[70, 12.5, -5]}
          onClick={() => toggleHandler("piece03b")}
        >
          <meshBasicMaterial
            map={bakedPiece03b_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </SelectMoveObject>

      <SelectMoveObject isPivot={isContorl.piece04}>
        <mesh
          geometry={piece04.nodes.exportJBPiece04.geometry}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[25, 12.5, -20]}
          onClick={() => toggleHandler("piece04")}
        >
          <meshBasicMaterial
            map={bakedPiece04_Texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </SelectMoveObject>
    </>
  );
}
