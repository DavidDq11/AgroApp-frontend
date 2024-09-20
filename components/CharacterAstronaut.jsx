import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { UserMarkerModel } from '../app/juego/anfora/components/UserMarker'
import { useGameStore } from '@/lib/store'

export function CharacterAstronaut({ animation, ...props }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/CharacterAstronaut.glb')
    const { actions } = useAnimations(animations, group)
    const showMap = useGameStore((state) => state.showMap)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true)
        }, 2000)

        return () => clearTimeout(timer) // Limpia el temporizador si el componente se desmonta
    }, [])

    useEffect(() => {
        if (visible) {
            actions[animation].reset().fadeIn(0.2).play()
            return () => actions[animation]?.fadeOut(0.2)
        }
    }, [animation])

    return visible ? (
        <group
            ref={group}
            {...props}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.02}>
                    <skinnedMesh
                        name="Body"
                        geometry={nodes.Body.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Body.skeleton}
                        castShadow
                        receiveShadow
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>

                {showMap && <UserMarkerModel scale={80} />}
            </group>
        </group>
    ) : null
}

useGLTF.preload('/models/CharacterAstronaut.glb')
