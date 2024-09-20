'use client'

import { useEffect, useState } from 'react'

interface Props {
    className?: string
    onlyLoader?: boolean
}

export default function LoadingOverlay({ className, onlyLoader = false }: Props) {
    const [toggle, setToggle] = useState(true)
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(true)
        }, 1500)
        const interval = setInterval(() => {
            setToggle((prevToggle) => !prevToggle)
        }, 3500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`${showLoading ? 'bg-pylos-900/10' : 'bg-pylos-900/50'} backdrop-blur-lg fixed inset-0 w-full h-[100vh] z-10`}>
            {showLoading && !onlyLoader && (
                <div className={`absolute z-[10000] left-0 right-0 mx-auto text-center transition-opacity delay-75 duration-500 bottom-20 font-bold text-3xl ${toggle ? 'opacity-100' : 'opacity-20'}`}>
                    PYLOS
                </div>
            )}
            <div className={`${className ? className : ''} fixed inset-0 w-full h-[100vh] z-[10000] bg-transparent text-white flex flex-row items-center justify-center font-bold`}>
                {showLoading && !onlyLoader && (
                    <>
                        <div className="word-wrapper font-edu top-6 sm:top-0 text-[26px] relative">
                            <span className={`word1 ${toggle ? 'anim1Word1' : 'anim2Word1'} transition-transform delay-75`}>Diversión, </span>
                        </div>
                        <div className="word-wrapper font-edu top-6 sm:top-0 text-[26px] relative">
                            <span className={`word2 ${toggle ? 'anim1Word2' : 'anim2Word2'} ml-2 transition-transform delay-75`}>Aventura, </span>
                        </div>
                        <div className="word-wrapper font-edu top-6 sm:top-0 text-[26px] relative">
                            <span className={`word3 ${toggle ? 'anim1Word3' : 'anim2Word3'} ml-2 transition-transform delay-75`}>Aprendizaje.</span>
                        </div>
                    </>
                )}
            </div>
            <div className={`transition-transform absolute z-[10000] inset-0 size-[35px] m-auto delay-75 duration-500 ${showLoading ? 'translate-y-40' : 'translate-y-0'} `}>
                <span className="loader"></span>
            </div>
            {showLoading && <div className={`bg-pylos-800/60 fixed z-[9999] h-[200%] inset-0 transform transition-transform rotate-[45deg]`}></div>}
        </div>
    )
}
