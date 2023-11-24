import { useState } from "react";
import Chat from "../components/Chat"

const Home = () => {
    const [end, setEnd] = useState(false);

    return (
        <section className="h-screen flex max-sm:pb-32 py-5 justify-center bg-slate-400 rounded border">
            <Chat end={end} setEnd={setEnd}/>
            <a className={`fixed top-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100 ${end ? "text-white": "text-black"}`} href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Desarrollado por Alejandro P</a>
        </section>        
    )
}

export default Home
