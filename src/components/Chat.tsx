import { useEffect, useRef, useState } from "react"
import { typeMessage } from "../types";
import { colorRandom, escribirTexto, probabilidadDeN, waitFor } from "../utils/utils";
import { dialogos } from "../dialogos";
import { sendFirstMessage } from "../utils/sendFirstMessage";

const bgColorRandomChat = colorRandom();
const colorRandomBordeChat = colorRandom();
const bgColorRandomHeaderYButton = colorRandom();

const dateCreation = "Sat Nov 18 2023 20:56:55 GMT-0300 (hora estándar de Argentina)";
const minutesDiference = Math.floor((new Date().getTime() - new Date(dateCreation).getTime()) / 60000);

const Chat = ({ container }: { container: React.RefObject<HTMLDivElement>}) => {
    const [messages, setMessages] = useState<typeMessage[]>([dialogos[0]]);
    const [options, setOptions] = useState<typeMessage[]>([]);
    const [end, setEnd] = useState(false);

    const pActual = useRef<HTMLParagraphElement>(null);
    const divChat = useRef<HTMLDivElement>(null);
    const divHeader = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const divMessages = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {        
        const p = pActual.current;

        const currentMessage = messages[messages.length - 1];

        if (currentMessage && p) {
            const animado = currentMessage.user === "ia"
            escribirTexto(p, currentMessage.text, {animado, currentDiv: divMessages.current});
        }
        // eslint-disable-next-line
    }, []);

    const generarDialogo = async (id: number, finalTime = 1000) => {
        const p = pActual.current;
        if (!p) return null;

        const dialogo = dialogos.find(dialogo => dialogo.id === id)!;
        setMessages((prev) => [...prev, dialogo]);
        await escribirTexto(p, dialogo.text, { currentDiv: divMessages.current});
        await waitFor(finalTime);        
    }

    const generarOpciones = (...ids: number[]) => {
        const options = optionsRef.current
        if (!options) return null
        
        const arrayOptions = ids.map(id => dialogos.find(dialogo => dialogo.id === id)!);
        setOptions(arrayOptions);
        
        options.classList.replace("scale-0", "scale-1")
    }

    const sendMessage = async (option: typeMessage) => {
        const p = pActual.current;

        if (!p) return null
        
        setMessages((prev) => [...prev, option]);
        await escribirTexto(p, option.text, {currentDiv: divMessages.current, animado: false});

        if (divMessages.current) {
            const { scrollHeight } = divMessages.current;
            divMessages.current.scrollTo(0, scrollHeight);
        }           

        const options = optionsRef.current
        if (options) {
            options.classList.add("scale-1");
            options.classList.replace("scale-1", "scale-0");
        }

        await waitFor(1000);

        const idEleccion = option.id;

        if (idEleccion === 7) {
            await generarDialogo(10)

            const dialogoId11 = dialogos.find(dialogo => dialogo.id === 11)!;
            setMessages((prev) => [...prev, dialogoId11]);
            dialogoId11.text.replace("TIMESTAMP", `${minutesDiference}`);
            await escribirTexto(p, dialogoId11.text.replace("TIMESTAMP", `${minutesDiference}`), { currentDiv: divMessages.current});
            await waitFor(1000);

            await generarDialogo(12);
            await waitFor(1500);

            generarOpciones(13, 14);

        } else if (idEleccion === 13) {
            await generarDialogo(15);
            await waitFor(1500);
            generarOpciones(16, 17);

        } else if (idEleccion === 16) {
            await generarDialogo(18);
            await waitFor(1000);
            await generarDialogo(19);
            await waitFor(1500);
            generarOpciones(20, 21);

        } else if (idEleccion === 20) {
            await generarDialogo(22);
            await waitFor(1000);
            await generarDialogo(23);
            await waitFor(1000);
            await generarDialogo(24);
            await waitFor(1000);
            await generarDialogo(25);
            await waitFor(1000);
            await generarDialogo(26);
            await waitFor(1000);
            await generarDialogo(27);
            await waitFor(1000);
            await generarDialogo(28);
            await waitFor(1000);
            
            if (probabilidadDeN(60)) {
                await generarDialogo(29, 0);
            }
            setEnd(true)

        } else {
            alert("Esa elección aún no está configurada, vuelve pronto :D")
        }

    }

    if (end) return (
        <>
        <img className="w-full h-full absolute top-0 left-0" src="./img/blueScreen.webp" alt="" />
        <p className="bg-blue-950 px-1 rounded absolute top-1/3 font-bold text-red-500 text-2xl max-md:text-lg text-center">Lo sentimos, Lucy no se encuentra disponible. Vuelve más tarde</p>
        </>
    )

    return (
        <section ref={divChat} className={`h-full border-2 flex flex-col`} style={{ backgroundColor: bgColorRandomChat, borderColor: colorRandomBordeChat }}>
            <div ref={divHeader} className=" flex justify-center items-center" style={{ backgroundColor: bgColorRandomHeaderYButton }}>
                <h1 onClick={() => setMessages((prev) => [...prev, { id: 1, text: "asd", user: "ia" }])} className="text-2xl text-white">Lucy, inteligencia artificial</h1>
            </div>

            <div ref={divMessages} className="mx-1 mt-1 overflow-y-auto flex-1">
                {
                    messages.map((message, index) => (
                        index !== messages.length - 1 && 
                        <div key={index} className={`${index === 0 ? "" : "mt-5"} flex ${message.user === "ia" ? "justify-start" : "justify-end"}`}>
                            <p className="p-1 border bg-slate-300 border-black rounded">{message.id !== 11 ? message.text : message.text.replace("TIMESTAMP", `${minutesDiference}`)}</p>
                        </div>
                    ))
                }

                <div className={`${messages.length === 1 ? "" : "mt-5"} flex ${messages[messages.length - 1].user === "ia" ? "justify-start" : "justify-end"}`}>
                    {
                        <p className="p-1 border bg-slate-300 border-black rounded" ref={pActual}></p>
                    }
                </div>
            </div>

            <form ref={formRef} onSubmit={(e) => sendFirstMessage(e, setMessages, pActual, container, divChat, divHeader, inputRef, buttonRef, formRef, optionsRef, divMessages, setOptions)} className="flex">
                <input ref={inputRef} type="text" autoComplete="off" className="h-10 flex-1" name="message" />
                <button ref={buttonRef} type="submit" className="w-20 h-10 text-white" style={{ backgroundColor: bgColorRandomHeaderYButton }} >Enviar</button>
            </form>

            <div ref={optionsRef} className="h-20 hidden justify-evenly items-center duration-200">
                {
                    options.map((option, index) => (
                        <button key={index} onClick={() => sendMessage(option)} className="p-1 border bg-slate-300 border-black rounded hover:outline outline-red-500 outline-2 duration-100">{option.text}</button>
                    ))
                }
            </div>

        </section>
    )
}

export default Chat
