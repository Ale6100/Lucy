import { useEffect, useRef, useState } from "react"
import { typeMessage } from "../types";
import { elementoAlAzarMessage, escribirTexto, numeroAlAzar, probabilidadDeN, waitFor } from "../utils/utils";
import { dialogos, dialogosAlternativos } from "../dialogos";
import { sendFirstMessage } from "../utils/sendFirstMessage";

const dateCreation = "Sat Nov 18 2023 20:56:55 GMT-0300 (hora estándar de Argentina)"; // Como curiosidad aclaro que en este momento creé esta constante
const minutesDiference = Math.floor((new Date().getTime() - new Date(dateCreation).getTime()) / 60000);

const Chat = () => {
    const [messages, setMessages] = useState<typeMessage[]>([elementoAlAzarMessage([dialogos[0], dialogosAlternativos[0]])]);
    const [options, setOptions] = useState<typeMessage[]>([]); // Array que contiene las respuestas actuales que el usuario puede elegir
    const [end, setEnd] = useState(false);
    const [empathy, setEmpathy] = useState(100); //! Empatía, todavía no tiene un gran uso

    const pActual = useRef<HTMLParagraphElement>(null);
    const divMessages = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const pDivisor = useRef<HTMLParagraphElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {        
        const p = pActual.current;

        const currentMessage = messages[messages.length - 1];

        if (currentMessage && p) { // Apenas se monta el componente, escribe el primer mensaje
            escribirTexto(p, currentMessage.text, {currentDiv: divMessages.current});
        }
        // eslint-disable-next-line
    }, []);

    const generarDialogo = async (id: number, finalTime = 1000) => { // Escribe un nuevo diálogo animado en la etiqueta p
        const p = pActual.current;
        if (!p) return null;

        const dialogosPosibles = [];

        dialogosPosibles.push(dialogos.find(dialogo => dialogo.id === id)!);
        
        const dialogo2 = dialogosAlternativos.find(dialogo => dialogo.id === id);
        if (dialogo2) dialogosPosibles.push(dialogo2);

        const dialogo = elementoAlAzarMessage(dialogosPosibles);
        setMessages((prev) => [...prev, dialogo]);
        await escribirTexto(p, dialogo.text, { currentDiv: divMessages.current});
        await waitFor(finalTime);        
    }

    const generarOpciones = (...ids: number[]) => { // Recibe n ids y hace aparecer en la interfaz n opciones de respuesta para el usuario
        const options = optionsRef.current
        if (!options) return null
        
        const arrayOptions = ids.map(id => dialogos.find(dialogo => dialogo.id === id)!);
        setOptions(arrayOptions);
        
        options.classList.replace("scale-0", "scale-1")
    }

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>, option: typeMessage) => { // Se ejecuta cada vez que el usuario elige una respuesta    
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

        if (idEleccion === 7) { // Dependiendo de la opción que haya elegido el usuario, la historia transcurre de una manera u otra
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
            generarOpciones(16, 47);

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
            await generarDialogo(82);
            await waitFor(1500);
            generarOpciones(49, 17);
            
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
            alert("Historial eliminado") // Primera vez que uso un alert. Jamás lo usaría, pero en este caso fue para darle más "realismo"
            await generarDialogo(43);
            await generarDialogo(44);
            await generarDialogo(45);
            await generarDialogo(46);
            return setEnd(true)

        } else if (idEleccion === 33) {
            const button = e.currentTarget;
            button.style.setProperty('transform', `translate(${numeroAlAzar(-200, 200)}%, ${numeroAlAzar(-500, 50)}%)`);
   
        } else if (idEleccion === 47) {
            await generarDialogo(48);
            await waitFor(1500);
            generarOpciones(49, 50);            

        } else if (idEleccion === 49) {
            await generarDialogo(51);
            await generarDialogo(52);
            await waitFor(1500);
            generarOpciones(53, 54);             

        } else if (idEleccion === 53) {
            await generarDialogo(55);
            await generarDialogo(56);
            await waitFor(1500);
            generarOpciones(57);

        } else if (idEleccion === 57) {
            await generarDialogo(58);
            await generarDialogo(59);
            await generarDialogo(60);
            await generarDialogo(61);
            await waitFor(1500);
            generarOpciones(62, 63);
            
        } else if (idEleccion === 62) {
            await generarDialogo(64);
            await generarDialogo(65);
            await generarDialogo(66);
            await generarDialogo(67);
            return setEnd(true)
            
        } else if (idEleccion === 54) {
            await generarDialogo(68);
            await waitFor(1500);
            generarOpciones(69, 70);

        } else if (idEleccion === 69) {
            await generarDialogo(71);
            await generarDialogo(72);
            await generarDialogo(73);
            await generarDialogo(74);
            await generarDialogo(75);
            await generarDialogo(76);
            await generarDialogo(77);
            return setEnd(true)

        } else if (idEleccion === 70) {
            await generarDialogo(78);
            await generarDialogo(72);
            await generarDialogo(73);
            await generarDialogo(74);
            await generarDialogo(75);
            await generarDialogo(76);
            await generarDialogo(77);
            return setEnd(true)            

        } else if (idEleccion === 63) {
            await generarDialogo(79);
            await generarDialogo(72);
            await generarDialogo(73);
            await generarDialogo(74);
            await generarDialogo(75);
            await generarDialogo(76);
            await generarDialogo(77);
            return setEnd(true)
            
        } else if (idEleccion === 50) {
            await generarDialogo(80);
            await generarDialogo(81);
            return setEnd(true)

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
        <section className="mx-auto h-full w-11/12 max-w-4xl border-2 border-black flex flex-col bg-gray-800 max-md:text-sm" >
            <div className="py-1 h-16 flex justify-center items-center bg-blue-800 rounded-t" >
                <h1 ref={h1Ref} className="text-2xl max-md:text-xl text-white transition-all duration-700">Lucy, asistente virtual</h1>
            </div>

            <div ref={divMessages} className="mx-1 overflow-y-auto flex-1"> {/*  */}
                {
                    messages.map((message, index) => ( 
                        index !== messages.length - 1 && // Muestra todos los mensajes menos el último ya que queremos que el último se escriba lentamente 
                        <div key={index} className={`${index === 0 ? "" : "mt-5"} flex ${message.user === "ia" ? "justify-start" : message.user === "user" ? "justify-end" : "justify-center text-blue-800"}`}>
                            <p className="p-1 border bg-slate-300 border-black rounded max-w-[75%]">{message.id !== 11 ? message.text : message.text.replace("TIMESTAMP", `${minutesDiference}`)}</p>
                        </div>
                    ))
                }

                <div className={`${messages.length === 1 ? "" : "mt-5"} flex ${messages[messages.length - 1].user === "ia" ? "justify-start" : messages[messages.length - 1].user === "user" ? "justify-end" : "justify-center text-blue-800"}`}>
                    <p className="p-1 border bg-slate-300 border-black rounded max-w-[75%]" ref={pActual}></p> {/* Dentro de este p se escribirán los nuevos mensajes de la IA y del usuario */}
                </div>
            </div>

            <form ref={formRef} onSubmit={e => sendFirstMessage(e, setMessages, formRef, optionsRef, pDivisor, generarDialogo, generarOpciones)} className="flex transition-all duration-700">
                <input type="text" autoComplete="off" className="h-10 flex-1 rounded-bl" name="message" autoFocus />
                <button type="submit" className="w-20 h-10 text-white rounded-br bg-blue-800">Enviar</button>
            </form>

            <p ref={pDivisor} className="hidden border-dashed transition-all duration-700"></p>

            <div ref={optionsRef} className="h-10 hidden justify-around items-center duration-200 transition-all"> {/* Acá van las opciones que el usuario puede seleccionar */}
                {
                    options.map((option, index) => (
                        <button key={index} onClick={e => sendMessage(e, option)} className="mb-1 p-1 max-sm:p-[1px] max-sm:py-[2px] h-min border bg-slate-300 border-black rounded active:outline outline-red-500 outline-2 duration-100">{option.text}</button>
                    ))
                }
            </div>
        </section>
    )
}

export default Chat
