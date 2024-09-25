import type { Metadata } from 'next'
import { AppProvider } from './context/AppContext'

import './globals.css'
import 'animate.css'
import { Edu_VIC_WA_NT_Beginner } from 'next/font/google'
import { cn } from '../lib/utils'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/toaster'
import { Suspense } from 'react'
import LoadingOverlay from './loading'
import { NavigationEvents } from '../components/navigation-events'
import type { Viewport } from 'next'

const eduFont = Edu_VIC_WA_NT_Beginner({
    weight: '500',
    subsets: ['latin'],
    variable: '--font-edu',
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
}

export const metadata: Metadata = {
    title: 'Agro APP - La Revolución Verde al Alcance de tu Mano',
    // description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="es"
            suppressHydrationWarning>
                <head>
                {/* Añade el favicon.ico aquí */}
                <link rel="icon" href="/favicon-2.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className={cn('min-h-screen bg-background antialiased', eduFont.variable)}>
                <AppProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        <Suspense fallback={<LoadingOverlay />}>
                            {children}
                            <NavigationEvents />
                        </Suspense>
                        <Toaster />
                    </ThemeProvider>
                </AppProvider>
            </body>
        </html>
    )
}
