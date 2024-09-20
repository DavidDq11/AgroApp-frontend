'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '../components/Logo'
import { Isotipo } from '../components/Isotipo'
import { LOGIN_ROUTE} from '../utils/routes'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useAudioPlayer } from '../hooks/useAudioPlayer'

export default function Home() {
    const [showContactPopup, setShowContactPopup] = useState(false)
    const { playSound, pauseSound, stopSound } = useAudioPlayer()

    return (
        <main className="flex min-h-screen flex-col justify-between pb-22 px-0 fondo z-[1]">
            <div className="lg:max-w-5xl w-full mx-auto lg:flex items-center">
                <div className="flex justify-center gap-x-4 relative top-12 lg:top-0">
                <Isotipo className="w-20 h-auto dark:drop-shadow-[255_255_255.3rem_#ffffff70]" /> {/* Ajusta el tamaño aquí */}
                <Logo className="w-60 h-10 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
            </div>

                <nav
                    // id="header-nav"
                    className="flex flex-1 items-center justify-around lg:ml-20 fixed inset-x-0 top-4 lg:top-0 lg:relative text-xs lg:text-lg">
                    <Button
                        className="text-white text-xs lg:text-lg hover:text-white/90 font-bold w-40"
                        onClick={() => setShowContactPopup(true)}
                        onMouseEnter={() => playSound('phoneShowed')}>
                        Contacto
                    </Button>

                    <Link
                        className="text-white hover:text-white/90 font-bold border-2 py-3 lg:py-1 px-8 rounded-full border-primary transition-all hover:bg-pylos-200/20 hover:border-primary/90"
                        href={LOGIN_ROUTE}
                        onMouseEnter={() => playSound('phoneShowed')}>
                        Ingresar
                    </Link>
                </nav>
            </div>

            <div className="lg:max-w-5xl w-full mx-auto text-left mt-20 lg:mt-0">
                <div className="grid lg:grid-cols-3 items-center">
                    <div className="col-span-2 flex flex-col text-center lg:text-left gap-y-10 lg:gap-y-4">
                        <h1 className="text-7xl font-bold text-gray-800 font-edu">La Revolución Verde</h1>
                        <h2 className="text-5xl text-green-700 font-light font-edu">al Alcance de tus Manos</h2>

                        <p className="lg:mr-36 px-10 lg:px-0 text-gray-800 mb-4 font-medium">
                            Descubre Agro APP: La herramienta definitiva para transformar tu invernadero en una máquina de cultivo eficiente. 
                            Controla el ambiente con precisión, optimiza cada detalle y asegura cosechas más productivas y saludables.
                            ¡Haz que tus cultivos prosperen como nunca antes!
                        </p>

                    </div>

                    <div className="col-span-2 lg:col-auto hidden lg:block">
                        <Isotipo className="w-54 dark:drop-shadow-[255_255_255.3rem_#ffffff70] mx-auto" />
                    </div>
                </div>

                <div className="flex gap-x-4 items-center justify-center lg:justify-start my-10 lg:my-0">
                    <Link
                        href={LOGIN_ROUTE}
                        onMouseEnter={() => playSound('phoneShowed')}
                        className="py-4 px-8 font-bold text-white rounded-full bg-primary hover:bg-primary/90">
                        Ingresar
                    </Link>
                </div>
            </div>

            <div className="text-center lg:max-w-5xl w-full mx-auto flex lg:justify-end flex-wrap lg:flex-nowrap justify-center mt-6 mb-10 sm:mt-16 lg:mt-0">
                <div>
                    <Image
                        src="/calendario.png"
                        alt="calendario"
                        width={140}
                        height={40}
                        className="object-contain"
                    />
                </div>

                <div>
                    <Image
                        src="/temperatura.png"
                        alt=""
                        width={140}
                        height={40}
                        className="object-contain"
                    />

                    {/* <h2>VISUAL</h2> */}
                </div>

                <div>
                    <Image
                        src="/tierra.png"
                        alt=""
                        width={140}
                        height={40}
                        className="object-contain"
                    />

                    {/* <h2>ESCUCHA</h2> */}
                </div>

                <div>
                    <Image
                        src="/gota.png"
                        alt=""
                        width={140}
                        height={40}
                        className="object-contain"
                    />
                    {/* <h2>SOCIOEMOCIONAL</h2> */}
                </div>

                <div>
                    <Image
                        src="/sensores.png"
                        alt=""
                        width={140}
                        height={40}
                        className="object-contain"
                    />
                    {/* <h2>SOCIOEMOCIONAL</h2> */}
                </div>
            </div>

            <AlertDialog open={showContactPopup}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <div className="flex flex-col items-center justify-center py-10 px-4">
                            <div className="flex mt-6">
                                <h1 className="text-2xl mt-2 text-black font-black">PYLOS</h1>

                                <img
                                    src="/wissen-logo.png"
                                    className="ml-4 w-44"
                                />
                            </div>

                            <p className="text-gray-700 leading-6 mt-12 mb-10 font-medium font-edu text-[20px] select-none">
                                PYLOS es un producto de Wissen Creativo, donde la educación se encuentra con la tecnología. En Wissen ofrecemos soluciones interactivas y gamificadas que transforman el
                                aprendizaje en una experiencia divertida y efectiva.
                            </p>

                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="https://instagram.com/wissen.creativo"
                                        target="_blank"
                                        className="hover:opacity-60 transition-opacity flex items-center justify-center">
                                        <svg
                                            fill="#000"
                                            strokeWidth="0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 1024 1024"
                                            className="size-10">
                                            <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
                                        </svg>

                                        <span className="ml-2 font-semibold text-wissen-gradient">@wissen.creativo</span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://wa.me/+573154707281"
                                        target="_blank"
                                        className="hover:opacity-60 transition-opacity flex items-center justify-center">
                                        <svg
                                            fill="#000"
                                            strokeWidth="0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 1024 1024"
                                            className="size-10">
                                            <path d="M713.5 599.9c-10.9-5.6-65.2-32.2-75.3-35.8-10.1-3.8-17.5-5.6-24.8 5.6-7.4 11.1-28.4 35.8-35 43.3-6.4 7.4-12.9 8.3-23.8 2.8-64.8-32.4-107.3-57.8-150-131.1-11.3-19.5 11.3-18.1 32.4-60.2 3.6-7.4 1.8-13.7-1-19.3-2.8-5.6-24.8-59.8-34-81.9-8.9-21.5-18.1-18.5-24.8-18.9-6.4-.4-13.7-.4-21.1-.4-7.4 0-19.3 2.8-29.4 13.7-10.1 11.1-38.6 37.8-38.6 92s39.5 106.7 44.9 114.1c5.6 7.4 77.7 118.6 188.4 166.5 70 30.2 97.4 32.8 132.4 27.6 21.3-3.2 65.2-26.6 74.3-52.5 9.1-25.8 9.1-47.9 6.4-52.5-2.7-4.9-10.1-7.7-21-13z"></path>
                                            <path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3-41.3-41.3-89.5-73.8-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9-53.3 22.8-101.1 55.2-142 96.5-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9.3 69.4 16.9 138.3 48 199.9v152c0 25.4 20.6 46 46 46h152.1c61.6 31.1 130.5 47.7 199.9 48h2.1c59.9 0 118-11.6 172.7-34.3 53.5-22.3 101.6-54.3 142.8-95.2 41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
                                        </svg>

                                        <span className="ml-2 font-semibold text-wissen-gradient">+57 315 4707281</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-10">
                        <AlertDialogCancel
                            className="text-white w-full"
                            onClick={() => setShowContactPopup(false)}>
                            Entendido
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    )
}
