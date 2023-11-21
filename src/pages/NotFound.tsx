import { useEffect, useRef } from "react"
import { elementoAlAzar, waitFor } from "../utils/utils"
import { useNavigate } from "react-router-dom"

const frase1 = [
    "¿A dónde vas?",
    "jaja ¿te perdiste?",
    "¿Qué intentas hacer?"
]

const frase2 = [
    "Espera, ahora te redirecciono...",
    "Déjame ayudarte...",
    "Redireccionando..."
]

const NotFound = () => {
    
    const navigate = useNavigate();
    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const write = async (message: string) => {
            const p = pRef.current
            if (p) {
                for (let i = 0; i < message.length; i++) {
                    await waitFor(100);
                    p.textContent += message[i];
                }
            }            
        }

        write(elementoAlAzar(frase1))
        .then(async () => {
            await waitFor(1000);
            await write(" " + elementoAlAzar(frase2))
            await waitFor(1000);
            navigate('/');
        })

        const title = document.title
        document.title = "¿Qué haces?" // Obviamente en un proyecto común no sería correcto poner este título, pero quiero recordarte que esto es un juego y me tomé libertades para mejorar la experiencia del usuario

        return () => {
            document.title = title
        }
    }, [navigate])
    
    return (
        <div className="flex flex-col justify-center h-screen bg-slate-500">
            <h1 className="mb-5 text-3xl text-center font-bold max-md:text-xl">Error 404 | Not Found</h1>

            <p className="text-2xl text-center max-md:text-lg" ref={pRef}></p>
        </div>
    )
}

export default NotFound
