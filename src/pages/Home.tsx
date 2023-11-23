import Chat from "../components/Chat"

const Home = () => {
    return (
        <section className="h-screen flex max-sm:pb-32 py-5 justify-center bg-slate-400 rounded border">
            <Chat />
            <p className='fixed top-[1vw] left-[1vw] text-sm max-md:text-xs text-red-500 font-bold'>Proyecto no terminado</p>
            <a className='fixed top-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Desarrollado por Alejandro P</a>
        </section>        
    )
}

export default Home
