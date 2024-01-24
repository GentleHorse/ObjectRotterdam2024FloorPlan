import { PivotControls } from "@react-three/drei";

export default function SelectMoveObject({ children, isPivot }) {
    return (
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={2}
        axisColors={["#9d8fea", "#ff4dc7", "#9ee57a"]}
        scale={50}
        fixed={true}
        visible={isPivot}
      >
        {children}
      </PivotControls>
    );
}
