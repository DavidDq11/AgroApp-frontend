import { useRef, useEffect, useState } from 'react'
import { Howl } from 'howler'

type SoundName = 'anforaMusic' | 'running' | 'walking' | 'satelite' | 'buttonPressed' | 'phoneHidden' | 'phoneShowed' | 'bienvenida' | 'errorRespuesta' // Lista de nombres de sonidos

type Sounds = {
    [key in SoundName]?: Howl
}

export function useAudioPlayer() {
    const soundsRef = useRef<Sounds>({})

    // Inicializa tus sonidos
    const initSounds = () => {
        soundsRef.current = {
            anforaMusic: new Howl({
                src: ['/audios/little-astronaut.ogg'],
                loop: true,
                volume: 0.3,
            }),
            running: new Howl({
                src: ['/audios/running-sound.ogg'],
                loop: true,
                volume: 0.04,
            }),
            satelite: new Howl({
                src: ['/audios/satelite-sound.mp3'],
                loop: false,
                volume: 0.1,
            }),
            buttonPressed: new Howl({
                src: ['/audios/button-pressed.mp3'],
                loop: false,
                volume: 0.04,
            }),
            phoneHidden: new Howl({
                src: ['/audios/phone-hidden-sound.mp3'],
                loop: false,
                volume: 0.04,
            }),
            phoneShowed: new Howl({
                src: ['/audios/phone-sound.mp3'],
                loop: false,
                volume: 0.04,
            }),
            walking: new Howl({
                src: ['/audios/walking-sound.ogg'],
                loop: true,
                volume: 0.03,
            }),
            bienvenida: new Howl({
                src: ['/audios/bienvenida.mp3'],
                loop: false,
                volume: 1,
            }),
            // Agrega más sonidos aquí
            errorRespuesta: new Howl({
                src: ['/audios/error.mp3'],
                loop: false,
                volume: 1,
            }),
        }
    }

    const [isAudioContextStarted, setIsAudioContextStarted] = useState(false)

    const startAudioContext = () => {
        if (!isAudioContextStarted) {
            Howler.autoUnlock = false
            Howler.ctx.resume().then(() => {
                setIsAudioContextStarted(true)
            })
        }
    }

    // Reproduce un sonido específico
    const playSound = (soundName: SoundName) => {
        startAudioContext()
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.play()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Detiene un sonido específico
    const stopSound = (soundName: SoundName) => {
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.stop()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Pausa un sonido específico
    const pauseSound = (soundName: SoundName) => {
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.pause()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Inicializa los sonidos cuando el hook se monta
    useEffect(() => {
        initSounds()
    }, [])

    return { playSound, stopSound, pauseSound }
}
