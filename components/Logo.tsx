interface LogoProps {
    className?: string
}

export function Logo({ className }: LogoProps) {
    return (
        <img
            src="/agroapp.png" // Ruta a tu imagen
            alt="Isotipo"
            className={`w-54 h-auto ${className}`} // Ajusta la clase según el tamaño necesario
        />
    )
}
