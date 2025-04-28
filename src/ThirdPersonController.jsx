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

  const speed = 0.1

  const characterSize = [1, 2, 1]

  useEffect(() => {
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

    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0
    cameraDirection.normalize()

    const cameraRight = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x)

    const moveDirection = new THREE.Vector3(0, 0, 0)

    if (moveForward) moveDirection.add(cameraDirection)
    if (moveBackward) moveDirection.sub(cameraDirection)
    if (moveLeft) moveDirection.sub(cameraRight)
    if (moveRight) moveDirection.add(cameraRight)

    moveDirection.normalize().multiplyScalar(speed)

    if (moveDirection.length() > 0) {
      characterRef.current.position.x += moveDirection.x
      characterRef.current.position.z += moveDirection.z

      const angle = Math.atan2(moveDirection.x, moveDirection.z)
      characterRef.current.rotation.y = angle
    }
  })

  return (
    <>
    </>
  )
}
