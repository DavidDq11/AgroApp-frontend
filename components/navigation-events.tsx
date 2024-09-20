'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
// import { getProfile } from '../lib/actions'
import { useContextData } from '../app/context/AppContext'
// import LoadingOverlay from '../app/loading'

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [checkingServer, setCheckingServer] = useState(false)
    const [loading, setLoading] = useState(false)
    const { setProfileUserData } = useContextData()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`

        // checkHealth()

        // if (pathname.startsWith('/juego/introduccion')) {
        //     fetchUserProfile()
        // }
    }, [pathname, searchParams])

    useEffect(() => {
        // if (pathname.startsWith('/juego')) {
        //     fetchUserProfile()
        // }
    }, [])

    // // const fetchUserProfile = async () => {
    // //     try {
    // //         const profile = await getProfile()
    // //         setProfileUserData(profile)
    // //     } catch (error) {
    // //         console.error('Error fetching data:', error)
    // //     }
    // // }

    // // const checkHealth = async () => {
    // //     try {
    // //         setLoading(true)

    // //         const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/healthcheck`)
    // //         if (!response.ok) {
    // //             setLoading(true)
    // //             setCheckingServer(true) // Cambiamos checking a true si hay un problema
    // //         } else {
    // //             setLoading(false)
    // //             setCheckingServer(false) // Cambiamos checking a false si todo está bien
    // //         }
    // //     } catch (error) {
    // //         console.error('Error checking health:', error)
    // //         setLoading(true)
    // //         setCheckingServer(true) // Cambiamos checking a true en caso de error
    // //     }
    // // }

    // if (loading && checkingServer) {
    //     return (
    //         <>
    //             <LoadingOverlay className="bg-pylos-800" />
    //             <div className="fixed top-0 left-0 z-[10000] p-4">El servidor no está respondiendo. Reintentando...</div>
    //         </>
    //     )
    // }

    // if (loading && !checkingServer) {
    //     return <LoadingOverlay className="bg-pylos-800" />
    // }

    return null
}
