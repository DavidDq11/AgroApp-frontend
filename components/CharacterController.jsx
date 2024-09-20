import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { MathUtils, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'
import { CharacterAstronaut } from './CharacterAstronaut'
import { useGameStore } from '@/lib/store'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI
    while (angle < -Math.PI) angle += 2 * Math.PI
    return angle
}

const lerpAngle = (start, end, t) => {
    start = normalizeAngle(start)
    end = normalizeAngle(end)

    if (Math.abs(end - start) > Math.PI) {
        if (end > start) {
            start += 2 * Math.PI
        } else {
            end += 2 * Math.PI
        }
    }

    return normalizeAngle(start + (end - start) * t)
}

export const CharacterController = () => {
    const activeForm = useGameStore((state) => state.activeForm)

    // const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls('Character Control', {
    //     WALK_SPEED: { value: 1, min: 0.1, max: 4, step: 0.1 },
    //     RUN_SPEED: { value: 1.5, min: 0.2, max: 4, step: 0.06 },
    //     ROTATION_SPEED: {
    //         value: degToRad(2.6),
    //         min: degToRad(0.1),
    //         max: degToRad(5),
    //         step: degToRad(0.01),
    //     },
    // })

    const WALK_SPEED = 1
    const RUN_SPEED = 1.5
    const ROTATION_SPEED = MathUtils.degToRad(2.6)

    const rb = useRef()
    const characterContainer = useRef()
    const character = useRef()

    const [animation, setAnimation] = useState('Idle')
    const [isRunning, setIsRunning] = useState(false)
    const [isWalking, setIsWalking] = useState(false)

    const characterRotationTarget = useRef(0)
    const rotationTarget = useRef(0)
    const cameraTarget = useRef()
    const cameraPosition = useRef()
    const cameraWorldPosition = useRef(new Vector3())
    const cameraLookAtWorldPosition = useRef(new Vector3())
    const cameraLookAt = useRef(new Vector3())
    const [, get] = useKeyboardControls()
    const isClicking = useRef(false)
    const showMap = useGameStore((state) => state.showMap)
    const clickDisabled = useGameStore((state) => state.clickDisabled)
    const resetCharacterPosition = useGameStore((state) => state.resetCharacterPosition)
    const setResetCharacterPosition = useGameStore((state) => state.setResetCharacterPosition)

    const [lastMovementTime, setLastMovementTime] = useState(Date.now())

    const { playSound, stopSound } = useAudioPlayer()

    useEffect(() => {
        const onMouseDown = (e) => {
            isClicking.current = true
        }
        const onMouseUp = (e) => {
            isClicking.current = false
        }
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)
        // touch
        document.addEventListener('touchstart', onMouseDown)
        document.addEventListener('touchend', onMouseUp)
        return () => {
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('touchstart', onMouseDown)
            document.removeEventListener('touchend', onMouseUp)
        }
    }, [])

    const initialCameraPosition = [0.2, 0.6, -1.2]
    const [cameraPositionValues, setCameraPositionValues] = useState(initialCameraPosition)
    useEffect(() => {
        if (activeForm) {
            setCameraPositionValues([1.2, 1, 0])
        } else {
            setTimeout(() => {
                setCameraPositionValues(initialCameraPosition)
            }, 500)
        }
    }, [activeForm])

    useEffect(() => {
        // Recuperar la posición del jugador desde el localStorage al montar el componente
        const savedPosition = localStorage.getItem('player_position')
        if (savedPosition) {
            const { x, y, z } = JSON.parse(savedPosition)
            rb.current.setTranslation({ x, y, z }, true)
        } else {
            localStorage.setItem('player_position', JSON.stringify({ x: 0, y: 2, z: 0 }))
        }
    }, [])

    useEffect(() => {
        if (resetCharacterPosition) {
            rb.current.setTranslation({ x: 0, y: 0, z: 0 }, true)
        }

        setResetCharacterPosition(false)
    }, [resetCharacterPosition])

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastMovementTime > 1000) {
                const { x, y, z } = rb.current.translation()

                if (y + 1 > 0.4) {
                    localStorage.setItem('player_position', JSON.stringify({ x, y: y + 1, z }))
                } else {
                    localStorage.setItem('player_position', JSON.stringify({ x: 0, y: 2, z: 0 }))
                }
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [lastMovementTime])

    useFrame(({ camera, mouse }) => {
        if (rb.current) {
            const vel = rb.current.linvel()

            const movement = {
                x: 0,
                z: 0,
            }

            if (get().forward) {
                movement.z = 1

                setLastMovementTime(Date.now())
            }
            if (get().backward) {
                movement.z = -1

                setLastMovementTime(Date.now())
            }

            if (get().reset) {
                rb.current.setTranslation({ x: 0, y: 2, z: 0 }, true)
            }

            let speed = get().run ? RUN_SPEED : WALK_SPEED

            if (isClicking.current && activeForm == false && process.env.NEXT_PUBLIC_DEBUG_ORBIT_CONTROLS == 'false' && !showMap && !clickDisabled) {
                // console.log('clicking', mouse.x, mouse.y)
                if (Math.abs(mouse.x) > 0.1) {
                    movement.x = -mouse.x
                }
                movement.z = mouse.y + 0.4
                if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
                    speed = RUN_SPEED
                }
            }

            if (get().left && activeForm == false) {
                movement.x = 0.6
            }
            if (get().right && activeForm == false) {
                movement.x = -0.6
            }

            if (movement.x !== 0) {
                rotationTarget.current += ROTATION_SPEED * movement.x
            }

            if ((movement.x !== 0 && activeForm == false) || (movement.z !== 0 && activeForm == false)) {
                characterRotationTarget.current = Math.atan2(movement.x, movement.z)
                vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed
                vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed
                if (speed === RUN_SPEED) {
                    setAnimation('Run.001')
                    if (!isRunning) {
                        playSound('running')
                        setIsRunning(true)
                    }

                    if (isWalking) {
                        stopSound('walking')
                        setIsWalking(false)
                    }
                } else {
                    setAnimation('Walk')
                    if (isRunning) {
                        stopSound('running')
                        setIsRunning(false)
                    }

                    if (!isWalking) {
                        playSound('walking')
                        setIsWalking(true)
                    }
                }
            } else {
                setAnimation('Idle')
                if (isRunning) {
                    stopSound('running')
                    setIsRunning(false)
                }

                if (isWalking) {
                    stopSound('walking')
                    setIsWalking(false)
                }
            }
            character.current.rotation.y = lerpAngle(character.current.rotation.y, characterRotationTarget.current, 0.1)

            rb.current.setLinvel(vel, true)
        }

        if (process.env.NEXT_PUBLIC_DEBUG_ORBIT_CONTROLS == 'false' && !showMap) {
            // CAMERA
            characterContainer.current.rotation.y = MathUtils.lerp(characterContainer.current.rotation.y, rotationTarget.current, 0.1)

            cameraPosition.current.getWorldPosition(cameraWorldPosition.current)
            camera.position.lerp(cameraWorldPosition.current, 0.1)

            if (cameraTarget.current) {
                cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current)
                cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1)
                if (cameraLookAt.current.y <= 0.17) {
                    cameraLookAt.current.y = 0.17
                }

                camera.lookAt(cameraLookAt.current)
            }
        }
    })

    return (
        <RigidBody
            colliders={false}
            lockRotations
            ref={rb}>
            <group ref={characterContainer}>
                <group ref={cameraTarget} />
                <group
                    ref={cameraPosition}
                    position={cameraPositionValues}
                />
                <group ref={character}>
                    <CharacterAstronaut
                        scale={0.065}
                        position-y={0.1}
                        animation={animation}
                    />
                </group>
            </group>
            <CapsuleCollider
                args={[0.1, 0.1]}
                position={[0, 0.3, 0]}
            />
        </RigidBody>
    )
}
