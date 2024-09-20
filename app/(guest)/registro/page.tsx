import { Metadata } from 'next'
import RegisterForm from './_form'

export const metadata: Metadata = {
    title: 'Registro',
}

export default function RegistroPage() {
    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative">
                <RegisterForm />
            </div>
        </>
    )
}
