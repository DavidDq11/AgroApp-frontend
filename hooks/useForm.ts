import { useState } from 'react'

interface FormState<T> {
    formData: T
    handleChange: (name: keyof T, value: T[keyof T]) => void
}

export function useForm<T>(initialState: T): FormState<T> {
    const [formData, setFormData] = useState<T>(initialState)

    const handleChange = (name: keyof T, value: T[keyof T]) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return { formData, handleChange }
}
