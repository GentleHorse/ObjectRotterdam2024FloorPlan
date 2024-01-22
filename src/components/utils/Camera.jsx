import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function Camera() {
  const { camera } = useThree();
  const { PosX, PosY, PosZ } = useControls("camera", {
    PosX: { value: 0, min: -50, max: 50, step: 0.01 },
    PosY: { value: 1, min: -50, max: 50, step: 0.01 },
    PosZ: { value: 10, min: -50, max: 50, step: 0.01 },
  });

  useEffect(() => {
    camera.position.x = PosX;
    camera.position.y = PosY;
    camera.position.z = PosZ;
  }, [PosX, PosY, PosZ]);

  return null;
}
