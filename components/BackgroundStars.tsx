'use client'

import { Stars } from '../components/Stars'
import { Canvas } from '@react-three/fiber'

export default function BackgroundStars() {
    return (
        <Canvas
            camera={{ position: [0, 0, 1] }}
            className="!h-[100vh] !fixed z-10 bg-pylos-800/50">
            <Stars />
        </Canvas>
    )
}
