import { PivotControls } from "@react-three/drei";

export default function SelectMoveObject({
  children,
  isPivot,
  anchor = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 100,
}) {
  return (
    <PivotControls
      anchor={anchor}
      rotation={rotation}
      depthTest={false}
      lineWidth={2}
      axisColors={["#D0104C", "#2D6D4B", "#0B346E"]}
      scale={scale}
      fixed={true}
      visible={isPivot}
    >
      {children}
    </PivotControls>
  );
}
