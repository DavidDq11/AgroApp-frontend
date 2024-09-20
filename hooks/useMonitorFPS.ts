import { useEffect, useState, useRef } from 'react'

const useMonitorFPS = (threshold: number, checkInterval: number = 1000, duration: number = 10000) => {
    const [fps, setFps] = useState<number>(60) // Valor inicial razonable
    const [warning, setWarning] = useState<boolean>(false)
    const timeBelowThreshold = useRef<number>(0) // Tiempo acumulado por debajo del umbral

    useEffect(() => {
        let frameCount = 0
        let lastTime = performance.now()
        let startTime = performance.now()

        const checkFPS = () => {
            const now = performance.now()
            const delta = (now - lastTime) / 1000
            const currentFps = frameCount / delta
            setFps(currentFps)

            if (currentFps < threshold) {
                timeBelowThreshold.current += checkInterval
            } else {
                timeBelowThreshold.current = 0
            }

            if (timeBelowThreshold.current >= duration) {
                setWarning(true)
            } else {
                setWarning(false)
            }

            frameCount = 0
            lastTime = now
        }

        const frameHandler = () => {
            frameCount++
            requestAnimationFrame(frameHandler)
        }

        frameHandler()
        const interval = setInterval(checkFPS, checkInterval)

        return () => clearInterval(interval)
    }, [threshold, checkInterval, duration])

    return { fps, warning }
}

export default useMonitorFPS
