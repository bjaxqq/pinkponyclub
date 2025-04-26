import { Canvas } from "@react-three/fiber"
import { Sky, Stats } from "@react-three/drei"
import ThirdPersonController from "./ThirdPersonController"
import Environment from "./Environment"
import "./App.css"

function App() {
  return (
    <div className="scene-container">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
        />
        <ThirdPersonController />
        <Environment />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
