import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

interface LoadingScreenProps {
    started: boolean
    onStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoadingScreen({ started, onStarted }: LoadingScreenProps) {
    const { progress } = useProgress()

    useEffect(() => {
        setTimeout(() => {
            onStarted(true)
        }, 2000)
    }, [])

    return (
        <>
            <div className={`bg-pylos-900 fixed z-[1000] inset-0 transform transition-transform delay-75 duration-700 ${started ? 'translate-y-[2600px]' : 'translate-y-[0px]'}`}></div>
            <div
                className={`bg-pylos-600 fixed z-[999] inset-0 transform transition-transform rotate-[45deg] delay-150 duration-700 ${
                    started ? 'translate-y-[2600px]' : 'translate-y-[350px] sm:translate-y-[600px] lg:translate-y-[600px]'
                } `}></div>
            <div
                className={`bg-pylos-700 fixed z-[999] inset-0 transform transition-transform rotate-[45deg] delay-200 duration-700 ${
                    started ? 'translate-x-[-2600px]' : 'translate-x-[0px] translate-y-[-180px] sm:translate-y-0 sm:translate-x-[-400px] lg:translate-x-[-400px]'
                } `}></div>
            <div
                className={`bg-pylos-500 fixed z-[999] inset-0 transform transition-transform rotate-[200deg] delay-300 duration-700  ${
                    started ? 'translate-x-[2600px]' : 'translate-x-[-200px] sm:translate-y-[-350px] sm:translate-x-[182px] lg:translate-y-0 lg:translate-x-[400px]'
                } `}></div>
        </>
    )
}
