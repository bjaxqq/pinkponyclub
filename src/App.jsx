import { Canvas } from '@react-three/fiber'
import Environment from './Environment'
import ThirdPersonController from './ThirdPersonController'
import Overlay from './Overlay'

export default function App() {
  return (
    <div className="scene-container">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 5, -10]
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment />
        <ThirdPersonController />
      </Canvas>

      {/* UI Overlay */}
      <Overlay />
    </div>
  )
}