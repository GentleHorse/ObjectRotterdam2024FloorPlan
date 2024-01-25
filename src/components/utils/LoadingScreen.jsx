import { useProgress, Html } from "@react-three/drei";

export default function LoadingScreen() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }