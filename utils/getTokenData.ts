import jwt from 'jsonwebtoken'

export interface TokenData {
    id: string
    nombre: string
    grado: string
    colegio: string
    preguntaSeguridadId: string
    respuestaSeguridad: string
}

export function getTokenData(accessToken: string): TokenData | null {
    try {
        const decodedToken: any = jwt.decode(accessToken)
        if (!decodedToken) {
            throw new Error('Token inválido')
        }

        const tokenData: TokenData = {
            id: decodedToken.id || '',
            nombre: decodedToken.nombre || '',
            grado: decodedToken.grado || '',
            colegio: decodedToken.colegio || '',
            preguntaSeguridadId: decodedToken.preguntaSeguridadId || '',
            respuestaSeguridad: decodedToken.respuestaSeguridad || '',
        }

        return tokenData
    } catch (error) {
        console.error('Error al decodificar el token:', error)
        return null
    }
}
