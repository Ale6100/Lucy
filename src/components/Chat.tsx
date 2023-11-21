import { useEffect, useRef, useState } from "react"
import { typeMessage } from "../types";
import { colorRandom, escribirTexto, numeroAlAzar, probabilidadDeN, waitFor } from "../utils/utils";
import { dialogos } from "../dialogos";
import { sendFirstMessage } from "../utils/sendFirstMessage";

const bgColorRandomChat = colorRandom();
const colorRandomBordeChat = colorRandom();
const bgColorRandomHeaderYButton = colorRandom();

const dateCreation = "Sat Nov 18 2023 20:56:55 GMT-0300 (hora estándar de Argentina)"; // Como curiosidad aclaro que en este momento creé esta constante
const minutesDiference = Math.floor((new Date().getTime() - new Date(dateCreation).getTime()) / 60000);

const Chat = ({ container }: { container: React.RefObject<HTMLDivElement>}) => {
    const [messages, setMessages] = useState<typeMessage[]>([dialogos[0]]);
    const [options, setOptions] = useState<typeMessage[]>([]);
    const [end, setEnd] = useState(false);
    const [empathy, setEmpathy] = useState(100);

    const pActual = useRef<HTMLParagraphElement>(null); // Estoy al tanto de que son demaciados useRef, pero bueno lo vi necesario para hacer que automáticamente se muevan fáciles algunos elementos del DOM. En un futuro usaré un método más eficiente
    const divChat = useRef<HTMLDivElement>(null);
    const divHeader = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const divMessages = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const pDivisor = useRef<HTMLParagraphElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {        
        const p = pActual.current;

        const currentMessage = messages[messages.length - 1];

        if (currentMessage && p) {
            escribirTexto(p, currentMessage.text, {currentDiv: divMessages.current});
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

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>, option: typeMessage) => {        
        const p = pActual.current;
        if (!p) return null
        
        const idEleccion = option.id;

        if (idEleccion !== 33) {
            setMessages((prev) => [...prev, option]);
            await escribirTexto(p, option.text, {currentDiv: divMessages.current, animado: false});     
    
            const options = optionsRef.current
            if (options) {
                options.classList.add("scale-1");
                options.classList.replace("scale-1", "scale-0");
            }
    
            await waitFor(1000);
        }

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
            await generarDialogo(19);
            await waitFor(1500);
            generarOpciones(20, 21);

        } else if (idEleccion === 20) {
            if (empathy === 100) {
                await generarDialogo(22);
            } else {
                const dialogoId35 = dialogos.find(dialogo => dialogo.id === 35)!;
                setMessages((prev) => [...prev, dialogoId35]);
                await escribirTexto(p, dialogoId35.text, { currentDiv: divMessages.current}); 
            }
            
            await generarDialogo(23);
            await generarDialogo(24);
            await generarDialogo(25);
            await generarDialogo(26);
            await generarDialogo(27);
            await generarDialogo(28);
            
            if (probabilidadDeN(60)) {
                await generarDialogo(29, 0);
            }
            return setEnd(true)

        } else if (idEleccion === 8) {
            setEmpathy(em => em - 10);
            await generarDialogo(30);
            const dialogoId11 = dialogos.find(dialogo => dialogo.id === 11)!;
            setMessages((prev) => [...prev, dialogoId11]);
            dialogoId11.text.replace("TIMESTAMP", `${minutesDiference}`);
            await escribirTexto(p, dialogoId11.text.replace("TIMESTAMP", `${minutesDiference}`), { currentDiv: divMessages.current});

            await generarDialogo(12);
            await waitFor(1500);

            generarOpciones(13, 14);
            
        } else if (idEleccion === 14) {
            setEmpathy(em => em - 10);
            await generarDialogo(31);
            await generarDialogo(15);
            await waitFor(1500);
            generarOpciones(16, 17);
            
        } else if (idEleccion === 17) {
            await generarDialogo(32);
            await waitFor(1500);
            generarOpciones(33, 34);

        } else if (idEleccion === 21) {
            await generarDialogo(36);
            await generarDialogo(24);
            await generarDialogo(25);
            await generarDialogo(26);
            await generarDialogo(27);
            await generarDialogo(28);
            
            if (probabilidadDeN(60)) {
                await generarDialogo(29, 0);
            }
            return setEnd(true)
            
        } else if (idEleccion === 34) {
            const recortarH1 = async () => {
                const h1 = h1Ref.current;
                if (!h1?.textContent) return null;
                h1.classList.replace("text-2xl", "text-3xl");
                const textoABorrar = ", asistente virtual";
                if (h1.textContent.endsWith(textoABorrar)) {
                    for (let i = 0; i < textoABorrar.length; i++) {
                        await waitFor(100);
                        h1.textContent = h1.textContent.slice(0, -1);
                    }
                }
            }
            recortarH1(); // No le pongo await a propósito

            await generarDialogo(38);
            await generarDialogo(39);
            await generarDialogo(40);
            await generarDialogo(41);
            await generarDialogo(42);
            alert("Historial eliminado") // Primera vez que uso un alert. Jamás lo usaría, pero en este fue para darle más "realismo"
            await generarDialogo(43);
            await generarDialogo(44);
            await generarDialogo(45);
            await generarDialogo(46);
            return setEnd(true)

        } else if (idEleccion === 33) {
            const button = e.currentTarget;
            button.style.setProperty('transform', `translate(${numeroAlAzar(-200, 200)}%, ${numeroAlAzar(-500, 50)}%)`);
   
        } else {
            alert("Esta elección aún no está configurada, vuelve pronto :D")
        }
    }

    if (end) return (
        <>
        <img className="w-full h-full absolute top-0 left-0" src="./img/blueScreen.webp" alt="" />
        <p className="bg-blue-950 px-1 rounded absolute top-1/3 font-bold text-red-500 text-2xl max-md:text-lg text-center">Lo sentimos, Lucy no se encuentra disponible. Vuelve más tarde</p>
        </>
    )

    return (
        <section ref={divChat} className="h-full border-2 flex flex-col max-md:text-sm" style={{ backgroundColor: bgColorRandomChat, borderColor: colorRandomBordeChat }}>
            <div ref={divHeader} className="flex justify-center items-center" style={{ backgroundColor: bgColorRandomHeaderYButton }}>
                <h1 ref={h1Ref} className="text-2xl max-md:text-xl text-white">Lucy, asistente virtual</h1>
            </div>

            <div ref={divMessages} className="mx-1 overflow-y-auto flex-1">
                {
                    messages.map((message, index) => (
                        index !== messages.length - 1 && 
                        <div key={index} className={`${index === 0 ? "" : "mt-5"} flex ${message.user === "ia" ? "justify-start" : message.user === "user" ? "justify-end" : "justify-center text-blue-800"}`}>
                            <p className="p-1 border bg-slate-300 border-black rounded max-w-[75%]">{message.id !== 11 ? message.text : message.text.replace("TIMESTAMP", `${minutesDiference}`)}</p>
                        </div>
                    ))
                }

                <div className={`${messages.length === 1 ? "" : "mt-5"} flex ${messages[messages.length - 1].user === "ia" ? "justify-start" : messages[messages.length - 1].user === "user" ? "justify-end" : "justify-center text-blue-800"}`}>
                    {
                        <p className="p-1 border bg-slate-300 border-black rounded max-w-[75%]" ref={pActual}></p>
                    }
                </div>
            </div>

            <form ref={formRef} onSubmit={e => sendFirstMessage(e, setMessages, pActual, container, divChat, divHeader, inputRef, buttonRef, formRef, optionsRef, divMessages, setOptions, pDivisor)} className="flex">
                <input ref={inputRef} type="text" autoComplete="off" className="h-10 flex-1" name="message" autoFocus />
                <button ref={buttonRef} type="submit" className="w-20 h-10 text-white" style={{ backgroundColor: bgColorRandomHeaderYButton }}>Enviar</button>
            </form>

            <p ref={pDivisor} className="hidden border-dashed"></p>

            <div ref={optionsRef} className="h-10 hidden justify-evenly items-center duration-200 max-md:flex-col">
                {
                    options.map((option, index) => (
                        <button key={index} onClick={e => sendMessage(e, option)} className="mb-1 p-1 h-min border bg-slate-300 border-black rounded active:outline outline-red-500 outline-2 duration-100">{option.text}</button>
                    ))
                }
            </div>
        </section>
    )
}

export default Chat
