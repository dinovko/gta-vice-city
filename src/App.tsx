import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Sky, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { Scene } from './components/Scene'
import { HUD } from './components/HUD'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -20, 0]}>
            <Scene />
          </Physics>
          <Sky
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0.6}
            azimuth={0.25}
          />
          <Stars radius={300} depth={60} count={1000} factor={4} fade />
          <fog attach="fog" args={['#ff8866', 80, 200]} />
          <ambientLight intensity={0.4} color="#ffaa77" />
          <directionalLight
            castShadow
            position={[50, 50, 25]}
            intensity={1.5}
            color="#ffcc88"
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={200}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <pointLight position={[-20, 5, -10]} intensity={2} color="#ff44aa" distance={40} />
          <pointLight position={[20, 5, 10]} intensity={2} color="#44aaff" distance={40} />
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  )
}
