import { Metadata } from 'next'
import LoginForm from './_form'

export const metadata: Metadata = {
    title: 'Iniciar sesión',
}

export default function LoginPage() {
    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative">
                <h1 className="
                text-6xl /* Tamaño del texto */
                text-center /* Centra el texto horizontalmente */
                font-bold /* Hace el texto más grueso */
                font-edu /* Usa la fuente personalizada */
                text-white /* Cambia el color del texto a blanco */
                shadow-lg /* Agrega una sombra para que resalte sobre el fondo */
                bg-gradient-to-r from-blue-700 to-cyan-500 /* Aplica un degradado de color alternativo */
                bg-clip-text /* Aplica el degradado solo al texto */
                text-transparent /* Hace que el texto sea transparente para mostrar el degradado */
                animate-pulse /* Añade una animación sutil de pulso */
                tracking-wider /* Espacia un poco más las letras */
                mb-8 /* Margen inferior para separar del formulario */
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Aumenta la sombra del texto */
            ">
                Ingresar
            </h1>

                <LoginForm />
            </div>
        </>
    )
}
