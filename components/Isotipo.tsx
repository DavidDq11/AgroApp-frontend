interface IsotipoProps {
    className?: string
}

export function Isotipo({ className }: IsotipoProps) {
    return (
        <img
            src="/logo.png" // Ruta a tu imagen
            alt="Isotipo"
            className={`w-54 h-auto ${className}`} // Ajusta la clase según el tamaño necesario
        />
    )
}
