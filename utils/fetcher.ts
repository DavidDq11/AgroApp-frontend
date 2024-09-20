'use server'

import { cookies } from 'next/headers'
import { getTokenData } from './getTokenData'

export const fetcher = async (url: string, method: string = 'GET', data?: object | FormData | string) => {
    const accessToken = await getAccessTokenFromCookie()

    const headers = new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
    })

    let body: BodyInit | undefined

    if (data instanceof FormData) {
        // Para FormData, no añadas el 'Content-Type' y prepara `body` directamente con `data`
        body = data
    } else if (data) {
        // Para los objetos JSON, añade 'Content-Type' y convierte `data` en una cadena JSON para `body`
        headers.append('Content-Type', 'application/json')
        body = JSON.stringify(data)
    }

    const response = await fetch(url, {
        method,
        credentials: 'include',
        headers,
        body: body,
    })

    if (!response.ok) {
        throw new Error('Error al realizar la acción')
    }

    return response.json()
}

// Función para obtener el token de acceso de la cookie
export const getAccessTokenFromCookie = () => {
    const cookieStore = cookies()

    const token = cookieStore.get('accessToken')

    if (!token) {
        return null
        // throw new Error('No se encontró el token de acceso en la cookie')
    }

    return token.value
}

export const getUserDataFromToken = async () => {
    const accessToken = await getAccessTokenFromCookie()

    return getTokenData(accessToken as string)
}
