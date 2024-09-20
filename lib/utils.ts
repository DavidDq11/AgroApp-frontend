import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const Controls = {
    forward: 'forward',
    back: 'back',
    left: 'left',
    right: 'right',
    jump: 'jump',
    reset: 'r',
}
