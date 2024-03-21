import React, { useState } from "react"
import { RegisterIn } from "../../types"
import { Link, useNavigate } from "react-router-dom"

export function Register() {

    /* const tags = [
        "Bug",
        "Error",
        "Problema",
        "Fallo",
        "Error de código",
        "Defecto",
        "Problema de rendimiento",
        "Error de diseño",
        "Error de funcionalidad",
        "Error crítico",
        "Feature",
        "Nueva característica",
        "Mejora",
        "Funcionalidad adicional",
        "Solicitud de función",
        "Requerimiento",
        "Nuevo desarrollo",
        "Enhancement",
        "Funcionalidad específica",
        "Cambio de comportamiento",
        "Tarea",
        "Trabajo",
        "Subtarea",
        "Actividad",
        "Acción",
        "To-Do",
        "Trabajo pendiente",
        "Subtarea",
        "Trabajo asignado",
        "Acción requerida"
    ]

    useEffect(() => {

        tags.forEach(tag => {
            fetch("http://localhost:3000/api/tags", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: tag })
            })
                .then(resp => resp.json())
                .then(data => console.log(data))
        })

    }, []) */

    const navigate = useNavigate()

    const [registerInfo, setRegisterInfo] = useState<RegisterIn>({ name: "", email: "", password: "" })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target
        inputType.name === "name"
            ? (setRegisterInfo({ ...registerInfo, name: inputType.value }))
            : inputType.name === "email"
                ? (setRegisterInfo({ ...registerInfo, email: inputType.value }))
                : (setRegisterInfo({ ...registerInfo, password: inputType.value }))
    }

    const register = (event: React.FormEvent) => {
        event.preventDefault()

        const API_REGISTER_URL = "http://localhost:3000/api/register"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerInfo)
        };

        fetch(API_REGISTER_URL, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                navigate("/")
            })
            .catch(err => console.log("ERROR EN EL LOGIN", err))
    }


    return (
        <div className="w-full min-w-96 max-w-[35rem]">
            <h1 className="text-center text-6xl font-light ">Register</h1>
            <form action="POST" onSubmit={register} className="flex flex-col gap-6 p-8 rounded">
                <section className="flex flex-col gap-8">
                    <article>
                        <input className="block w-full text-2xl mt-2 px-2 py-1 border-b-4 border-[#887b6e] bg-transparent outline-0 placeholder:text-black" type="name" name="name" id="nameInput" placeholder="Name" onChange={onChange} />
                    </article>
                    <article>
                        <input className="block w-full text-2xl mt-2 px-0 py-1 border-b-4 border-[#887b6e] bg-transparent outline-0 placeholder:text-black" type="email" name="email" id="emailInput" placeholder="Email" onChange={onChange} autoComplete="off" />
                    </article>
                    <article>
                        <input className="block w-full text-2xl mt-2 px-2 py-1 border-b-4 border-[#887b6e] bg-transparent outline-0 placeholder:text-black" type="password" name="password" id="passwordInput" placeholder="Password" onChange={onChange} />
                    </article>
                </section>
                <button className="w-full hover:border-[#5d514b] hover:text-[#5d514b] text-[#887b6e] text-2xl border-[#887b6e] border-2 transition-colors py-2 rounded-sm">Register</button>
                <h1 className="text-center text-2xl">Already have an account? <Link className="font-bold text-[#5d514b] underline" to={"/"}>Login</Link></h1>
            </form>
        </div>

    )
}
