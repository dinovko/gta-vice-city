import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useControls } from './useControls'

const WALK_SPEED = 6
const RUN_SPEED = 12
const JUMP_FORCE = 10
const CAMERA_DISTANCE = 6
const CAMERA_HEIGHT = 2.5

export function Player() {
  const rb = useRef<RapierRigidBody>(null)
  const bodyMesh = useRef<THREE.Group>(null)
  const controls = useControls()
  const { camera } = useThree()

  const [canJump, setCanJump] = useState(true)
  const cameraYaw = useRef(0)
  const cameraPitch = useRef(0.3)
  const wasJumping = useRef(false)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const onClick = () => { canvas.requestPointerLock() }
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return
      cameraYaw.current -= e.movementX * 0.003
      cameraPitch.current = Math.max(0.05, Math.min(1.2, cameraPitch.current + e.movementY * 0.003))
    }
    canvas.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      canvas.removeEventListener('click', onClick)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useFrame((_, delta) => {
    if (!rb.current) return
    const vel = rb.current.linvel()
    const pos = rb.current.translation()
    const onGround = Math.abs(vel.y) < 0.8 && pos.y < 2.5

    if (onGround && wasJumping.current) {
      setCanJump(true)
      wasJumping.current = false
    }

    const { forward, backward, left, right, jump, sprint } = controls.current
    const speed = sprint ? RUN_SPEED : WALK_SPEED
    const moving = forward || backward || left || right

    const camDir = new THREE.Vector3(Math.sin(cameraYaw.current), 0, Math.cos(cameraYaw.current))
    const camRight = new THREE.Vector3(Math.cos(cameraYaw.current), 0, -Math.sin(cameraYaw.current))
    const moveDir = new THREE.Vector3()
    if (forward)  moveDir.addScaledVector(camDir, -1)
    if (backward) moveDir.addScaledVector(camDir,  1)
    if (left)     moveDir.addScaledVector(camRight, -1)
    if (right)    moveDir.addScaledVector(camRight,  1)
    if (moveDir.length() > 0) moveDir.normalize()

    rb.current.setLinvel({ x: moveDir.x * speed, y: vel.y, z: moveDir.z * speed }, true)

    if (jump && canJump && onGround) {
      rb.current.setLinvel({ x: vel.x, y: JUMP_FORCE, z: vel.z }, true)
      setCanJump(false)
      wasJumping.current = true
    }

    if (bodyMesh.current && moving) {
      const targetAngle = Math.atan2(moveDir.x, moveDir.z)
      const current = bodyMesh.current.rotation.y
      const diff = ((targetAngle - current + Math.PI) % (2 * Math.PI)) - Math.PI
      bodyMesh.current.rotation.y += diff * Math.min(delta * 12, 1)
    }

    const camX = pos.x + Math.sin(cameraYaw.current) * CAMERA_DISTANCE * Math.cos(cameraPitch.current)
    const camY = pos.y + CAMERA_HEIGHT + Math.sin(cameraPitch.current) * CAMERA_DISTANCE
    const camZ = pos.z + Math.cos(cameraYaw.current) * CAMERA_DISTANCE * Math.cos(cameraPitch.current)
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), Math.min(delta * 10, 1))
    camera.lookAt(pos.x, pos.y + 1.2, pos.z)
  })

  return (
    <RigidBody
      ref={rb}
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
      friction={1}
      colliders={false}
      mass={80}
    >
      <CapsuleCollider args={[0.5, 0.4]} />
      <group ref={bodyMesh}>
        <mesh castShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.25]} />
          <meshStandardMaterial color="#cc3311" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, 0.95, 0]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color="#f5c89a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.97, 0.18]}>
          <boxGeometry args={[0.28, 0.08, 0.02]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh castShadow position={[-0.32, 0.25, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
          <meshStandardMaterial color="#cc3311" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0.32, 0.25, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
          <meshStandardMaterial color="#cc3311" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[-0.14, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
          <meshStandardMaterial color="#222255" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0.14, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
          <meshStandardMaterial color="#222255" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[-0.14, -0.67, 0.05]}>
          <boxGeometry args={[0.19, 0.1, 0.28]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.14, -0.67, 0.05]}>
          <boxGeometry args={[0.19, 0.1, 0.28]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      </group>
    </RigidBody>
  )
}
