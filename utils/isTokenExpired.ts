import { jwtVerify } from 'jose'

// export function isTokenExpired(accessToken: string, secretKey: string): boolean {
//     try {
//         const decodedToken: any = jwt.verify(accessToken, secretKey)
//         const currentTime = Math.floor(Date.now() / 1000) // Convert milliseconds to seconds
//         return decodedToken.exp < currentTime // Compare expiration time with current time
//     } catch (error) {
//         console.error('Error verifying token:', error)
//         return true // Return true in case of error (assuming expired for safety)
//     }
// }



export async function verifyAuth(token: string) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_NESTJS_JWT_SECRET))

        return verified.payload
    } catch (error) {
        throw new Error('Token expired')
    }
}
