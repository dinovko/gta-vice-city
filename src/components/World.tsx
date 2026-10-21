import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function NeonSign({ position, color }: { position: [number,number,number], color: string }) {
  const light = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (light.current) light.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 3) * 0.3
  })
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2.5, 0.6, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <pointLight ref={light} color={color} intensity={1.5} distance={12} />
    </group>
  )
}

function Building({ pos, size, color }: { pos:[number,number,number], size:[number,number,number], color:string }) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh castShadow receiveShadow position={[pos[0], pos[1]+size[1]/2, pos[2]]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
    </RigidBody>
  )
}

function Palm({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow position={[0, 3, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 6, 8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.9} />
        </mesh>
      </RigidBody>
      {[0,60,120,180,240,300].map((angle, i) => (
        <mesh key={i} castShadow
          position={[Math.cos((angle*Math.PI)/180)*1.5, 6.2, Math.sin((angle*Math.PI)/180)*1.5]}
          rotation={[0.4, (angle*Math.PI)/180, -0.3]}>
          <planeGeometry args={[3, 0.8]} />
          <meshStandardMaterial color="#1a8c2a" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function StreetLamp({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow position={[0, 4, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 8, 6]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.8, 7.8, 0]}>
          <boxGeometry args={[1.6, 0.3, 0.3]} />
          <meshStandardMaterial color="#666" metalness={0.7} />
        </mesh>
        <mesh position={[1.6, 7.65, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
        </mesh>
      </RigidBody>
      <pointLight position={[1.6, 7.65, 0]} color="#ffee88" intensity={2} distance={20} />
    </group>
  )
}

export function World() {
  return (
    <>
      <RigidBody type="fixed" colliders="cuboid" friction={1}>
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[120, 120]} />
          <meshStandardMaterial color="#333333" roughness={0.9} />
        </mesh>
        <mesh receiveShadow position={[-18, 0.05, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[6, 100]} />
          <meshStandardMaterial color="#aaa99f" roughness={0.8} />
        </mesh>
        <mesh receiveShadow position={[18, 0.05, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[6, 100]} />
          <meshStandardMaterial color="#aaa99f" roughness={0.8} />
        </mesh>
      </RigidBody>

      {[-20,-14,-8,-2,4,10,16,22].map((z,i) => (
        <mesh key={i} position={[0, 0.02, z]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[0.4, 4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      ))}

      <Building pos={[-28, 0, -25]} size={[12, 18, 14]} color="#d4a574" />
      <Building pos={[-30, 0, 5]}   size={[10, 24, 12]} color="#c8a0d0" />
      <Building pos={[-28, 0, 28]}  size={[12, 15, 16]} color="#74b4d4" />
      <Building pos={[28, 0, -20]}  size={[12, 22, 14]} color="#e8c860" />
      <Building pos={[30, 0, 8]}    size={[10, 16, 12]} color="#e88060" />
      <Building pos={[28, 0, 30]}   size={[14, 20, 14]} color="#88c8a0" />

      <NeonSign position={[-21, 10, -25]} color="#ff44dd" />
      <NeonSign position={[21, 8, -20]}   color="#44ddff" />
      <NeonSign position={[-21, 14, 5]}   color="#ffdd44" />
      <NeonSign position={[21, 12, 8]}    color="#ff6644" />
      <NeonSign position={[-21, 9, 28]}   color="#44ff88" />

      <Palm position={[-14, 0, -30]} />
      <Palm position={[-14, 0, -15]} />
      <Palm position={[-14, 0, 0]}   />
      <Palm position={[-14, 0, 15]}  />
      <Palm position={[-14, 0, 30]}  />
      <Palm position={[14, 0, -25]}  />
      <Palm position={[14, 0, -10]}  />
      <Palm position={[14, 0, 5]}    />
      <Palm position={[14, 0, 20]}   />
      <Palm position={[14, 0, 35]}   />

      <StreetLamp position={[-14, 0, -22]} />
      <StreetLamp position={[-14, 0, 2]}   />
      <StreetLamp position={[-14, 0, 26]}  />
      <StreetLamp position={[14, 0, -18]}  />
      <StreetLamp position={[14, 0, 6]}    />
      <StreetLamp position={[14, 0, 30]}   />

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, -65]} visible={false}><boxGeometry args={[130, 20, 1]} /></mesh>
        <mesh position={[0, 5, 65]}  visible={false}><boxGeometry args={[130, 20, 1]} /></mesh>
        <mesh position={[-65, 5, 0]} visible={false}><boxGeometry args={[1, 20, 130]} /></mesh>
        <mesh position={[65, 5, 0]}  visible={false}><boxGeometry args={[1, 20, 130]} /></mesh>
      </RigidBody>

      <mesh position={[0, -0.5, 65]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[200, 80]} />
        <meshStandardMaterial color="#1155aa" roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  )
}
