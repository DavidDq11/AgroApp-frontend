'use client'

import { Usuario } from '@/types/MyTypes'
import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
    profileUserData: Usuario | undefined
    setProfileUserData: (profileUserData: Usuario) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [profileUserData, setProfileUserData] = useState<Usuario>()

    return <AppContext.Provider value={{ profileUserData, setProfileUserData }}>{children}</AppContext.Provider>
}

export const useContextData = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useContextData debe ser utilizado dentro de un AppProvider')
    }

    return context
}
