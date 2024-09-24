import { Metadata } from 'next'
import RegistrationForm from './_form'

export const metadata: Metadata = {
    title: 'Registro',
}

export default function RegistrationPage() {
    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative">
                <h1 className="
                    text-6xl
                    text-center
                    font-bold
                    font-edu
                    text-white
                    shadow-lg
                    bg-gradient-to-r from-blue-700 to-cyan-500
                    bg-clip-text
                    text-transparent
                    animate-pulse
                    tracking-wider
                    mb-8
                    [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]
                ">
                    Registro
                </h1>

                <RegistrationForm />
            </div>
        </>
    )
}