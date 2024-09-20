'use client'

import { Points, PointMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export function Stars(props: any) {
    const ref = useRef<any>()
    const [sphere] = useState(() => {
        const positions = new Float32Array(5000 * 3) // Three values per position (x, y, z)
        for (let i = 0; i < positions.length; i += 3) {
            const radius = 1.5
            const theta = Math.random() * Math.PI * 2 // Random angle around the y-axis
            const phi = Math.acos(2 * Math.random() - 1) // Random angle from the pole (north or south)
            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.cos(phi)
            const z = radius * Math.sin(phi) * Math.sin(theta)
            positions[i] = x
            positions[i + 1] = y
            positions[i + 2] = z
        }
        return positions
    })

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                frustumCulled={false}
                {...props}>
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}
