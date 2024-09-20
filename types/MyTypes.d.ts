export interface OpcionPruebaDiagnostica {
    id: string
    opcion: string
    preguntaPruebaDiagnosticaId: string
    esOpcionCorrecta: boolean
}

interface PreguntaPruebaDiagnostica {
    id: string
    pregunta: string
    esPreguntaCerrada: boolean
    opcionPruebaDiagnostica: OpcionPruebaDiagnostica[]
}

interface Mascota {
    id: string
    mascota: string
    foto: string
}

interface RespuestaPruebaDiagnostica {
    id: string
    respuesta: string
    esRespuestaCorrecta: boolean | null
    usuarioId: string
    opcionPruebaDiagnosticaId: string | null
    preguntaPruebaDiagnosticaId: string | null
    usuario: Usuario
    preguntaPruebaDiagnostica: PreguntaPruebaDiagnostica
    opcionPruebaDiagnostica: OpcionPruebaDiagnostica
}

interface Usuario {
    id: string
    usuarioId: string
    nombre: string
    nombreUsuario: string
    edad: number
    grado: string
    colegio: string
    mascotaId: string
    mascotaNombre: string
    introduccionCompleta: boolean
    pruebaDiagnosticaCompleta: boolean
    esAdmin: boolean
    tiempoPruebaDiagnostica: number
}

interface ObjetoNaveReparado {
    id: string
    objeto: string
    planeta: string
    usuarioId: string
    tiempoRespuesta: number
}

interface Login {
    email: string
    password: string
}
