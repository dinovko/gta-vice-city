import { useEffect, useRef } from 'react'

export interface Controls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  sprint: boolean
}

export function useControls() {
  const keys = useRef<Controls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = true; break
        case 'KeyS': case 'ArrowDown':  keys.current.backward = true; break
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = true; break
        case 'KeyD': case 'ArrowRight': keys.current.right    = true; break
        case 'Space':                   keys.current.jump     = true; break
        case 'ShiftLeft': case 'ShiftRight': keys.current.sprint = true; break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = false; break
        case 'KeyS': case 'ArrowDown':  keys.current.backward = false; break
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = false; break
        case 'KeyD': case 'ArrowRight': keys.current.right    = false; break
        case 'Space':                   keys.current.jump     = false; break
        case 'ShiftLeft': case 'ShiftRight': keys.current.sprint = false; break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return keys
}
