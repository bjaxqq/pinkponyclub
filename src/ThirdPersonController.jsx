"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export default function ThirdPersonController() {
  const characterRef = useRef()
  const controlsRef = useRef()
  const { camera } = useThree()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  // Character movement speed
  const speed = 0.1

  // Character model (a simple box for now)
  const characterSize = [1, 2, 1]

  useEffect(() => {
    // Set up keyboard controls
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setMoveForward(true)
          break
        case "KeyS":
        case "ArrowDown":
          setMoveBackward(true)
          break
        case "KeyA":
        case "ArrowLeft":
          setMoveLeft(true)
          break
        case "KeyD":
        case "ArrowRight":
          setMoveRight(true)
          break
      }
    }

    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setMoveForward(false)
          break
        case "KeyS":
        case "ArrowDown":
          setMoveBackward(false)
          break
        case "KeyA":
        case "ArrowLeft":
          setMoveLeft(false)
          break
        case "KeyD":
        case "ArrowRight":
          setMoveRight(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!characterRef.current || !controlsRef.current) return

    // Get camera direction
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0
    cameraDirection.normalize()

    // Get camera right vector
    const cameraRight = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x)

    // Calculate movement direction
    const moveDirection = new THREE.Vector3(0, 0, 0)

    if (moveForward) moveDirection.add(cameraDirection)
    if (moveBackward) moveDirection.sub(cameraDirection)
    if (moveLeft) moveDirection.sub(cameraRight)
    if (moveRight) moveDirection.add(cameraRight)

    moveDirection.normalize().multiplyScalar(speed)

    if (moveDirection.length() > 0) {
      // Move character
      characterRef.current.position.x += moveDirection.x
      characterRef.current.position.z += moveDirection.z

      // Rotate character to face movement direction
      const angle = Math.atan2(moveDirection.x, moveDirection.z)
      characterRef.current.rotation.y = angle
    }

    // Update camera position to follow character
    // const idealOffset = new THREE.Vector3(0, 3, -5)
    // idealOffset.applyQuaternion(characterRef.current.quaternion)
    // idealOffset.add(characterRef.current.position)

    // // Update orbit controls target
    // controlsRef.current.target.copy(characterRef.current.position)
  })

  return (
    <>
      {/* <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.1}
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2 - 0.1}
      /> */}
    </>
  )
}
