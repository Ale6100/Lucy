import { useRef } from "react"
import Chat from "./components/Chat"

function App() {
    const container = useRef<HTMLDivElement>(null)

    return (
        <section ref={container} className="h-screen flex">
            <p className='fixed top-[1vw] left-[1vw] text-sm max-md:text-xs text-red-500 font-bold'>Proyecto no terminado</p>
            <Chat container={container}/>
            <a className='fixed top-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Desarrollado por Alejandro P</a>
        </section>
    )
}

export default App
