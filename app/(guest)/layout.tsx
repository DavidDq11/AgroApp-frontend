import Image from 'next/image'

export default function GuestLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex min-h-screen flex-col justify-between items-center pb-22 lg:px-0 fondo z-[1]">
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative overflow-hidden">
                {children}
            </div>
        </main>
    )
}
