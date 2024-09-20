import { useState, useEffect } from 'react'

const useCronometro = (startCondition: boolean) => {
    const [tiempoEnMinutos, setTiempoEnMinutos] = useState('00:00')
    const [cronometro, setCronometro] = useState(0)

    useEffect(() => {
        if (startCondition) {
            const start = Date.now()

            const intervalo = setInterval(() => {
                const tiempoTranscurrido = Date.now() - start
                const segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000)
                const minutos = Math.floor(segundosTranscurridos / 60)
                const segundos = segundosTranscurridos % 60
                const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
                setTiempoEnMinutos(tiempoFormateado)
                setCronometro(segundosTranscurridos)
            }, 1000)

            return () => {
                clearInterval(intervalo)
            }
        }
    }, [startCondition])

    return { tiempoEnMinutos, cronometro }
}

export default useCronometro
